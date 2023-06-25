const crypto = require('crypto');
const db = require('../models');

module.exports.isAuthorized = async (req, res, next) => {

    var authCookie = req.cookies['auth'] || null;

    var err = new Error('Not authorized');
    err.status = 401;

    if (!authCookie || authCookie === '') {
        err.message = "Bad cookie";
        return next(err);
    }

    try {
        var user = await db.User.findOne({ 'loginToken.token': authCookie });
    } catch (err) {
        err.message = "Bad connection";
        return next(err);
    }

    if (!user) {
        err.message = "Bad cookie";
        return next(err);
    }

    if (user.loginToken.expDate < new Date() || user.loginToken.token === '') {
        err.message = "Bad cookie";
        return next(err);
    }

    return next();
}