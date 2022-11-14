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