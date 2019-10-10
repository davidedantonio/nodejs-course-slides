'use strict'

const S = require('fluent-schema')

module.exports = async function (fastify, opts) {
  const tickets = fastify.mongo.db.collection('tickets')
  const { ObjectId } = fastify.mongo

  fastify.post('/', {
    schema: {
      body: S.object()
        .prop('title', S.string()
          .minLength(1)
          .maxLength(255)
          .required()
        )
        .prop('body', S.string()
          .required())
      ,
      response: {
        '2xx': S.object()
          .prop('_id', S.string())
          .prop('title', S.string())
          .prop('body', S.string())
          .prop('creationDate', S.string())
          .prop('user', S.string())
      }
    }
  }, async function (req, reply) {
    const ticket = Object.assign({}, {
      ...req.body,
      creationDate: new Date(),
      user: req.user.username
    })

    const data = await tickets.insertOne(ticket)
    const _id = data.insertedId

    reply
      .code(201)
      .header('location', `${this.prefix}/${_id}`)

    return Object.assign(ticket, {
      _id,
    })
  })

  fastify.get('/', {
    schema: {
      response: {
        '2xx': S.array()
          .items(S.object()
            .prop('_id', S.string())
            .prop('title', S.string())
            .prop('body', S.string())
            .prop('user', S.string())
            .prop('creationDate', S.string())
          )
      }
    }
  }, async function (req, res) {
    const ticketsList = await tickets
      .find({
        user: req.user.username
      })
      .sort({
        creationDate: -1
      }).toArray()

    return ticketsList
  })

  fastify.get('/:id', {
    schema: {
      response: {
        '2xx': S.object()
          .prop('_id', S.string())
          .prop('title', S.string())
          .prop('body', S.string())
          .prop('user', S.string())
          .prop('creationDate', S.string()),
        '404': S.object()
          .prop('status', S.string())
      }
    }
  }, async function (req, reply) {
    const id = req.params.id
    const data = await tickets.findOne({
      _id: new ObjectId(id),
      user: req.user.username
    })

    if (!data) {
      reply
        .code(404)
        return { status: 'not ok' }
    }

    return data
  })
}
