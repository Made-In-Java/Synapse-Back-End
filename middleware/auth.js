const db = require("../models");

const jwt = require("jsonwebtoken");
const { json } = require("express");
/* Authorizes an user if request variable has a valid jwt */
module.exports.isAuthorized = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  const err = new Error("Not authorized");
  err.status = 401;

  if (!authHeader) {
    err.message = "Ausência de token";
    return next(err);
  }

  const [, token] = authHeader.split(" "); // [, "<token>"]

  if (!token || token === "") {
    err.message = "Ausência de token";
    return next(err);
  }

  try {
    const payload = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await db.User.findById(payload.user._id);

    if (!user) {
      return next(err);
    }

    req.user = user;
  } catch (err) {
    err.message = "Bad connection";

    return next(err);
  }

  return next();
};
