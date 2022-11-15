// It's interesting, binding objects in constructor
// 'breaks' class inheritance
// Now, the class methods not inhereting from class constructor, 
// new methods are creating in every new instance instead! 
// So, every instance will have its own setX, getMul, etc.
// const calc = new Calculator(1,2)
// Object.hasOwn(calc, 'setX')    //true
// Object.hasOwn(calc, 'getSum')  //true
// Thanks for such an interesting example :)

class Calculator {
  constructor(arg1, arg2) {
    //binding this to new class that will be created
    //with constructor 
    this.setX = this.setX.bind(this)
    this.setY = this.setY.bind(this)
    this.setX(arg1)
    this.setY(arg2)
    this.getDiv = this.getDiv.bind(this)
    this.getSum = this.getSum.bind(this)
    this.getMul = this.getMul.bind(this)
    this.getSub = this.getSub.bind(this)
  }
  //calculator functions implementation
  setX(num) {
    if (!Number.isFinite(num)) {
      throw new Error()
    }
    this.arg1 = num
  }

  setY(num) {
    if (!Number.isFinite(num)) {
      throw new Error()
    }
    this.arg2 = num
  }

  getSum() {
    return this.arg1 + this.arg2
  }

  getMul() {
      return this.arg1 * this.arg2
  }

  getSub() {
      return this.arg1 - this.arg2
  }

  getDiv() {
    if(this.arg2 === 0) {
      throw new Error()
    }
      return this.arg1 / this.arg2
  }
}
// or we can directly declare all our methods in constructor 
// with arrow functions. As for me, this syntax is more readeble.
// But I will appreciate, if you'll comment what way is preferable

// class Calculator {
//   constructor(arg1, arg2) {
//     this.arg1 = arg1
//     this.arg2 = arg2
//     this.setX = (num) => {
//       if (!Number.isFinite(num)) {
//         throw new Error()
//       }
//       this.arg1 = num
//     }
//     this.setY = (num) => {
//       if (!Number.isFinite(num)) {
//         throw new Error()
//       }
//       this.arg2 = num
//     }
//     this.getDiv = () => {
//       if(this.arg2 === 0) {
//         throw new Error()
//       }
//         return this.arg1 / this.arg2
//     }
//     this.getSum = () => this.arg1 + this.arg2
//     this.getMul = () => this.arg1 * this.arg2
//     this.getSub = () => this.arg1 - this.arg2
//   }
// }