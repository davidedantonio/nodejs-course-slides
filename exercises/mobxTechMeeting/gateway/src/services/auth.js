'use strict'

const isDocker = require('is-docker')

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-http-proxy'), {
    upstream: `http://${isDocker() ? 'auth-service' : 'localhost'}:3001`
  })
}

module.exports.autoPrefix = '/auth'
