const i18next = require("i18next")
class MessageCreateReceive {
    constructor(client) {
        this.client = client
    }

    async run(message) {
        if (message.author.bot) return
        if (message.channel.type !== 0) return
        let server = await this.client.database.guilds.findById(message.channel.guild.id)
        if (!server) {
            server = this.client.database.guilds({
                _id: message.channel.guild.id
            })
            server.save()
        }
        let t
        const setFixedT = function (translate) {
            t = translate
        }

        const language = (server && server.lang) || "pt-BR"
        setFixedT(i18next.getFixedT(language))
        if (message.content.replace("!", "") === `<@${this.client.user.id}>`) return message.channel.createMessage(`${t("events:mention", { prefix: server.prefix })}`)

        if (!message.content.startsWith(server.prefix)) return
        const args = message.content.slice(server.prefix.length).trim().split(/ +/g)
        const cmd = args.shift().toLowerCase()
        const commands = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd))
        if (!commands) return
        message.channel.sendTyping()
        if (commands.config.devs && !this.client.config.owners.includes(message.author.id)) return message.reply("chino_shock", t("permissions:ONLY_DEVS"))
        // if (commands.config.UserPermission !== null) {
        //     if (!message.member.hasPermission(commands.config.UserPerms)) {
        //         let perm = commands.config.UserPerms.map(value => t(`permissions:${value}`)).join(", ")
        //         return message.chinoReply("error", `${t("permissions:USER_MISSING_PERMISSION", { perm: perm })}`)
        //     }
        // }
        // if (commands.config.ClientPerms !== null) {
        //     if (!message.guild.me.hasPermission(commands.config.ClientPerms) || !message.channel.permissionsFor(this.client.user.id).has(commands.config.ClientPerms)) {
        //         let perm = clientPermission.map(value => t(`permissions:${value}`)).join(", ")
        //         return message.chinoReply("error", `${t("permissions:CLIENT_MISSING_PERMISSION", { perm: perm })}`)
        //     }
        // }
        commands.run(message, args, server, { t })
    }
}

module.exports = MessageCreateReceive