require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const SECRET_KEY = process.env.SECRET_KEY

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization;
        if (token){
            token = token.split(" ")[1];
            let user = jwt.verify(token, SECRET_KEY)
            await User.findOne({name: user.name}).then(async profile => {
                if(profile){
                    
                    req.user = profile
                }
            })
        }else{
            res.status(401).json({message: "Unauthorized user"})
        }
        next();
    }catch (err) {
        res.status(401).json({message: 'unauthorized'})
    }
}

module.exports = auth;