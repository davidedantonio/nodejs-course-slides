'use strict'

module.exports = async function (fastify, opts) {
  const tickets = fastify.mongo.db.collection('tickets')
  const { ObjectId } = fastify.mongo

  fastify.post('/', async function (req, reply) {
    const ticket = Object.assign({}, {
      ...req.body,
      creationDate: new Date()
    })

    const data = await tickets.insertOne(ticket)
    const _id = data.insertedId

    reply
      .code(201)
      .header('location', `${this.prefix}/${_id}`)

    return Object.assign(ticket, {
      _id
    })
  })

  fastify.get('/', async function (req, res) {
    const ticketsList = await tickets
      .find()
      .sort({
        _id: -1
      }).toArray()

    return ticketsList
  })

  fastify.get('/:id', async function (req, reply) {
    const id = req.params.id
    const data = await tickets.findOne({
      _id: new ObjectId(id)
    })

    if (!data) {
      reply
        .code(404)
        return { status: 'not ok' }
    }

    return data
  })
}

module.exports.autoPrefix = '/tickets'