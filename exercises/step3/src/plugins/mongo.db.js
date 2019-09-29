'use strict'

const fp = require('fastify-plugin')
const MongoDB = require('fastify-mongodb')

module.exports = fp(async (fastify, opts) => {
  let mongoOpts = Object.assign({}, {
    useUnifiedTopology: true,
    url: process.env.MONGODB_URL || 'mongodb://localhost:27018/ticketApp',
  }, opts.mongodb)

  fastify.register(MongoDB, mongoOpts)
})