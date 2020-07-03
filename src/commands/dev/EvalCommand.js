const Command = require("../../structures/Commands");
const { RichEmbed } = require("chariot.js");
class EvalCommand extends Command {
    constructor(client) {
        super(client, {
            name: "eval",
            aliases: ["ev"],
            category: "dev",
            devs: true
        });
    }

    async run(message, args, server, { t }) {
        try {
            const util = require("util");
            // eslint-disable-next-line no-eval
            let evaled = await eval(args.join(" "));
            evaled = util.inspect(evaled, { depth: 1 });
            evaled = evaled.replace(new RegExp(`${this.client.token}`, "g"), undefined);

            if (evaled.length > 1800) evaled = `${evaled.slice(0, 1800)}...`;
            evaled = `\`\`\`js\n${evaled}\`\`\``;
            message.channel.createMessage(evaled);
        } catch (err) {
            const errorMessage = err.stack.length > 1800 ? `${err.stack.slice(0, 1800)}...` : err.stack;
            const embed = new RichEmbed();
            embed.setColor(this.client.colors.error);
            embed.setTitle(t("events:error.title"));
            embed.setDescription(`\`\`\`js\n${errorMessage}\`\`\``);
            embed.addField(t("events:error.report-issue"), t("events:error.server-support"));

            message.sendEmbed(embed);
        }
    }
}

module.exports = EvalCommand;
