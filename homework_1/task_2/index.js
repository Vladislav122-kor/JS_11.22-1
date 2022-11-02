const result = () => {
  let userInput = prompt('Please type the character(or number) and the quantity of colums and rows')
  let arrayFromInput = userInput.trim().split(' ')

  let character = arrayFromInput[0]
  let colRowNum = arrayFromInput[1]

  if(character.length > 3 ) {
    return console.log('Incorrect input')
  }

  if(colRowNum === undefined || colRowNum > 10 ||
    isNaN(colRowNum) ) {
      return console.log('Incorrect input')
    }

  let outputTable = ''
  Array.from({length: colRowNum}, (item) => item = character)
  .forEach((item, index, array) => outputTable += array.join(' ') + '\n')
  console.log(outputTable)
}

result()