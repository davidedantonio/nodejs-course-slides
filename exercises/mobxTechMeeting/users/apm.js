'use strict'

const isDocker = require('is-docker')

require('elastic-apm-node').start({
  serverUrl: `http://${isDocker() ? 'apm-server' : 'localhost'}:8200`,
})