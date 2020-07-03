const LavalinkPlayer = require('../lavalink/LavalinkPlayer')
const LavalinkManager = require('../lavalink/LavalinkManager')
class InicializeLavalink {
  constructor (client) {
    this.client = client
  }

  load () {
    this.client.lavalinkManager = new LavalinkManager(this.client)
    this.client.lavalinkPlayer = new LavalinkPlayer(this.client)

    console.log('Loading lavalink...')
  }
}

module.exports = InicializeLavalink
