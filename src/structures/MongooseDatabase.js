const { Schema, model, connect } = require('mongoose')
const config = require('../../config')
connect(config.mongoose, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
  if (err) return console.error(err)
  console.log('Successfully connected to database!')
})
const guild = new Schema({
  _id: { type: String },
  lang: { type: String, default: 'pt-BR' },
  prefix: { type: String, default: config.prefix }
})
const guilds = model('guilds', guild)
module.exports.guilds = guilds
