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
      return this.arg1 / this.arg2
  }
}

const calculator = new Calculator(2, 2)
console.log(calculator)
console.log(calculator.getSum()); // 15
console.log(calculator.getDiv()); // 4
calculator.setX(15);
console.log(calculator)
const getCalculatorDiv = calculator.getDiv;
const getCalculatorSum = calculator.getSum;
const getCalculatorSub = calculator.getSub;
const getCalculatorMul = calculator.getMul;
console.log(getCalculatorDiv()) // 5
console.log(getCalculatorSum()) 
console.log(getCalculatorSub()) 
console.log(getCalculatorMul()) 
calculator.setX(21)
console.log(getCalculatorDiv())
const getCalcSetThis = calculator.setY
getCalcSetThis(100)
console.log(calculator)
const getCalcSetThisX = calculator.setX
getCalcSetThisX(10)
console.log(calculator)
console.log(getCalculatorDiv())
const calculator2 = new Calculator(1111, 1111)
console.log(calculator)
console.log(calculator2)
