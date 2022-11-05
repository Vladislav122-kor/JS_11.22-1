function selectFromInterval(userArray, firstIntParam, secondIntParam ) {
   //call function to validate the arguments
  if(argsError(userArray, firstIntParam, secondIntParam)) {
    
    throw new Error()
  } 
  //sorting the interval, to start from the smaller one
  let sortInt = [firstIntParam, secondIntParam].sort((a,b) => a - b)

  //filter an array with provided interval
  let finallArray = userArray.filter( (item) => item >= sortInt[0] && item <= sortInt[1])
  
  return finallArray

}

//function to check if arguments are correct
function argsError(arr, intOne, intTwo) {
  //check if first argument is an array
  if(!Array.isArray(arr) || 
  //check if all items are numbers
  arr.some((item) => !Number.isFinite(item)) || 
  //check if there no empty slots in array
  arr.includes(undefined) || 
  //check first and second intervals
  !Number.isFinite(intOne) || 
  !Number.isFinite(intTwo) ) {

    return true

  }
}