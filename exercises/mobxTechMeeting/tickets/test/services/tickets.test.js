'use strict'

const { test } = require('tap')
const {
  build,
  testWithLogin
} = require('../helper') // take a look at this file

test('get list tickets and get unhautorized error', async (t) => {
  const app = build(t)
  const res1 = await app.inject({
    method: 'GET',
    url: '/api/tickets'
  })

  t.equal(res1.statusCode, 401)
})


test('create ticket and get unhautorized error', async (t) => {
  const app = build(t)
  const res1 = await app.inject({
    method: 'GET',
    url: '/api/tickets',
    body: {
      title: 'A support ticket',
      body: 'this is a long body'
    }
  })

  t.equal(res1.statusCode, 401)
})

testWithLogin('create and get ticket', async (t, inject) => {
  const res1 = await inject({
    method: 'POST',
    url: '/api/tickets',
    body: {
      title: 'A support ticket',
      body: 'this is a long body'
    }
  })

  t.equal(res1.statusCode, 201) // Created
  const body1 = JSON.parse(res1.body)

  t.ok(body1._id)
  const url = `/api/tickets/${body1._id}`
  t.equal(res1.headers.location, url)

  const res2 = await inject({
    method: 'GET',
    url
  })

  t.equal(res2.statusCode, 200)

  t.deepEqual(JSON.parse(res2.body), {
    _id: body1._id,
    title: 'A support ticket',
    body: 'this is a long body',
    user: body1.user,
    creationDate: body1.creationDate
  })
})

testWithLogin('create and get all', async (t, inject) => {
  const res1 = await inject({
    method: 'POST',
    url: '/api/tickets',
    body: {
      title: 'A support ticket',
      body: 'this is a long body'
    }
  })

  const res2 = await inject({
    method: 'POST',
    url: '/api/tickets',
    body: {
      title: 'Another support ticket',
      body: 'this is a long body'
    }
  })

  const body1 = JSON.parse(res1.body)
  const body2 = JSON.parse(res2.body)

  const resAll = await inject({
    method: 'GET',
    url: '/api/tickets'
  })

  t.equal(resAll.statusCode, 200)

  t.deepEqual(JSON.parse(resAll.body), [{
    _id: body2._id,
    title: 'Another support ticket',
    body: 'this is a long body',
    creationDate: body2.creationDate,
    user: body2.user
  }, {
    _id: body1._id,
    title: 'A support ticket',
    body: 'this is a long body',
    creationDate: body1.creationDate,
    user: body1.user
  }])
})

testWithLogin('do not create a ticket without a title', async (t, inject) => {
  const res1 = await inject({
    method: 'POST',
    url: '/api/tickets',
    body: {
      body: 'this is a long body'
    }
  })

  t.equal(res1.statusCode, 400)
  t.equal(JSON.parse(res1.body).message, 'body should have required property \'title\'')
})

testWithLogin('do not create a ticket without a body', async (t, inject) => {
  const res1 = await inject({
    method: 'POST',
    url: '/api/tickets',
    body: {
      title: 'A support ticket'
    }
  })

  t.equal(res1.statusCode, 400)
  t.equal(JSON.parse(res1.body).message, 'body should have required property \'body\'')
})