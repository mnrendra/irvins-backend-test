// constant configuration
const constant = require('./constant')

// env configuration
const production = require('./production')
const development = require('./development')

/**
 * getEnvConfig function
 */
const getEnvConfig = () => {
  switch (process.env.NODE_ENV) {
    case 'production':
      return production
    default:
      return development
  }
}

// export module
module.exports = { ...getEnvConfig(), ...constant }
