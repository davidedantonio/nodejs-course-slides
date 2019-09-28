'use strict'

const Fastify = require('fastify')
const fp = require('fastify-plugin')
const clean = require('mongo-clean')
const { MongoClient } = require('mongodb')
const { beforeEach, tearDown } = require('tap')

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

module.exports = {
  config,
  build
}
