'use strict'

const { test } = require('tap')
const {
  build,
  testWithLogin
} = require('../helper') // take a look at this file

test('get users and get unhautorized error', async (t) => {
  const app = build(t)
  const res1 = await app.inject({
    method: 'GET',
    url: '/api/users'
  })

  t.equal(res1.statusCode, 401)
})

test('get me and get unhautorized error', async (t) => {
  const app = build(t)
  const res1 = await app.inject({
    method: 'GET',
    url: '/api/users/list'
  })

  t.equal(res1.statusCode, 401)
})
