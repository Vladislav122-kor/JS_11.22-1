//Please, open the terminal before running the program to see the 
//number you need to guess in console

const hotCold = () => {
  //get the users input
  let userInput = prompt('Please type two positive numbers separated by a space')

  //Stop the program if user press 'Cancel'
  if(userInput === null) {
    return
}
  //set user input to variables and explicitly convert them to a numbers
  let max = Number(userInput.split(' ')[1])
  let min = Number(userInput.trim().split(' ')[0])

  //check if user entered numbers
  if(isNaN(max) || isNaN(min)) {
    alert('Please enter two positive numbers')
    return hotCold()
  }
  // check if user entered positive numbers
  if(max < 0 || min < 0) {
     alert('Please enter only positive numbers')
     return hotCold()
  } 

  //check if difference between first and second number more then 100
  if((max - min) < 100 ) {
    alert(`Please enter a number greater than ${min + 99}`)
    return hotCold()
  }

  //create the number user needs to guess
  let numberToGuess =  (Math.random() * (max - min) + min).toFixed()

  //log the numberToGuess into console  - to ease the program testing. Hope, that's won't be a mistake:)
  console.log(numberToGuess)

  //various for previous user conjection and for number of user attempts
  let preveiousConjecture
  let userAttempts = 0

  //It was interesting for me to make this part of program with recursion. But I  implemented user interaction with While Loop as well.
  //So down below you can see two ways of implementation of this task:
  //- recursion 
  //- while loop (commented below the userGuessing() function)
  //While loop also works correctly. You can uncomment it and check if it works in the right way

  function userGuessing () {
    let userConjecture = prompt('Try to guess a number')
    
    //Stop the program if user press 'Cancel'
    if(userConjecture === null) {
      return
    }

    //Validate user input
    if(isNaN(userConjecture) || userConjecture < 0 || userConjecture === '' ) {
      alert('Please enter a positive number')
      return userGuessing()
    }
    
    //If everething is ok incrementing an attempts counter
    userAttempts++

    //ouput if user guessed
    if(userConjecture === numberToGuess) {
      return alert((preveiousConjecture === undefined) ? 
      'Great! It\'s like you knew the number' : `You did it in ${ userAttempts } attempts. Congratulations!`)
    } else {
      //output if user didn't guess the number
      alert(
      (numberToGuess - userConjecture === 1) ? 'You\'re almost there' : 
      (numberToGuess - userConjecture === -1) ? 'You\'re almost there' : 
      (preveiousConjecture === undefined) ? 'cold' : 
      Math.abs(numberToGuess - userConjecture) <= Math.abs(numberToGuess - preveiousConjecture) ? 'warmer' : 'colder')
    }

    
    preveiousConjecture = userConjecture


    //call the function recursevly
    userGuessing()
  }
  userGuessing()




  //To check the task with While Loop please uncomment it form the line below this

  // let keepAsking = true

  // while(keepAsking) {
  //   //same logic as in userGuessing() function, but without ternary operators
   
  //   let userConjecture = prompt('Try to guess a number')

  //   if(isNaN(userConjecture) || userConjecture < 0 || userConjecture === '') {
  //     alert('Please enter a positive number')
  //     continue
  //   }

  //   if(userConjecture === null) {
  //     return
  //   }

  //   userAttempts++
    
  //   if(userConjecture === numberToGuess && preveiousConjecture === undefined) {
  //     keepAsking = false
  //     return alert('Great! It\'s like you knew the number')
  //   } else if (userConjecture === numberToGuess){
  //     keepAsking = false
  //     return alert(`You did it in ${ userAttempts } attempts. Congratulations!`)
  //   }

  //   if(numberToGuess - userConjecture === 1 || numberToGuess - userConjecture === -1){
  //     alert('You\'re almost there')
  //   }else if(preveiousConjecture === undefined) {
  //     alert('Cold')
  //   } else if(Math.abs(numberToGuess - userConjecture) <= Math.abs(numberToGuess - preveiousConjecture)) {
  //     alert('warmer')
  //   }
  //    else if(Math.abs(numberToGuess - userConjecture) > Math.abs(numberToGuess - preveiousConjecture)) {
  //     alert('colder')
  //   }

  //   preveiousConjecture = userConjecture
  // } 
}


hotCold()