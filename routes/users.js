'use strict';

const express = require('express');

const User = require('../models/user');
const Question = require('../models/question');

const router = express.Router();

/* ========== POST/CREATE A NEW USER ========== */
router.post('/', (req, res, next) => {

  const requiredFields = ['username', 'password'];
  const missingField = requiredFields.find(field => !(field in req.body));

  if (missingField) {
    const err = new Error(`Missing '${missingField}' in request body`);
    err.status = 422;
    return next(err);
  }

  const stringFields = ['username', 'password', 'fullname'];
  const nonStringField = stringFields.find(
    field => field in req.body && typeof req.body[field] !== 'string'
  );

  if (nonStringField) {
    const err = new Error(`Field: '${nonStringField}' must be type String`);
    err.status = 422;
    return next(err);
  }

  // If the username and password aren't trimmed we give an error.  Users might
  // expect that these will work without trimming (i.e. they want the password
  // "foobar ", including the space at the end).  We need to reject such values
  // explicitly so the users know what's happening, rather than silently
  // trimming them and expecting the user to understand.
  // We'll silently trim the other fields, because they aren't credentials used
  // to log in, so it's less of a problem.
  const explicityTrimmedFields = ['username', 'password'];
  const nonTrimmedField = explicityTrimmedFields.find(
    field => req.body[field].trim() !== req.body[field]
  );

  if (nonTrimmedField) {
    const err = new Error(`Field: '${nonTrimmedField}' cannot start or end with whitespace`);
    err.status = 422;
    return next(err);
  }

  // bcrypt truncates after 72 characters, so let's not give the illusion
  // of security by storing extra **unused** info
  const sizedFields = {
    username: { min: 1 },
    password: { min: 10, max: 72 }
  };

  const tooSmallField = Object.keys(sizedFields).find(
    field => 'min' in sizedFields[field] &&
      req.body[field].trim().length < sizedFields[field].min
  );
  if (tooSmallField) {
    const min = sizedFields[tooSmallField].min;
    const err = new Error(`Field: '${tooSmallField}' must be at least ${min} characters long`);
    err.status = 422;
    return next(err);
  }

  const tooLargeField = Object.keys(sizedFields).find(
    field => 'max' in sizedFields[field] &&
      req.body[field].trim().length > sizedFields[field].max
  );

  if (tooLargeField) {
    const max = sizedFields[tooLargeField].max;
    const err = new Error(`Field: '${tooLargeField}' must be at most ${max} characters long`);
    err.status = 422;
    return next(err);
  }

  // Username and password were validated as pre-trimmed
  let { username, password = '' } = req.body;
  // fullname = fullname.trim();
  let newQuestions;
  let nextIndex = null;

  User.find({username})
    .count()
    .then((result)=>{
      // console.log('FOUND USER',result);
      if(result !== 0) {
        return Promise.reject({
          code: 422,
          reason: 'ValidationError',
          message: 'Username already taken',
          location: 'username'
        });
      }
      Question.find()
        .then(questions =>  newQuestions = questions.map(question => ({question: question._id})))
        .then(() =>{
          for(let i=0; i< newQuestions.length; i++){
            if(i === newQuestions.length-1){
              newQuestions[i].next = null;
            } else {
              newQuestions[i].next = i+1;
            }
          }
          // console.log('NEWQUESTIONS',newQuestions);
    
        });
    
      return User.hashPassword(password);
    })
    .then(digest => {
     
      const newUser = {
        username,
        password: digest,
        questions: newQuestions,
        head:0
       
      };
      return User.create(newUser);
    })
    .then(result => {
      return res.status(201).location(`/api/users/${result.id}`).json(result);
    })
    .catch(err => {
      console.log('ERR CATCH CHECK',err);
      if(err.reason === 'ValidationError'){
        // const newErr = new Error('Username already exists');
        // newErr.status = 422;
        return res.status(err.code).json(err);
      }
      next(err);
    });
});

module.exports = router;