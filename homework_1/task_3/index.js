const hotCold = () => {
  let userInput = prompt('Please type two positive numbers')
  let max = Number(userInput.split(' ')[1])
  let min = Number(userInput.trim().split(' ')[0])

  if(isNaN(max) || isNaN(min)) {
    alert('Please enter two positive numbers')
    return hotCold()
  }

  if(max < 0 || min < 0) {
     alert('Please enter only positive numbers')
     return hotCold()
  } 

  if((max - min) < 100 ) {
    alert(`Please enter a number greater than ${min + 99}`)
    return hotCold()
  }

  let numberToGuess =  (Math.random() * (max - min) + min).toFixed()
  console.log(numberToGuess)


  let preveiousConjecture
  let userAttempts = 0

  function userGuessing () {
    let userConjecture = prompt('Try to guess a number')
    if(isNaN(userConjecture) || userConjecture < 0) {
      alert('Please enter a positive number')
      return userGuessing()
    }
    userAttempts++
    if(userConjecture === numberToGuess) {
      return alert((preveiousConjecture === undefined) ? 
      'Great! It\'s like you knew the number' : `You did it in ${ userAttempts } attempts. Congratulations!`)
    } else {
      alert((preveiousConjecture === undefined) ? 'cold' : Math.abs(numberToGuess - userConjecture) < Math.abs(numberToGuess - preveiousConjecture) ? 'warmer' : 'colder')
    }
    preveiousConjecture = userConjecture

    userGuessing()
  }
  userGuessing()



  
  // let keepAsking = true

  // while(keepAsking) {
  //   let userConjecture = prompt('Try to guess a number')
  //   if(isNaN(userConjecture) || userConjecture < 0) {
  //     alert('Please enter a positive number')
  //     continue
  //   }
  //   userAttempts++

  //   if(userConjecture === numberToGuess && preveiousConjecture === undefined) {
  //     keepAsking = false
  //     return alert('Great! It\'s like you knew the number')
  //   } else if (userConjecture === numberToGuess){
  //     keepAsking = false
  //     return alert(`You did it in ${ userAttempts } attempts. Congratulations!`)
  //   }

  //   if(preveiousConjecture === undefined) {
  //     alert('Cold')
  //   } else if(Math.abs(numberToGuess - userConjecture) < Math.abs(numberToGuess - preveiousConjecture)) {
  //     alert('warmer')
  //   }
  //    else if(Math.abs(numberToGuess - userConjecture) > Math.abs(numberToGuess - preveiousConjecture)) {
  //     alert('colder')
  //   }
  //   preveiousConjecture = userConjecture
  // } 
}


hotCold()