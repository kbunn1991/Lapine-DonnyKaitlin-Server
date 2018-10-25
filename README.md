# Bunny Babble Server 

This is the server side repository for Bunny Babble and is where the business logic of spaced-repetition algorithm is implemented.

## Algorithm Implementation

The spaced-repetition algorithm is implemented server-side via a singly linked list data structure. There are two main parts to this implementation: 

1) In the User schema where we define our node for our linked list - in this case, our questions are an array of objects that each have a "next" property that acts as a pointer to the next node (or question in our case). Each question also has a property we have called "mValue" that will be for tracking and adjusting the frequency of a word's appearance. We also have a property called head that keeps track of the current head of our linked list. 

```
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

});
```

2)  When the user submits their answer, the answer connects to the backend API and hits a POST endpoint which then takes the submitted answer, compares it with the correct answer, adjusts the mValue and sets the head of our linked list to the the next value of our current node - which if you recall, each node is a question in our case.

A detailed and commented walk-through of implemented code is found below:

```
      //Local variables having to do with the position
      let currIndex = user.head;
      let question = user.questions[currIndex];

      //Local variables having to do with the accuracy tracking
      let answer = user.questions[currIndex].question.englishWord;
      let correctGuess = true;

      //Increment attempt counter
      user.questions[currIndex].attempts += 1;

      // Compare our user input (guess) with our correct answer
      // console.log('answer',answer,'guess',guess); 
      if(answer === guess.replace(/\s+/g, '').toLowerCase()){
        correctGuess = true;
        user.questions[currIndex].correctAnswers +=1;
        user.questions[currIndex].mValue *= 2;
      }
      else{
        correctGuess = false;
        user.questions[currIndex].mValue = 1;
      }

      //Set head to the value of next pointer (unless it's the end)
      //This is what changes the word being displayed -
      //every time you send a post request, the head is set to the next item
      if (user.head === null) {
        user.head = 0;
      } else {
        user.head = question.next;
      }

      //Move the question back based on the mValue calculated above
      //temp variable that stores a copy of our current node and a counter
      let currNode = question;
      let counter = 0;

      //Loop until we reach our mValue (our new position)
      //Each iteration, move to the next node 
      while(counter !== question.mValue){
        if (currNode.mValue > user.questions.length) {
          currNode.mValue = user.questions.length - 1;
       
        }
        (currNode !== null) ?
          currNode = user.questions[currNode.next] : 
          currNode = user.questions[user.head];
        counter++;
      }
      
      //When the new position is reached, 
      //set the current nodes's next pointer value to the temporary node's next value
      //And the temporary next pointer's value to the original node's head
      //this effectively inserts the original node at a new position 
      // M spaces away from where it was originally
    
      question.next = currNode.next;
      currNode.next = currIndex;
```

