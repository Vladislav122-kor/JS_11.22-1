const result = () => {

  // Get the data from user input
  let userInput = prompt('Please type the character (or number) and the quantity of colums and rows separated by a space')
  
  //Stop the program if user press 'Cancel'
  if(userInput === null) {
    return
  }

  let arrayFromInput = userInput.trim().split(' ')

  //Set user input to variablers
  let character = arrayFromInput[0]
  let colRowNum = arrayFromInput[1]

  //Check if character not more then 3 
  if(character.length > 3 ) {
    return console.log('Incorrect input')
    
  }

  //Check if columns/rows input is correct
  if(colRowNum === undefined || colRowNum > 10 ||
    isNaN(colRowNum) || colRowNum === '' ) {
      return console.log('Incorrect input')
       
    }


  //Creating the output string from Array-like object 
  //with length equal to the length provided by user. 
  //Then populate it with user characters (with map() 
  //method provided in Array.from() as a second argument).
  
  //Each array is a table row, the number of items in array 
  //is a number of rows that we need. 
  //So I provide the Array.prototype.forEach() method, 
  //and on each item we concatenate string with user characters 
  //to outputTable variable and add \n to make the line break.

  let outputTable = ''

  Array.from({length: colRowNum}, (item) => item = character)
  .forEach((item, index, array) => outputTable += array.join(' ') + '\n')

  console.log(outputTable)
}

result()