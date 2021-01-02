const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cardSchema = new Schema({
  title: String,
  url: String,
  description: String,
  nasaId: String,
  media_type: String
}, { versionKey: false })

const Card = mongoose.model('Card', cardSchema)
module.exports = Card