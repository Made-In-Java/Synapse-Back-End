const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');

const jwt = require('jsonwebtoken');


/* Registers a new user if it has an email, document and a sign-in token set on the database */
router.post('/sign-in/:id', async (req, res, next) => {
  let { name, document, email, password } = req.body || null;

  if (!name || !document || !email || !password) {
    res.status(400).end();
  }

  try {
    var user = await db.User.findOne({ 'email': email, 'document': document, 'signInToken.token': req.params.id });

    if (!user || user?.signInToken.expDate < Date.now()) {
      res.status(400).end();
    }

  } catch (err) {
    res.status(500).end();
  }


  try {
    user.password = await bcrypt.hash(password, 11);

    user.document = await bcrypt.hash(document, 11);
    user.documentDisplay = document.substring(0, 3);

    user.signInDate = new Date();

    user.save();

    res.status(201).end();
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
