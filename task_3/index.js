function createIterable(from, to) {
  //validation
  if (to <= from || !Number.isFinite(to) || !Number.isFinite(from)) {
    throw new Error()
  }
  //creating an iterable object
  const iterObj = {
    from,
    to,
    //adding custom [Symbol.iterator]
    [Symbol.iterator]() {
      this.current = this.from
      return this
    },
    //next() is calling on every iteration of for...of loop
    next() {
      if (this.current <= this.to) {
        //next iteration
        return { done: false, value: this.current++ }
      } else {
        //finish iteration
        return { done: true }
      }
    }
  }
  //return iterable object
  return iterObj
}