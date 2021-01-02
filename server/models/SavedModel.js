const mongoose = require('mongoose')
const Schema = mongoose.Schema

const savedSchema = new Schema({
  saved: Object
}, { versionKey: false })

const Saved = mongoose.model('Saved', savedSchema)
module.exports = Saved