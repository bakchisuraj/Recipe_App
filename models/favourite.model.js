const mongoose = require("mongoose")

const favouriteSchema = mongoose.Schema({
   id:{type:String,required:true}
})

const favourite = mongoose.model("favourite",favouriteSchema)
module.exports = favourite