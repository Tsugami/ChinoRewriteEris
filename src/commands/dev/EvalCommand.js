const Command = require("../../structures/Commands")
class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["ev"],
            category: "dev",
            devs: true
        })
    }

    async run(message, args, server, { t }) {
        try {
            let util = require("util")
            let evaled = await eval(args.join(" "))
            evaled = util.inspect(evaled, { depth: 1 })
            evaled = evaled.replace(new RegExp(`${this.client.token}`, 'g'), undefined)

            if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`
            evaled = `\`\`\`js\n${evaled}\`\`\``
            message.channel.createMessage(evaled)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = EvalCommand