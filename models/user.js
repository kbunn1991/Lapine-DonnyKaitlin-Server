'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  questions:[
    {
      question: {type:mongoose.Schema.Types.ObjectId, ref:'Question'},
      mValue:{type:Number,default:1},
      next:{type:Number},
      correctAnswers:{type:Number,default:0},
      attempts:{type:Number,default:0}
    }
  ],
  head:{type:Number}
  
  //should be array of objects
  //mimic the linked list in the array
  //use array as linked list
});

userSchema.set('toObject', {
  virtuals: true, // built in virtual id
  versionKey: false, // remove _v
  transform: (doc, ret) => {
    delete ret._id, // delete '_id'
    delete ret.password;
  }
});

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compare(password, this.password);
};

userSchema.statics.hashPassword = function (password) {
  return bcrypt.hash(password, 10);
};

module.exports = mongoose.model('User', userSchema);