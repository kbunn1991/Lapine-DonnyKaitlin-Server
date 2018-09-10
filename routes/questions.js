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
    english: 'acorn'
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
router.get('/',(req,res,next) =>{

  res.json(curNode.value);


});

router.post('/',(req,res,next) =>{
  console.log('user answer req body',req.body);
  // let {answer} = req.body;

  // if(answer === curNode.value.english){
    curNode=curNode.next;
    console.log('next node?',curNode);
  // }

  res.json(curNode);


});


module.exports = router;