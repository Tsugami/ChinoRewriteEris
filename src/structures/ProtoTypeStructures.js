const { Message } = require("eris")
const emotes = require("./EmotesInstance.json")

class ProtoTypeStructures {
    static start(client) {
        Message.prototype.reply = async function reply(emoji, msg) {
            return client.createMessage(this.channel.id, `${emotes[emoji]} **| ${this.author.username}**, ${msg}`)
        }

        Message.prototype.sendEmbed = async function reply(msg) {
            return client.createMessage(this.channel.id, {content: `**${this.author.username}**`, embed: msg})
        }
    }
}

module.exports = ProtoTypeStructures