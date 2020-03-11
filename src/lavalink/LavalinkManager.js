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
        let randomNode = nodes[Math.floor(Math.random() * nodes.length)] - 1
        console.log(randomNode)
        return this.manager.nodes.get(nodes[0].host)
    }

    async join(channel, guild) {
        return new LavalinkPlayer(await this.manager.join(this.client.guilds.get(guild).id, channel))
    }
}

module.exports = LavalinkManager