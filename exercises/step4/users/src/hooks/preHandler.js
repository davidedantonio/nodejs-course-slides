'use strict'

const fp = require('fastify-plugin')

module.exports = fp(async (fastify, opts) => {
  fastify.addHook('preHandler', async (request, reply) => {
    if (request.raw.originalUrl.split('/')[1] === 'api') {
      return request.jwtVerify()
    }
    return true
  })
})
