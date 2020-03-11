class Commands {
    constructor(client, options) {
        this.client = client
        this.config = {
            name: options.name || null,
            aliases: options.aliases || [],
            category: options.category || null,
            UserPerms: options.UserPerms || null,
            ClientPerms: options.ClientPerms || null,
            devs: options.devs || false
        }
    }
}

module.exports = Commands