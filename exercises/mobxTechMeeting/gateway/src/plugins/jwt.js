'use strict'

const fp = require('fastify-plugin')
const JWT = require('fastify-jwt')

module.exports = fp(async (app, opts) => {
  app.register(JWT, Object.assign({},
    { secret: 'm4mmt4p3c0r4' },
    opts.jwt
  ))
})
