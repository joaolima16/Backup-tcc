const jwt = require('jsonwebtoken');
require('dotenv-safe').config();

function verificationToken(req, res, next){
    const token = req.headers['x-access-token'];
    if(!token) return res.status(401).json({authorized:false, msg:'Permission denied'});
    jwt.verify(token, process.env.SECRET,(err, decode)=>{
        if(err) return res.status(401).json({authorized:false, msg:'Permission denided!'});
        req.authorized = decode;
        next();
    });
};

module.exports = verificationToken;