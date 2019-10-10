'use strict'

const isDocker = require('is-docker')

require('elastic-apm-node').start({
  // Set custom APM Server URL (default: http://localhost:8200)
  serverUrl: `http://${isDocker() ? 'apm-server' : 'localhost'}:8200`,
})