const db = require('../models');

const jwt = require('jsonwebtoken');
const { json } = require('express');
/* Authorizes an user if request variable has a valid jwt */
module.exports.isAuthorized = async (req, res, next) => {

    var token = req.body.token || req.cookies?.token || null;
    var err = new Error('Not authorized');
    err.status = 401;

    if (!token || token === '') {
        err.message = "Bad cookie";
        return next(err);
    }

    try {
        const payload = jwt.verify(token, process.env.TOKEN_KEY);
        var user = await db.User.findById(payload.user._id);
    } catch (err) {
        err.message = "Bad connection";
        return next(err);
    }

    if (!user) {
        return next(err);
    }
    return next();
}