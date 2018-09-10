'use strict';

const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

// Protect endpoints using JWT Strategy
router.use(passport.authenticate('jwt', { session: false, failWithError: true }));
//dummy data
// Acorn - maythennion
// Dandelion - dahloi
// Snow - yera
// Strawberry -  syriénnion
// Sun- firth
// Sleep = zyz
// Plant - efath
// Motor Car - hrududu
// Mountain - bryhl nos
// Cloud - hral


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




router.get('/',(req,res,next) =>{




});

// router.post('/')