'use strict';
const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  lapineWord:{type:String,required:true,unique:true},
  englishWord:{type:String,required:true},
  hint:{type:String},
  imageURL:{type:String},
  mValue:{type:Number,default:1},
  
  
});


questionSchema.set('toObject', {
  virtuals: true, // built in virtual id
  versionKey: false, // remove _v
  transform: (doc, ret) => {
    delete ret._id, // delete '_id'
    delete ret.password;
  }
});


module.exports = mongoose.model('Question', questionSchema);