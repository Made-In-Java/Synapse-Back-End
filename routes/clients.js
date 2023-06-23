var express = require('express');
var router = express.Router();
let db = require('../models');

/* GET all clients listing. */
router.get('/', async (req, res, next) => {
  try {
    let allClients = await db.Client.find();
    res.json({ clients: allClients });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* GET one client listing. */
router.get('/:id', async (req, res, next) => {
  try {
    let client = await db.Client.findOne({ _id: req.params.id });
    res.json({ client });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* POST a new client */
router.post('/', async (req, res, next) => {
  try {
    let newClient = new db.Client(req.body);
    newClient.createdAt = new Date();
    newClient.save();
    res.json({ newClient });
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* PUT update a client listing. */
router.put('/:id', async (req, res, next) => {
  try {
    let clientId = req.params.id;
    let newData = req.body;
    newData.updatedAt = new Date();
    let updatedClient = await db.Client.findByIdAndUpdate(clientId, newData);
    res.json(updatedClient);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* DELETE delete a client listing. */
router.delete('/:id', async (req, res, next) => {
  try {
    let clientId = req.params.id;
    let removedClient = await db.Client.findOneAndRemove({ _id: clientId }).populate('Client').exec();
    res.json(removedClient);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
