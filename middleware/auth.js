const db = require("../models");

const jwt = require("jsonwebtoken");
const { json } = require("express");
/* Authorizes an user if request variable has a valid jwt */
module.exports.isAuthorized = async (req, res, next) => {
  const [, token] = req.headers.authentication.split(" ");

  const err = new Error("Not authorized");
  err.status = 401;

  if (!token || token === "") {
    err.message = "Bad cookie";
    return next(err);
  }

  try {
    const payload = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await db.User.findById(payload.user._id);
  } catch (err) {
    err.message = "Bad connection";

    return next(err);
  }

  if (!user) {
    return next(err);
  }

  return next();
};
