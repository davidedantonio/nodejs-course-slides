'use strict'

const securePassword = require('secure-password')
const DUPLICATE_KEY_ERROR = 11000
const S = require('fluent-schema')

module.exports = async function (fastify, opts) {
  const users = fastify.mongo.db.collection('users')
  const pwd = securePassword()

  users.createIndex({
    username: 1
  }, { unique: true })

  fastify.post('/signup', {
    schema: {
      body: S.object()
        .prop('fullName', S.string()
          .required())
        .prop('username', S.string()
          .required())
        .prop('password', S.string()
          .required()),
      response: {
        '2xx': S.object()
          .prop('status', S.string()),
        '400': S.object()
          .prop('status', S.string())
      }
    }
  }, async (req, reply) => {
    const { fullName, username, password } = req.body
    const hashedPassword = await pwd.hash(Buffer.from(password))

    try {
      await users.insertOne({
        'fullName': fullName,
        'username': username,
        'password': hashedPassword
      })
    } catch (err) {
      // duplicate key
      if (err.code === DUPLICATE_KEY_ERROR) {
        return reply
          .code(400)
          .send({ status: 'username already registered' })
      }
    }

    return { status: 'ok' }
  })

  fastify.post('/signin', {
    schema: {
      body: S.object()
        .prop('username', S.string()
          .required())
        .prop('password', S.string()
          .required()),
      response: {
        '2xx': S.object()
          .prop('token', S.string()),
        '404': S.object()
          .prop('status', S.string())
      }
    }
  }, async (req, reply) => {
    const { username, password } = req.body
    const user = await users.findOne({ username: username })

    if (!user) {
      reply
        .code(404)
        .send({ status: 'username not found' })
      return
    }

    const res = await pwd.verify(Buffer.from(password), user.password.buffer)
    switch (res) {
      case securePassword.INVALID_UNRECOGNIZED_HASH:
        reply
          .code(400)
          .send({ status: 'This hash was not made with secure-password. Attempt legacy algorithm' })
        return
      case securePassword.INVALID:
        reply
          .code(400)
          .send({ status: 'Invalid password' })
        return
      case securePassword.VALID_NEEDS_REHASH:
        req.log.info({ username }, 'password needs rehashing')
        const hashedPassword = await pwd.hash(Buffer.from(password))
        await users.update({ _id: user._id }, { hashedPassword })
        break
    }

    const token = await reply.jwtSign({ username })
    return { token: token }
  })
}