const { Message } = require("eris");
const { ChinoReply } = require("../utils");

class ProtoTypeStructures {
    static start (client) {
        Message.prototype.reply = async function reply (emoji, msg) {
            return client.createMessage(this.channel.id, ChinoReply(emoji, msg, this.author.username));
        };

        Message.prototype.sendEmbed = async function reply (msg) {
            return client.createMessage(this.channel.id, { content: `**${this.author.username}**`, embed: msg });
        };
    }
}

module.exports = ProtoTypeStructures;
