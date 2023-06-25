const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../models');
const auth = require('../middleware/auth');

/* Get all users */
router.get('/', auth.isAuthorized, async (req, res, next) => {
  try {
    let users = await db.User.find({}).select('-password -loginToken -document');
    res.json({ users })
  } catch (err) {
    res.status(500).end();
  }
});

/* Get single user */
router.get('/:id', auth.isAuthorized, async (req, res, next) => {
  try {
    let users = await db.User.findById(req.params.id).select('-password -loginToken -document');
    res.json({ users })
  } catch (err) {
    res.status(500).end();
  }
});

/* Add a new User */
router.post('/', auth.isAuthorized, async (req, res, next) => {

});

/* Update data from user */
router.put('/:id', auth.isAuthorized, async (req, res, next) => {

});

/* Delete user */
router.delete('/:id', auth.isAuthorized, async (req, res, next) => {

});

module.exports = router;
