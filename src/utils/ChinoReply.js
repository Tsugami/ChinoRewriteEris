const emotes = require('./EmotesInstance.json')

module.exports = function chinoReply (emoji, content = '', username = undefined) {
  let str = `${emotes[emoji]} **|`
  if (username) str += `${username}**,`
  else str += '**'
  str += ' ' + content
  return str
}
