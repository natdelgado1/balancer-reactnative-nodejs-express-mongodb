const jwt = require("jsonwebtoken");
const secret = process.env.JWT_SECRET_KEY;
module.exports.secret = secret;

module.exports.authenticate = (req, res, next) => {
    console.log(req.cookies);
    jwt.verify(req.cookies.userToken, secret, (err, payload) => {
        console.log(err,payload);
        if (err) {
            res.status(401).json({ verified: false });
        } else {
            next();
        }
    });
}