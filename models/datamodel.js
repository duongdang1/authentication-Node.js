const mongoose = require('mongoose');
const { Schema } = mongoose 
const SchoolDataSchema = new Schema ({
    name: String, 
    ranking: Number,
    city: String, 
    act_avg: Number,
    sat_avg: Number,
    enrollment: Number, 
    acceptance_rate: Number, 
    percent_receiveing_aid: Number, 
    cost_after_aid: Number, 
    hs_GPA_avg: Number, 
    

})
const School = mongoose.model("School", SchoolDataSchema)
module.exports = { School }