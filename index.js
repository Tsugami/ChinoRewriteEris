const config = require("./config")
const Client = require("./src/ChinoClient")
const client = new Client(config.token, config.clientOptions)

client.loadLocales()
client.loadCommands()
client.loadEvents()
client.connect()