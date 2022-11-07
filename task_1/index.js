function makeDeepCopy(obj) {
  //check if argument is object
  if (typeof obj !== 'object' || obj === null) {
    throw new Error()
  }
  return recursionClone(obj)
}
//function to recursevly copy an object
function recursionClone(obj) {
  let value
    
  // Return the value if obj is not an object
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }
  //Check if property is Set. Convert it into Array.
  //Make deep clone and return new Set
  if (obj instanceof Set) {
    const array = Array.from(obj)
    const newSet = new Set(recursionClone(array))
    return newSet
  }
  //Check if property is Map.Convert it into Object.
  //Make deep clone and return new Map
  if (obj instanceof Map) {
    const objFromMap = Object.fromEntries(obj)
    const newMap = new Map(Object.entries(recursionClone(objFromMap)))
    return newMap
  }
  //Check if property is regexp
  if(obj instanceof RegExp) {
    return new RegExp(obj)
  }
  // Create an array or object to hold the values
  const newObj = Array.isArray(obj) ? [] : {}
  //use Reflect.ownKeys() static method to iterate over
  //regular property names and Symbol property names
  for (let key of Reflect.ownKeys(obj)) {
    value = obj[key]
    // Recursively (deep) copy for nested objects
    newObj[key] = recursionClone(value)
  }

  return newObj
}

//The only peculiarity of Reflect.ownKeys() method is that  method
//returns all properties (enumerable or not). So, if we
//don't want to deeply clone non-enumerable properties we can
//make slighttly different implementation of this algorithm:

//function to recursevly copy an object (only enumarable property names and Symbols)
//Please, check if makeDeepCopy() function is not commented (on line 1)

// function recursionClone(obj) {
//   let value

//   if (typeof obj !== 'object' || obj === null) {
//     // Return the value if obj is not an object
//     return obj
//   }
//   //Check if property is Set. Convert it into Array.
//   //Make deep clone and return new Set
//   if (obj instanceof Set) {
//     const array = Array.from(obj)
//     const newSet = new Set(recursionClone(array))
//     return newSet
//   }
//   //Check if property is Map.Convert it into Object.
//   //Make deep clone and return new Map
//   if (obj instanceof Map) {
//     const objFromMap = Object.fromEntries(obj)
//     const newMap = new Map(Object.entries(recursionClone(objFromMap)))
//     return newMap
//   }
//   //Check if property is regexp
//   if(obj instanceof RegExp) {
//     return new RegExp(obj)
//   }
//   // Create an array or object to hold the values
//   const newObj = Array.isArray(obj) ? [] : {}
//   //use Reflect.ownKeys() static method to iterate over
//   //regular property names and Symbol property names
//   for (let key in obj) {
//     value = obj[key]
//     // Recursively (deep) copy for nested objects
//     newObj[key] = recursionClone(value)
//   }
//   //also cloning a Symbol property names
//   for (let key of Object.getOwnPropertySymbols(obj)) {
//     value = obj[key]
//     newObj[key] = recursionClone(value)
//   }

//   return newObj
// }

// //I didn't find any differences in output between this two functions.
// //But still, I decided to make another implementation without
// //possible side effects