'use strict'

const Fastify = require('fastify')
const fp = require('fastify-plugin')
const clean = require('mongo-clean')
const { MongoClient } = require('mongodb')
const { beforeEach, tearDown, test } = require('tap')

const url = 'mongodb://localhost:27018'
const database = 'tests'
const App = require('../src')

let client

function config () {
  return {
    auth: {
      secret: 'averyverylongsecret'
    },
    mongodb: {
      client,
      database
    }
  }
}

beforeEach(async function () {
  if (!client) {
    client = await MongoClient.connect(url, {
      w: 1,
      useNewUrlParser: true
    })
  }
  await clean(client.db(database))
})

tearDown(async function () {
  if (client) {
    await client.close()
    client = null
  }
})

function build (t) {
  const app = Fastify()

  app.register(fp(App), config())
  t.tearDown(app.close.bind(app))

  return app
}

async function createUser (t, app, { username, password, fullName }) {
  // TODO replace this with direct database access
  const res = await app.inject({
    url: '/signup',
    method: 'POST',
    body: {
      username,
      password,
      fullName
    }
  })

  t.deepEqual(res.statusCode, 200)
  const body = JSON.parse(res.body)
  t.match(body, { status: 'ok' })

  const res1 = await app.inject({
    url: '/signin',
    method: 'POST',
    body: {
      username,
      password
    }
  })

  t.deepEqual(res1.statusCode, 200)
  const body1 = JSON.parse(res1.body)
  const token = body1.token
  t.ok(token)

  return token
}

function testWithLogin (name, fn) {
  test(name, async (t) => {
    const app = build(t)

    const token = await createUser(t, app, {
      username: 'davide',
      password: 'davide',
      fullName: 'davide davide'
    })

    function inject (opts) {
      opts = opts || {}
      opts.headers = opts.headers || {}
      opts.headers.authorization = `Bearer ${token}`

      return app.inject(opts)
    }

    return fn(t, inject)
  })
}

module.exports = {
  config,
  build,
  createUser,
  testWithLogin
}
