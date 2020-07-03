const i18next = require("i18next");
const { RichEmbed } = require("chariot.js");
const { Constants } = require("eris");
const { ChinoReply } = require("../utils");

class MessageCreateReceive {
    constructor(client) {
        this.client = client;
    }

    async run(message) {
        if (message.author.bot) return;
        if (message.channel.type !== 0) return;
        let server = await this.client.database.guilds.findById(message.guildID);
        if (!server) {
            server = this.client.database.guilds({
                _id: message.guildID
            });
            server.save();
        }
        let t;
        const setFixedT = function(translate) {
            t = translate;
        };

        const language = (server && server.lang) || "pt-BR";
        setFixedT(i18next.getFixedT(language));
        if (message.content.replace("!", "") === `<@${this.client.user.id}>`) return message.channel.createMessage(`${t("events:mention", { prefix: server.prefix })}`);

        if (!message.content.startsWith(server.prefix)) return;
        const args = message.content.slice(server.prefix.length).trim().split(/ +/g);
        const cmd = args.shift().toLowerCase();
        const commands = this.client.commands.get(cmd) || this.client.commands.get(this.client.aliases.get(cmd));
        if (!commands) return;
        message.channel.sendTyping();
        if (commands.config.devs && !this.client.config.owners.includes(message.author.id)) return message.reply("chino_shock", t("permissions:ONLY_DEVS"));

        if (commands.config.botPerms || commands.config.userPerms) {
            const botMissingPerms = [];
            const userMissingPerms = [];

            const missingPermsMsg = [];

            const botMember = message.member.guild.members.get(this.client.user.id);

            if (commands.config.botPerms && commands.config.botPerms instanceof Array) {
                commands.config.botPerms.forEach(value => {
                    if (typeof value === "string") {
                        if (Constants.Permissions[value] !== undefined && !botMember.permission.has(value)) {
                            botMissingPerms.push(value);
                        }
                    }
                });

                if (botMissingPerms.length > 0) {
                    missingPermsMsg.push(t("commands:missingPermissions.botUser", {
                        permissions: botMissingPerms.map(value => `\`${t("permissions:discord." + value)}\``).join(", ")
                    }));
                }
            }

            if (commands.config.userPerms && commands.config.userPerms instanceof Array) {
                commands.config.userPerms.forEach(value => {
                    if (typeof value === "string") {
                        if (Constants.Permissions[value] !== undefined && !message.member.permission.has(value)) {
                            userMissingPerms.push(value);
                        }
                    }
                });

                if (userMissingPerms.length > 0) {
                    missingPermsMsg.push(t("commands:missingPermissions.memberUser", {
                        permissions: userMissingPerms.map(value => `\`${t("permissions:discord." + value)}\``).join(", ")
                    }));
                }
            }

            if (botMissingPerms.length > 0 || userMissingPerms.length > 0) {
                return message.channel.createMessage(
                    missingPermsMsg.map(val => ChinoReply("chino_shock", val)).join("\n")
                );
            }
        }

        commands.run(message, args, server, { t }).catch(err => {
            const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack;
            const embed = new RichEmbed();
            embed.setColor(this.client.colors.error);
            embed.setTitle(t("events:error.title"));
            embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);
            embed.addField(t("events:error.report-issue"), t("events:error.server-support"));

            message.sendEmbed(embed);
        });
    }
}

module.exports = MessageCreateReceive;
