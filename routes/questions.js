'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const LinkedList = require('../linked-list-class');

// Protect endpoints using JWT Strategy
// router.use(passport.authenticate('jwt', { session: false, failWithError: true }));


const questions = [
  {
    lapine: 'maythennion',
    english: 'acorn',
    next: 1
  },
  {
    lapine:'dahloi',
    english:'dandelion',
    next: 2
  },
  {
    lapine:'yera',
    english:'snow',
    next: 3
  },
  {
    lapine:'syriénnion',
    english:'strawberry',
    next: 4
  },
  {
    lapine:'firth',
    english:'sun',
    next: 5
  },
  {
    lapine:'zyz',
    english:'sun',
    next: 6
  },
  {
    lapine:'efath',
    english:'plant',
    next: 7
  },
  {
    lapine:'hral',
    english:'cloud',
    next: 8
  },
  {
    lapine:'hrdudu',
    english:'mountain',
    next: 9
  },
  {
    lapine:'bryl nos',
    english:'car',
    next: null
  }
];


// const linkedList = new LinkedList();

// function loadDummyData(array){
//   for(let i = 0; i < array.length; i++){
//     linkedList.insertFirst(array[i]);

  
//   }
// }


// loadDummyData(questions);

// let curNode = linkedList.head;

let curNode = questions[0];
let prevNode= null;


router.get('/',(req,res,next) =>{
  console.log('GET WORKS');
  console.log('current NODE',curNode);

  if(curNode.next === null){
    // curNode.next = linkedList.head;
    curNode.next = 0;
  }
  
  let nodes ={
    current: curNode,
    previous: prevNode ? prevNode : {lapine:'',english:''}
  };

  res.json(nodes);

});

router.post('/',(req,res,next) =>{
//  console.log('user answer req body',req.body);
  let {guess} = req.body;
  console.log(guess);
  console.log('currentNode', curNode);
  curNode = questions[curNode.next];
  console.log('currentNodeNew', curNode);

  // if(answer === curNode.value.english){
  // }

  res.json(curNode);

});


module.exports = router;