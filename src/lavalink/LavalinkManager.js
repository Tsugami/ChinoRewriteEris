const { PlayerManager } = require("eris-lavalink")
const { LavalinkPlayer } = require("../structures/InicializeLavalink")
let nodes = require("./lavalinkConfig").connect
nodes = nodes.map(node => {
    let object = {}
    object.host = node.host
    object.port = node.port
    object.password = node.password
    return object
})

class LavalinkManager {
    constructor(client) {
        this.client = client
        this.manager = new PlayerManager(client, nodes, {
            numShards: this.client.shards.size,
            userId: this.client.user.id
        })
    }

    getBestHost() {
        // return this.manager.nodes.array()[Math.floor(Math.random() * nodes.length)]
        return console.log(this.manager.nodes)
    }

    async join(channel, guild) {
        return new LavalinkPlayer(await this.manager.join({ channel: channel, guild: this.client.guilds.get(guild).id, host: this.getBestHost().host }, { selfdeaf: false }))
    }
}

module.exports = LavalinkManager