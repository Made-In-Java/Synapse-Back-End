const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../models');
const auth = require('../middleware/auth');

/* Get all users */
router.get('/', async (req, res, next) => {
  try {
    let users = await db.User.find({}).select('-password -loginToken -document');
    res.json({ users })
  } catch (err) {
    res.status(500).end();
  }
});

/* Get single user */
router.get('/:id', async (req, res, next) => {
  try {
    let users = await db.User.findById(req.params.id).select('-password -loginToken -document');
    res.json({ users })
  } catch (err) {
    res.status(500).end();
  }
});

/* Add a new User */
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

/* Update data from user */
router.put('/:id', async (req, res, next) => {
  try {
    let userId = req.params.id;
    let newData = req.body;
    newData.updatedAt = new Date();
    let updatedUser = await db.User.findByIdAndUpdate(userId, newData);
    res.json(updatedUser);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* Delete user */
router.delete('/:id', async (req, res, next) => {
  try {
    let userId = req.params.id;
    await db.Client.findOneAndRemove({ _id: userId }).populate('Client').exec();
    res.status(200).json(removedClient);
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
