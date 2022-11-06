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

  // //Algorithm that recursevly copying Symbol property names
  // for(let key of Object.getOwnPropertySymbols(obj)) {
  //   value = obj[key]

  //   newObj[key] = makeDeepCopy(value)
  // }

  return newObj
}


const obj = {
  a: 1,
  b: 2,
  c: 4,
  [Symbol('eee')]: 555,
  l: {
    ad:34,
    [Symbol('kkk')] : {
      kk: 1,
      ff: 2,
    },
    4: 'aaa',
    1: true
  },
  lasd: undefined,
  trust: true,
  cast: null
}

const newObj = makeDeepCopy(obj)
console.log(obj)
console.log(newObj)