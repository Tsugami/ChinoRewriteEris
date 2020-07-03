const { RichEmbed } = require("chariot.js");
const Command = require("../../structures/Commands");
class PingCommand extends Command {
    constructor(client) {
        super(client, {
            name: "ping",
            aliases: [],
            category: "misc"
        });
    }

    async run(message, args, server, { t }) {
        switch (args[0]) {
        case "shards": {
            const s = [];
            const embed = new RichEmbed();
            embed.setFooter(t("commands:ping", { totalShard: this.client.shards.size }));
            embed.setColor(this.client.colors.default);
            this.client.shards.forEach(shard => {
                let shardStatus;
                if (shard.status === "ready") shardStatus = "CONNECTED";
                if (shard.status === "disconnected") shardStatus = "DISCONNECTED";
                if (shard.status === "connecting") shardStatus = "CONNECTING";
                if (shard.status === "handshaking") shardStatus = "HANDSHAKING";
                s.push(embed.addField(`Shard: ${shard.id}`, `Ping: ${shard.latency} | ${shardStatus}`, true));
            });

            message.sendEmbed(embed);
            break;
        }
        default: {
            const ping = `Ping: \`${Math.round(message.channel.guild.shard.latency)}\`ms! | API Latency: \`${Date.now() - message.timestamp}\` | Shard: [${message.channel.guild.shard.id}/${this.client.shards.size}]`;
            const msg = await message.channel.createMessage(":ping_pong:");
            msg.edit(`:ping_pong:\n${ping}`);
        }
        }
    }
}

module.exports = PingCommand;
