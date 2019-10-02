'use strict'

const S = require('fluent-schema')

module.exports = async function (fastify, opts) {
  const users = fastify.mongo.db.collection('users')

  fastify.get('/me', {
    schema: {
      '2xx': S.object()
        .prop('fullName', S.string())
        .prop('username', S.string())
    }
  }, async (req, reply) => {
    return req.user
  })

  fastify.get('/list', {
    schema: {
      '2xx': S.array()
        .items(S.object()
          .prop('_id', S.string())
          .prop('fullName', S.string())
          .prop('username', S.string())
        )
    }
  }, async (req, reply) => {
    const usersList = await users
      .find({}, {_id: 1, username: 1, fullName: 1})
      .sort({
        username: -1
      }).toArray()

    return usersList
  })
}