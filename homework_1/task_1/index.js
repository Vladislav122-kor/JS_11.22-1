const result = () => {

  // get two numbers from user
  let userInput = prompt('Please type two numbers')   

  //Stop the program if user press 'Cancel'
  if(userInput === null) {
    return
  }
  //spliting string into array
  //I used a trim() method to delete the whitespaces, if user decide to type, e.g. only the second value, after the whitespace(' 3'). Otherwise, I got first empty item in array, and then Number() converts it to 0.
  let arrayFromInput = userInput.trim().split(' ')
  
  //check if every array item is a valid number
  if(arrayFromInput.some((item) => isNaN(item)) ||

  //check if two numbers are set
  //It wasn't specifiend in task text, so I decided to make invalid all inputs with the numbers quantity less or more then 2
    arrayFromInput.length !== 2
    ) {   
      return console.log('Incorrect input') 
  }


  // set the variables for the first and secont number. Also I explicitly convert items from array to Number type. 
  let firstNum = Number(arrayFromInput[0])
  let secondNum = Number(arrayFromInput[1])

  //Output string
  let outputString = `First number: ${firstNum}. Second number: ${secondNum}. Sum: ${firstNum + secondNum}. Product: ${firstNum * secondNum}. Power: ${firstNum ** secondNum}`

  console.log(outputString)
}

result()
