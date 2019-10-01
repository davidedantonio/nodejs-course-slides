'use strict'

const fp = require('fastify-plugin')
const MongoDB = require('fastify-mongodb')
const isDocker = require('is-docker')

module.exports = fp(async (fastify, opts) => {
  let mongoOpts = Object.assign({}, {
    useUnifiedTopology: true,
    url: process.env.MONGODB_URL || `mongodb://${isDocker() ? 'mongodb' : 'localhost'}:27017/auth`,
  }, opts.mongodb)

  fastify.register(MongoDB, mongoOpts)
})