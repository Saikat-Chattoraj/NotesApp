const mongoose = require("mongoose");

const NoteSchema= new mongoose.Schema({

    title:{
        type: String,
        required: [true,"Please add a title"],
        unique: true,
        trim: true,
        maxlength: [40,"Title cannot be more than 40 words"]
    },
    description:{
        type: String,
        required: [true,'Please Give a Description'],
        unique: true,
        trim: true,
        maxlength: [200,'Description cannot be more then 200 words']
    }

})

module.exports = mongoose.models.Note || mongoose.model('Note',NoteSchema);