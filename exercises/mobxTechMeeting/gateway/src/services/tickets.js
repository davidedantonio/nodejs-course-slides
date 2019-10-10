'use strict'

const isDocker = require('is-docker')

module.exports = async function (fastify, opts) {
  fastify.register(require('fastify-http-proxy'), {
    upstream: `http://${isDocker() ? 'tickets-service' : 'localhost'}:3002`
  })
}

module.exports.autoPrefix = '/api/tickets'