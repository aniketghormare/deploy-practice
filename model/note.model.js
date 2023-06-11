const mongoose = require("mongoose")

const notesSchema = mongoose.Schema({
    title: {type:String,required:true},
    body: {type:String,required:true},
    device: {type:String,enum:[ "PC", "TABLET", "MOBILE"],required:true},
    userId:String,
    user:String
}, {
    versionKey: false
})

const notesModel = mongoose.model("note", notesSchema)


module.exports = {
    notesModel
}
