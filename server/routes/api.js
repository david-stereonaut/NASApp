const express = require('express')
const router = express.Router()
const Card = require('../models/CardModel')
const Saved = require('../models/SavedModel')

router.get('/images/:id?', async function(req, res) {
  if (req.params.id) {
    const data = await Card.findById(req.params.id)
    const saved = await Saved.find({})
    res.send({data, saved: saved[0].saved})
  } else {
    const data = await Card.find({})
    const saved = await Saved.find({})
    res.send({data, saved: saved[0].saved})
  }
})

router.get('/saved', async function(req, res) {
  const saved = await Saved.find({})
  if(saved.length > 0) {
    res.send(saved[0].saved)
  }
})

router.post('/image', async function(req, res) {
  const newCard = new Card(req.body)
  await newCard.save()
  const saved = await Saved.find({})
  const data = await Card.find({})
  if (saved.length === 0) {
    const firstSave = new Saved({ saved: { [req.body.nasaId]: newCard._id } })
    await firstSave.save()
    res.send({data, saved: firstSave.saved})
  } else {
    saved[0].saved[req.body.nasaId] = newCard._id
    await Saved.findOneAndUpdate({}, { saved: saved[0].saved })
    res.send({ data, saved: saved[0].saved })
  }
})

router.delete('/image/:id', async function(req, res) {
  console.log(req.params.id)
  await Card.findByIdAndDelete(req.params.id)
  const saved = await Saved.findOne({})
  delete saved.saved[req.body.nasaId]
  await Saved.findOneAndUpdate({}, { saved: saved.saved })
  const data = await Card.find({})
  res.send({data, saved: saved.saved})
})

module.exports = router