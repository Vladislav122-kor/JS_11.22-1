//JS stack implementation
class Stack {
  //privats
  #maxStackSize
  #stackStorage
  #top
  //static method
  static fromIterable(iterable) {
    if (!iterable || iterable === null || 
      typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Not iterable')
    }
    let newStack
    /* We need two ways of creating array from iterable. 
    One for Map and Set, and one for other iterables. 
    Map iterator returns [key: value] arrays, so we push keys and values,
    instead of values only. And thats wrong.
    Also, for seting maxStackSize we can't use length property for Map and Set. 
    We need to use size property.*/
    if (iterable instanceof Map || iterable instanceof Set) {
      newStack = new Stack(iterable.size)
      const values = [...iterable.values()];
      for (let v of values) {
        newStack.push(v)
      } 
      return newStack
    } 
    newStack = new Stack(iterable.length)
    for (let v of iterable) {
      newStack.push(v)
    }
    return newStack
  }
  //constructor: I have a maxSize, storage, and top (number of elements in Stack)
  constructor (maxStackSize) {
    if (maxStackSize && !Number.isFinite(maxStackSize)) {
      throw new Error('Invalid limit value')
    }
    this.#maxStackSize = maxStackSize ? maxStackSize : 10
    this.#stackStorage = {}
    this.#top = 0
  } 
  //push. Push elem and add 1 to top. Top is seted as a key in object storage
  push(elem) {
    if (this.#top === this.#maxStackSize) {
      throw new Error('Limit exceeded')
    }
    this.#top += 1
    this.#stackStorage[this.#top] = elem
  }
  //delete element and subtract 1 from top
  pop() {
    if (this.#top === 0) {
      throw new Error('Empty Stack')
    }
    delete this.#stackStorage[this.#top]
    this.#top -= 1
  }
  // peeking last element using #top as a key
  peek() {
    if (this.#top === 0) {
      return null
    }
    return this.#stackStorage[this.#top]
  }
  //check if #top === 0
  isEmpty() {
    const storIsEmpty = this.#top === 0 ? true : false
    return storIsEmpty
  }
  //use Object.values static method (return an array of values)
  toArray() {
    return Object.values(this.#stackStorage)
  }
}

class LinkedList  {
  //privats
  #head
  /*Same as Stack. But here we don't need to separate Set, becouse we don't
  need size property. */
  static fromIterable(iterable) {
    if (!iterable || iterable === null || 
      typeof iterable[Symbol.iterator] !== 'function') {
      throw new Error('Not iterable')
    }
    let newLinkedList
    if (iterable instanceof Map) {
      newLinkedList = new LinkedList()
      const values = [...iterable.values()];
      for (let v of values) {
        newLinkedList.append(v)
      } 
      return newLinkedList
    } 
    newLinkedList = new LinkedList()
    for(let v of iterable) {
      newLinkedList.append(v)
    }
    return newLinkedList
  }
  //seting #head property to constructor
  constructor() {
    this.#head = null
  }
  //private method to find last element in linked list
  #findLast(elem) {
    if(elem.next === null) {
      return elem
    }
    return this.#findLast(elem.next)
  }
  /* if first = put into #head. Else= looking for last element and put into 
  last elements 'next' property */
  append(elem) {
    if(this.#head === null) {
      this.#head = {
        value: elem,
        next: null
      }
    } else {
      const lastEl = this.#findLast(this.#head)
      lastEl.next =  {
        value: elem,
        next: null
      }
    }
  }
  /*   put element into #head. And #head into the new elements 'next property'*/
  prepend(elem) {
    const newElem = {
      value: elem,
      next: null
    }
    newElem.next = this.#head
    this.#head = newElem
  }
  /* Search element with recoursion */
  find(elem) {
    function valueCompare(linkedListElement) {
      if (!linkedListElement) {
        return null
      }
      if (linkedListElement.value !== elem) {
        return valueCompare(linkedListElement.next)
      }
      return linkedListElement.value
    }
    return valueCompare(this.#head)
  }
  /* I love recursions:) And here we use it to push  values to array*/
  toArray() {
    const newArr = []
    function arrPush(elem) {
      if (elem) {
        newArr.push(elem.value)
        return arrPush(elem.next)
      } 
      return newArr
    }
    return arrPush(this.#head)
  }
}

class Car {
  //privats
  #brand
  #model
  #yearOfManufacturing
  #maxSpeed
  #maxFuelVolume
  #fuelConsumption
  #damage
  #currentFuelVolume
  #isStarted
  #mileage
  #health 
  //constructor with default properties
  constructor() {
    this.#brand = ''
    this.#model = ''
    this.#yearOfManufacturing = 1950
    this.#maxSpeed = 100
    this.#maxFuelVolume = 20
    this.#fuelConsumption = 1  
    this.#damage = 1  
    this.#currentFuelVolume = 0  
    this.#isStarted = false
    this.#mileage = 0
    this.#health = 100 
  }
  //getters and setters 
  get brand() {
    return this.#brand
  }

  set brand(name) {
    if (name === null || name.length > 50 || name.length < 1 || typeof name !== 'string' 
    ) {
      throw new Error('Invalid brand name')
    }
    this.#brand = name
  }

  get model() {
    return this.#model
  }

  set model(name) {
    if (name === null || name.length > 50 || name.length < 1 || typeof name !== 'string') {
      throw new Error('Invalid model name')
    }
    this.#model = name
  }

  get yearOfManufacturing() {
    return this.#yearOfManufacturing
  }

  set yearOfManufacturing(year) {
    const today = new Date()
    const currentYear = today.getFullYear()
    if (year < 1950 || year > currentYear || !Number.isFinite(year)) {
      throw new Error('Invalid year of manufacturing')
    }
    this.#yearOfManufacturing = year
  }

  get maxSpeed() {
    return this.#maxSpeed
  }

  set maxSpeed(speed) {
    if (speed < 100 || speed > 330 || !Number.isFinite(speed)) {
      throw new Error('Invalid max speed')
    }
    this.#maxSpeed = speed
  }

  get maxFuelVolume() {
    return this.#maxFuelVolume
  }

  set maxFuelVolume(volume) {
    if (volume < 20 || volume > 100 || !Number.isFinite(volume)) {
      throw new Error('Invalid max fuel volume')
    }
    this.#maxFuelVolume = volume
  }

  get fuelConsumption() {
    return this.#fuelConsumption
  }

  set fuelConsumption(consumption) {
    if (consumption <= 0 || !Number.isFinite(consumption)) {
      throw new Error('Invalid fuel consumption')
    }
    this.#fuelConsumption = consumption
  }

  get damage() {
    return this.#damage
  }

  set damage(level) {
    if(!Number.isFinite(level) || level < 1 || level > 5) {
      throw new Error('Invalid damage')
    }
    this.#damage = level
  }

  get currentFuelVolume() {
    return this.#currentFuelVolume
  }

  get isStarted() {
    return this.#isStarted
  }

  get health() {
    return this.#health
  }

  get mileage() {
    return this.#mileage
  }
  //methods
  //starting the car
  start() {
    if (this.#isStarted === true) {
      throw new Error('Car has already started')
    }
    this.#isStarted = true
  }
  //shut down engine
  shutDownEngine() {
    if (this.#isStarted === false) {
      throw new Error('Car hasn\'t started yet')
    }
    this.#isStarted = false
  }
  //to tank your car. Check if car is started, and if you set a valid amount
  fillUpGasTank(liters) {
    if (!Number.isFinite(liters) || liters <= 0) {
      throw new Error('Invalid fuel amount')
    }
    if ((liters + this.#currentFuelVolume) > this.#maxFuelVolume) {
      throw new Error('Too much fuel')
    }
    if (this.#isStarted === true) {
      throw new Error('You have to shut down your car first')
    }
    this.#currentFuelVolume += liters
  }
  /*driving the car. I wrote some easy calculations, to count how much
  fuel and health it will take for the ride. And subtrackt it from current health 
  and fuelVolume. Also I add distance to mileage */
  drive(speed, hours) {
    const distance = speed * hours

    if (!Number.isFinite(speed) || speed <= 0) {
      throw new Error('Invalid speed')
    }
    if (!Number.isFinite(hours) || hours <= 0 ) {
      throw new Error('Invalid duration')
    }
    if (speed > this.#maxSpeed) {
      throw new Error('Car can\'t go this fast')
    }
    if (this.#isStarted === false) {
      throw new Error('You have to start your car first')
    }
    if (this.#fuelConsumption/100 * distance > this.#currentFuelVolume) {
      throw new Error('You don\'t have enough fuel')
    }
    if (this.#damage/100 * distance > this.#health) {
      throw new Error('Your car won\'t make it')
    }
    
    this.#currentFuelVolume -= this.#fuelConsumption/100 * distance
    this.#health -= this.#damage/100 * distance 
    this.#mileage += distance
  }
  //check some condeitions and set health to max (100)
  repair() {
    if (this.#isStarted === true){
      throw new Error('You have to shut down your car first')
    }
    if (this.#currentFuelVolume !== this.#maxFuelVolume) {
      throw new Error('You have to fill up your gas tank first')
    }
    this.#health = 100
  }
  //return the difference between maxFuelVolume and currentFuelVolume
  getFullAmount() {
    return this.#maxFuelVolume - this.#currentFuelVolume
  }
}