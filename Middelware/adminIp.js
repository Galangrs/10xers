require('dotenv').config();

function allowedIPs(req, res, next) {
    const ip = req.connection.remoteAddress || req.ip;
    const arrayValues = process.env.ALLOWED_IPS
    if (!arrayValues.includes(ip)) {
        return next({"name":"BlockedIps","message":"Ip Blocked"})
    }
    next();
}

module.exports = allowedIPs;
