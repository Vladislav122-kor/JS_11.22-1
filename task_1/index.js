function makeDeepCopy(obj) {
  let value
  
  if (typeof obj !== "object" || obj === null) {
    // Return the value if obj is not an object
    return obj 
  } 

  // Create an array or object to hold the values
  let newObj = Array.isArray(obj) ? [] : {}

  for (let key of Reflect.ownKeys(obj)) {

    value = obj[key]
    // Recursively (deep) copy for nested objects
    newObj[key] = makeDeepCopy(value)
  }

  return newObj
}
