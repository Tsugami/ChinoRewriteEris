const config = require("./config")
const Client = require("./src/ChinoClient")
const client = new Client(config.token, config.clientOptions)
require("./src/structures/ProtoTypeStructures").start(client)

client.loadLocales()
client.loadCommands()
client.loadEvents()
client.connect()