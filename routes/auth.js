const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const router = express.Router();
const db = require('../models');

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

  let date = new Date();
  date.setDate(date.getDate() + 7);
  user.loginToken.expDate = date;

  var newUUID = crypto.randomUUID();
  user.loginToken.token = newUUID;

  try {
    var authUser = await db.User.findByIdAndUpdate(user.id, { 'loginToken': user.loginToken });
  } catch (err) {
    res.status(500).end();
  }

  try {
    res.cookie('auth', newUUID/*, {
      secure: true,
      httpOnly: true,
      expires: date,
      credentials: 'same-origin',
      domain: 'localhost:3000',
      sameSite: 'strict',
    }*/);

  } catch (err) {
    res.status(401).end();
  }

  user.password = '';
  user.loginToken = '';
  res.json({ user });
});

/* Sign-off an user */
router.get('/logout', async function (req, res, next) {
  let authCookie = req.cookies['auth'];
  try {
    let user = await db.User.findOne({ 'token': authCookie });
    if (user) {
      user.loginToken.token = '';
      user.loginToken.expDate = null;
      let authUser = await db.User.findByIdAndUpdate(user.id, { 'loginToken': user.loginToken });
      console.log(authUser);
    }
    res.clearCookie('auth');
    res.status(200).end();
  } catch (err) {
    res.status(500).end();
  }

});

module.exports = router;
