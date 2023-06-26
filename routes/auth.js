const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');

const jwt = require('jsonwebtoken');


/* Register new user */
router.post('/sign-in', async (req, res, next) => {
  try {
    let userWithSameData = await db.User.findOne({ $or: [{ 'email': req.body.email }, { 'document': req.body.document }] });

    if (userWithSameData) {
      res.status(400).end();
    }
  } catch (err) {
    res.status(500).end();
  }

  let user = new db.User(req.body);

  if (!user.password || !user.document || !user.email) {
    res.status(400).end();
  }
  user.emailDiaplay = user.email.substring(0, 3);
  // user.email = await bcrypt.hash(user.email, 11);

  try {
    user.password = await bcrypt.hash(user.password, 11);

    user.documentDisplay = user.document.substring(0, 3);
    user.document = await bcrypt.hash(user.document, 11);

    user.createdAt = new Date();
    user.save();

    delete user.password;
    res.json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* Authenticate an user */
router.post('/login', async (req, res, next) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    res.status(400).end();
    return;
  }

  try {
    var user = await db.User.findOne({ 'email': email });
  } catch (err) {
    res.status(500).end();
    return;
  }

  if (!user) {
    res.status(404).end();
    return;
  }

  try {
    if (! await bcrypt.compare(password, user.password)) {
      res.status(401).send("Wrong password");
      return;
    }
  } catch (err) {
    res.status(500).end();
    return;
  }

  const payload = { user };
  const token = jwt.sign(payload, process.env.TOKEN_KEY);
  res.json({ token });
});

module.exports = router;
