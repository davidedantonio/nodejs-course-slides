'use strict'

const fp = require('fastify-plugin')
const MongoDB = require('fastify-mongodb')

module.exports = fp(async (fastify, opts) => {
  let mongoOpts = Object.assign({}, {
    useNewUrlParser: true,
    url: process.env.MONGODB_URL || 'mongodb://localhost:27018/',
  }, opts.mongodb)

  fastify.register(MongoDB, mongoOpts)
})