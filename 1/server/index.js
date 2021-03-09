const { Nuxt, Builder } = require('nuxt')
const consola = require('consola')
const config = require('../nuxt.config.js')
const scheduler = require('./services/sсheduler')
const app = require('./app')

config.dev = process.env.NODE_ENV !== 'production'

async function start() {
  try {
    const nuxt = new Nuxt(config)

    const { host, port } = nuxt.options.server

    await nuxt.ready()
    if (config.dev) {
      const builder = new Builder(nuxt)
      await builder.build()
    }

    app.use(nuxt.render)

    app.listen(port, host, () => scheduler())
    consola.ready({
      message: `Server listening on http://${host}:${port}`,
      badge: true
    })
  } catch (err) {
    consola.error(`Server error: ${err.message}`)
  }
}
// noinspection JSIgnoredPromiseFromCall
start()
