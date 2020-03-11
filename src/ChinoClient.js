const { Client: ErisClient, Collection } = require("eris")
const { readdir } = require("fs")

class ChinoClient extends ErisClient {
    constructor(token, options = {}) {
        super(token, options)
        this.aliases = new Collection()
        this.commands = new Collection()
        this.config = require("../config")
    }

    loadLocales() {
        const Locales = require("./structures/LocaleStructure")
        const locales = new Locales(this)
        locales.load()
    }

    loadCommands() {
        readdir(`${__dirname}/commands`, (err, f) => {
            if (err) return console.error(err)
            f.forEach(category => {
                readdir(`${__dirname}/commands/${category}`, (err, cmd) => {
                    if (err) return console.error(err)
                    cmd.forEach(cmd => {
                        const Command = require(`${__dirname}/commands/${category}/${cmd}`)
                        const commands = new Command(this)
                        this.commands.set(commands.config.name, commands)
                        commands.config.aliases.forEach(alias => this.client.aliases.set(alias, commands.config.name))
                    })
                })
            })
        })
        return this
    }

    loadEvents() {
        readdir(`${__dirname}/events`, (err, f) => {
            if (err) return console.error(err)
            f.forEach(files => {
                const Events = require(`${__dirname}/events/${files}`)
                const events = new Events(this)
                super.on(files.split(".")[0], (...args) => events.run(...args))
            })
        })
        return this
    }

    connect() {
        return super.connect()
    }
}

module.exports = ChinoClient