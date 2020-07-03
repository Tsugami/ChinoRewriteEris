class Commands {
    constructor (client, options) {
        this.client = client;
        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category || null,
            userPerms: options.userPerms || null,
            botPerms: options.botPerms || null,
            devs: options.devs || false
        };
    }
}

module.exports = Commands;
