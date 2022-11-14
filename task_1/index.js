// I use closure to store and update the newString variable, 
// and make it accessible to all functions created and called 
// inside the concatStrings()  function
let concatStrings = (string, separator) => {
  // variable to store our string (during function execution 
  // it will be updated with closure)
  let newString = string
  // If we find not valid variable we call the function
  // to pass all remaining variables. It doesn't change
  // or update our variable. Just call itself until it 
  // find the fincal call '()'  and return empty string.
  if (typeof newString !== 'string') {
    return function noFirstArgPass(args) {
      if (args || args === '' || Number.isNaN(args)) {
        return noFirstArgPass
      }
      return ''
    }
  }
  // check if separator is valid
  if (typeof separator !== 'string') {
    // not valid - no separator
    separator = undefined
  }
  // if separator exists we add it to string
  if (separator && newString !== '') {
    newString = string + separator
  } 
  // And closure begins
  return function getNextArgs(nextString) {
    // If we find final call '()' return our string
    if (!nextString && nextString !== '' && typeof nextString !== 'number') {
      if (separator) {
        // remove last separator
        return newString.slice(0, -separator.length)
      }
      return newString
    }
    // If we find not valid variable we call the function
    // to pass all remaining variables. It doesn't change
    // or update our variable. Just call itself until it 
    // find the fincal call '()' .
    if (typeof nextString !== 'string' ) {
      return function passRemainingArgs(args) {
        if (args || args === '' || Number.isNaN(args)) {
          return passRemainingArgs
        }
        if (separator) {
        //remove last separator
          return newString.slice(0, -separator.length)
        }
        return newString
      }
    }
    // If next call has valid string - update our string,
    // end return function (without call, only function itself)
    if (separator && nextString !== '') {
      newString += nextString + separator
      return getNextArgs
    }
    newString += nextString
    return getNextArgs
  } 
}




console.log( concatStrings('111', '---')('1')('111')('a')('111')('111')('111')('111')('111')('111')('111')('111')('90')('asd')('111')('111')('111')('111')('111')('111')('111')('111')('111')('111')('111')('111')('111')('111')('aaa')(1)('last-string')('')('')()
)
console.log(concatStrings('a')('b')('c')(null))
console.log(concatStrings('a')('b')()
)
console.log(concatStrings('a')('b')('c')())
console.log(concatStrings('a', 'null')('b')('c')())
console.log(concatStrings('a', null)('b')('c')()
)