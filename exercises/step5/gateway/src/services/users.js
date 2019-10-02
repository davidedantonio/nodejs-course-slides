'use strict'

const isDocker = require('is-docker')

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-http-proxy'), {
    upstream: `http://${isDocker() ? 'users-service' : 'localhost'}:3003`
  })
}

module.exports.autoPrefix = '/api/users'