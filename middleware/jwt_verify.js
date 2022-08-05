const jwt = require('jsonwebtoken');
const config = process.env;
const verifyToken = (req, res, next) => {
    const Usertoken = (req.body.token || req.query.token || req.headers['x-access-token']);
    if (!Usertoken) return res.status(403).json({ message: "Please provide token for authentication" });
    jwt.verify(Usertoken, config.TOKEN_KEY, function(err, decoded) {
        if (err) {   
            return res.status(401).send(err)
        }
        return next();
    }); 
}
module.exports = verifyToken;