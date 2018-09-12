'use strict';

const Question = require('../models/question');
const mongoose = require('mongoose');

const { TEST_DATABASE_URL } = require('../config');
const seedWords = require('./questions.json');

let newQuestions = null;

console.log(`Connecting to mongodb at ${TEST_DATABASE_URL}`);
mongoose.connect(TEST_DATABASE_URL)
  .then(() => {
    console.info('Dropping Database');
    // return mongoose.connection.db.dropDatabase();
  })
  .then(() => {
    console.info('Seeding Database');
    return Promise.all([

   

      Question.insertMany(seedWords),
      Question.createIndexes(),

    // Question.find()
    //     .then(results => console.log(results))

 

    //   Question.find()
    //     .then(questions => {
    //       newQuestions = questions.map((question,index) =>{
    //         question._id,
           

           
    //     })
    //     .then(()=> console.log(newQuestions))

    

 

    ]);
  })
  .then(() => {
    console.info('Disconnecting');
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(err);
    return mongoose.disconnect();
  });