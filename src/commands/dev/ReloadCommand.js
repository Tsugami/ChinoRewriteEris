const Command = require('../../structures/Commands')

class ReloadCommand extends Command {
  constructor (client) {
    super(client, {
      name: 'reload',
      aliases: [],
      category: 'dev',
      devs: true
    })
  }

  async run (message, args, server, { t }) {
    switch (args[0].toLowerCase()) {
      case 'locales':
        this.client.loadLocales()
        message.reply('chino_tail', t('commands:reload.locales'))
        break
      case 'shard': {
        if (!args[1]) return message.channel.createMessage('chino_think', 'Como eu vou reiniciar essa shard se você não colocou nenhuma?')
        const shard = this.client.shards.get(Number(args[1]))
        shard.disconnect()
        shard.connect()

        message.reply('chino_tail', t('commands:reload.shard', { shard: args[1] }))
        break
      }
      default: {
        const list = ['`locales`', '`shard`']
        message.reply('chino_think', t('commands:reload.args-null', { list: list.join(', ') }))
      }
    }
  }
}

module.exports = ReloadCommand
