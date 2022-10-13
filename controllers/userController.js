require('dotenv').config()
var { User } = require('../models/userModel');
var ObjectID = require('mongoose').Types.ObjectId;
var bcrypt = require('bcrypt')
var saltRounds = 10
const jwt = require('jsonwebtoken')
const SECRET_KEY = process.env.SECRET_KEY;

// The index authentication page
//
exports.authentication = (req, res) => {
    res.status(200).send('Authentication page');
}

// Handle the signup POST request.
exports.signup = async (req,res) => {
    const newUser = new User ({
        name: req.body.name, 
        email: req.body.email, 
        password: req.body.password
    })

    await User.findOne({ name: newUser.name}).then(async profile => {
        if (!profile) {
            bcrypt.hash(newUser.password, saltRounds, async (err, hash) => {
                if (err){
                    console.log("Error is", err.message);
                }else{
                    newUser.password = hash; 
                    await newUser.save().then(() => {
                        const token = jwt.sign({email: newUser.email, id: newUser._id}, SECRET_KEY)
                        res.status(201).json({user: newUser, token: token})                    
                    })
                    .catch(err => {
                        if(err){
                            console.log("err is", err.message);
                        }
                    })
                }
            })
        }else{
            res.send("user already created");
        }
    })
    .catch(err => {
        console.log("error is:", err.message);
    })
}

// Handle POST login requests
exports.login = async (req, res) => {
    var existingUser = {}
    existingUser.name = req.body.name, 
    existingUser.email = req.body.email, 
    existingUser.password = req.body.password,
    existingUser.tokens = req.body.tokens
    await User.findOne({ name: existingUser.name}).then(async profile =>{
        if (profile) {
            bcrypt.compare(
                existingUser.password,
                profile.password,
                async(err, result) => {
                    if (err) {
                        return res.status(500).json({message: "something went wrong"}) 
                    }else if (result == true){
                        const token = jwt.sign({name: profile.name, id: profile._id}, SECRET_KEY, {expiresIn: '1d'});
                        let oldTokens = profile.tokens || []
                        if (oldTokens.length){
                            oldTokens = oldTokens.filter(t => {
                                const timeDiff = (Date.now() - parseInt(t.signedAt)) / 1000
                                if (timeDiff < 86400){
                                    return t
                                }

                            })
                        }
                        await User.findByIdAndUpdate(profile._id, {
                            tokens: [...oldTokens, { token, signedAt: Date.now().toString() }],
                          });
                        
                        const userInfo = {
                        name: existingUser.name,
                        email: existingUser.email,
                        
                        };
                    
                        
                        return res.status(201).json({success: true, user: userInfo, token})
                    }else{
                        return res.status(500).json({message: "authentication failed"});
                        
                    }
                }
            )

        }else{
            return res.status(404).json({message: "user not found"})
            
        }
    }).catch(err => {
        console.log("error is: ", err.message)
        return res.status(500).json({message: "something went wrong"})
    })
}

exports.logout = async (req, res) => {
    // if(req.headers && req.headers.authorization){
    //     console.log(req.headers.authorization);
    //     res.send('ok')
    //     // const token = req.headers.authorization.split(' ')[1]
    //     // if(!token){
    //     //     return res.status(401).json({success: false, message: 'Authorization fail!'});

    //     // }
    //     // const tokens = req.user.tokens;

    //     // const newTokens = tokens.filter(t => t.token !== token);
    
    //     // await User.findByIdAndUpdate(req.user._id, {tokens: newTokens})
    //     // return res.status(201).json({success: true, message: "Sign out successfully"})
    // }
    if (req.headers && req.headers.authorization) {
        const token = req.headers.authorization.split(' ')[1];
     
        if (!token) {
        return res
            .status(401)
            .json({ success: false, message: 'Authorization fail!' });
        }
        const tokens = req.user.tokens;
        
        
        
        const newTokens = tokens.filter(t => t.token !== token)
        console.log(newTokens)
        await User.findByIdAndUpdate(req.user._id, { tokens: newTokens });
        res.json({ success: true, message: 'Sign out successfully!' });
      }
}