const mongoose  = require('mongoose')

const Crud = mongoose.model('Crud', {
    action: {type: String},
    time: {type: Date, default: Date.now}, 
})


module.exports = { Crud }