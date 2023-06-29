const express = require('express');
const uuid = require('uuid');
const router = express.Router();
const db = require('../models');

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
/* This function should not be allowed to add confidential data to the database */
router.post('/', async (req, res, next) => {
  let { name, email } = req.body || null;

  if (!email || !document) {
    res.status(400);
  }

  try {
    let newUser = new db.User();
    newUser.name = name;
    newUser.email = email;
    newUser.createdAt = new Date();
    newUser.signInToken = uuid.v4();
    newUser.signInToken.expDate = new Date().setDate(new Date().getDate() + 1);
    newUser.save();
    res.status(200).end();
  }
  catch (err) {
    res.status(500).json(err);
  }
});

/* Refresh the token and sign-in exp data from an user */
router.patch('/refresh/:id', async (req, res, next) => {
  try {
    let userId = req.params.id;
    let signInToken = uuid.v4();
    let expDate = new Date().setDate(new Date().getDate() + 1);

    let userToUpdate = await db.User.findById(userId);
    userToUpdate.signInToken.expDate = expDate;
    userToUpdate.signInToken = signInToken;
    userToUpdate.save();

    res.json(userToUpdate);
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
    await db.User.findOneAndRemove({ _id: userId }).populate('User').exec();
    res.status(200).end();
  }
  catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
