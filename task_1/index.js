function makeDeepCopy(obj) {

  //check if argument is object
  if (typeof obj !== "object" || obj === null) {
    throw new Error()

  }
  //function to recursevly copy an object
  function recursionClone(obj) {
    let value
    
    if (typeof obj !== "object" || obj === null) {
      // Return the value if obj is not an object
      return obj 
    } 

    // Create an array or object to hold the values
    let newObj = Array.isArray(obj) ? [] : {}
    
    //use Reflect.ownKeys() static method to iterate over
    //regular property names and Symbol property names
    for (let key of Reflect.ownKeys(obj)) {

      value = obj[key]
      // Recursively (deep) copy for nested objects
      newObj[key] = recursionClone(value)
    }

    return newObj
  }

  return recursionClone(obj)

}