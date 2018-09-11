'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LinkedList = require('../linked-list-class');
const User = require('../models/user');

// Protect endpoints using JWT Strategy
router.use(passport.authenticate('jwt', { session: false, failWithError: true }));


const questions = [
  {
    lapine: 'maythennion',
    english: 'acorn',
    counter:0
    
  },
  {
    lapine:'dahloi',
    english:'dandelion'
  },
  {
    lapine:'yera',
    english:'snow'
  },
  {
    lapine:'syriénnion',
    english:'strawberry'
  },
  {
    lapine:'firth',
    english:'sun'
  },
  {
    lapine:'zyz',
    english:'sun'
  },
  {
    lapine:'efath',
    english:'plant'
  },
  {
    lapine:'hral',
    english:'cloud'
  },
  {
    lapine:'hrdudu',
    english:'mountain'
  },
  {
    lapine:'bryl nos',
    english:'car'
  }
];


const linkedList = new LinkedList();

function loadDummyData(array){
  for(let i = 0; i < array.length; i++){
    linkedList.insertFirst(array[i]);

  
  }
}


loadDummyData(questions);

let curNode = linkedList.head;
let prevNode= null;


router.get('/',(req,res,next) =>{
 

  console.log('REQ USER', req.user.id);
  console.log('GET WORKS');
  // console.log('current NODE',curNode);

  const userId = req.user.id;
    User.findById(userId)
    .populate('questions.question')
    .then(user => res.json(user.questions[0]));
      
  

    // testUser.populate('questions');

    // console.log('USER QUESTIONS',testUser.username);


  // if(curNode.next === null){
  //   curNode.next = linkedList.head;
  // }

  // let nodes ={
  //   current: curNode.value,
  //   previous: prevNode ? prevNode.value : {lapine:'',english:''}
  // };



  // res.json(nodes);

});

router.post('/',(req,res,next) =>{
 console.log('user answer req body',req.body);
  // let {answer} = req.body;
  console.log('next node?');
  // if(answer === curNode.value.english){
  prevNode=curNode;
  console.log('prevnode',prevNode);
  curNode=curNode.next;
    
  // }

  res.json(curNode);


});


module.exports = router;