const https = require('https');
const data = require('./school.json')
var { School } = require('../models/datamodel');


exports.pushData = async (req, res) => {
    for(i = 0; i < data.length; i++){
        const newSchool = new School({
            name: data[i].displayName,
            ranking: data[i].overallRank,
            city: data[i].city, 
            act_avg: data[i]['act-avg'],
            sat_avg: data[i]['sat-avg'],
            enrollment: data[i].enrollment,
            acceptance_rate: data[i]['acceptance-rate'],
            percent_receiveing_aid: data[i]['percent-receiving-aid'],
            cost_after_aid: data[i]['cost-after-aid'],
            hs_GPA_avg: data[i]['hs-gpa-avg'],
        })
        await School.findOne({name: newSchool.name}).then(async profile =>{
            if(!profile){
                await newSchool.save().then(() => {
                    res.status(200).send(newSchool);
                })
                .catch(err => {
                    if(err){
                        console.log("error is", err.message);
                    }
                })
                
            }else{
                res.send("school already created")
            }
        }).catch(err => {
            console.log("error is", err.message);
        })
            
    }
}

exports.getData = async (req, res) => {
   await School.findOne({name: req.body.name}).then(async profile => {
        if (!profile) {
            res.send("school doesn't exist")
        }else{
            res.status(200).send(profile)
        }
    }).catch(err => {
        console.log("error is", err.message)
    })
}

// Code to get data from url 

// exports.getData = (req, res) => {
//     let url = "https://catfact.ninja/fact"
//     https.get(url,(res) => {

//         let body = "";
    
//         res.on("data", (chunk) => {
//             body += chunk;
//         });
    
//         res.on("end", () => {
//             try {
//                 let json = JSON.parse(body);
//                 console.log(json);
//                 // do something with JSON
//             } catch (error) {
//                 console.error(error.message);
//             };
//         });
    
//     }).on("error", (error) => {
//         console.error(error.message);
//     });

    
// }
   

