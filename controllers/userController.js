var { User } = require('../models/userModel');
var ObjectID = require('mongoose').Types.ObjectId;
var bcrypt = require('bcrypt')
var saltRounds = 10

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
                        res.status(200).send(newUser);
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
    var newUser = {}
    newUser.name = req.body.name, 
    newUser.email = req.body.email, 
    newUser.password = req.body.password
    await User.findOne({ name: newUser.name}).then(async profile =>{
        if (profile) {
            bcrypt.compare(
                newUser.password,
                profile.password,
                async(err, result) => {
                    if (err) {
                        console.log("error is ", err.message);
                    }else if (result == true){
                        res.send("welcome")
                    }else{
                        res.send("authentication failed")
                    }
                }
            )
        }else{
            res.send("user not exists")
        }
    }).catch(err => {
        console.log("error is: ", err.message)
    })
}