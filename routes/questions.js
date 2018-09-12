'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LinkedList = require('../linked-list-class');
const User = require('../models/user');

// Protect endpoints using JWT Strategy
router.use(passport.authenticate('jwt', { session: false, failWithError: true }));


// const questions = [
//   {
//     lapine: 'maythennion',
//     english: 'acorn',
//     counter:0
    
//   },
//   {
//     lapine:'dahloi',
//     english:'dandelion'
//   },
//   {
//     lapine:'yera',
//     english:'snow'
//   },
//   {
//     lapine:'syriénnion',
//     english:'strawberry'
//   },
//   {
//     lapine:'firth',
//     english:'sun'
//   },
//   {
//     lapine:'zyz',
//     english:'sun'
//   },
//   {
//     lapine:'efath',
//     english:'plant'
//   },
//   {
//     lapine:'hral',
//     english:'cloud'
//   },
//   {
//     lapine:'hrdudu',
//     english:'mountain'
//   },
//   {
//     lapine:'bryl nos',
//     english:'car'
//   }
// ];


// const linkedList = new LinkedList();

// function loadDummyData(array){
//   for(let i = 0; i < array.length; i++){
//     linkedList.insertFirst(array[i]);

  
//   }
// }


// loadDummyData(questions);

// let curNode = linkedList.head;
// let prevNode= null;


router.get('/',(req,res,next) =>{
 

  console.log('REQ USER', req.user.id);
  console.log('GET WORKS');
  // console.log('current NODE',curNode);

  const userId = req.user.id;
  User.findById(userId)
    .populate('questions.question')
    .then(user =>{

      console.log('CurrentHead',user);
      res.json(user.questions[user.head].question.lapineWord);


    })
    .catch(err => {
      next(err);
    });
      
});

router.post('/',(req,res,next) =>{
  console.log('user answer req body',req.body);
 
  const {guess} = req.body;
  const userId = req.user.id;
  let answer = null;

  User.findById(userId)
    .populate('questions.question')
    .then(user => {
      console.log('REQ USER ID POST',userId); 
     
      let currIndex = user.head;
      let correctCount = user.questions[currIndex].correctAnswers;
      let correctAnswer = user.questions[currIndex].question.englishWord;

      //increment attempt counter
      user.questions[currIndex].attempts += 1;

      console.log('correct count',correctCount);
      let correctGuess;
      console.log('answer',answer,'guess',guess); 
     
      if(answer === guess){
        console.log('CORRECT ANSWER');
        correctGuess = true;
        user.questions[currIndex].correctAnswers +=1;

      }
      else{
        console.log('Wrong ANSWER');
        correctGuess = false;
        
      }
      let nextNode = user.questions[currIndex].next;
      user.head = nextNode;
    
      user.save(function (err, updatedUser) {
        if (err) {
          next(err);
        }
        if(!correctGuess){
          res.json(user.questions[currIndex].question.englishWord);
        } else {
          res.status(200);
        }

      });


    });


});


module.exports = router;