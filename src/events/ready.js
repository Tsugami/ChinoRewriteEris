class ReadyReveice {
  constructor (client) {
    this.client = client
  }

  run () {
    const game = [
      {
        name: 'Tokimeki Poporon',
        type: 2
      },
      {
        name: 'Daydream café',
        type: 2
      },
      {
        name: 'Gochuumon wa Usagi Desu Ka?',
        type: 3
      },
      {
        name: 'Okaeri to Rabbit House Coffee.',
        type: 0
      },
      {
        name: '🐦 Follow me in twitter: @ChinoKafuuBot',
        type: 0
      }
    ]

    this.client.loadLavalink(this.client)
    console.log('Connected!')

    setInterval(() => {
      const status = Math.floor(Math.random() * game.length)
      this.client.editStatus('dnd', game[status])
    }, 5000)
  }
}

module.exports = ReadyReveice
