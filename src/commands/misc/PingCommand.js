const { RichEmbed } = require("chariot.js")
const Command = require("../../structures/Commands")
class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: [],
            category: "misc"
        })
    }

    async run(message, args, server, { t }) {
        switch (args[0]) {
            case "shards":
                let s = []
                const embed = new RichEmbed()
                embed.setFooter(`Total shards: ${this.client.shards.size}`)
                embed.setColor(this.client.colors.default)
                this.client.shards.forEach(shard => {
                    s.push(embed.addField(`Shard: ${shard.id}`, `Ping: ${shard.latency}\nStatus: ${shard.status}`, true))
                })

                message.channel.createMessage({embed: embed})
                break
            default:
                let ping = `Ping: \`${Math.round(message.channel.guild.shard.latency)}\`ms! | API Latency: \`${Date.now() - message.timestamp}\` | Shard: [${message.channel.guild.shard.id}/${this.client.shards.size}]`
                let msg = await message.channel.createMessage(":ping_pong:")
                msg.edit(`:ping_pong:\n${ping}`)
        }
    }
}

module.exports = PingCommand