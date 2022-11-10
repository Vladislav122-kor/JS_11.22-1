// Use Object.defineProperty static method to set the method to the
// Array.prototype
// We can also set another property descriptors (e.g. writeble: false) to prevent unintentional changes of this method

Object.defineProperty(Array.prototype, 'customFilter', {
  // Implementation of filter method extended with thisArg property
  value: function (callback, thisArg) {
    if (
      typeof callback !== 'function' ||
      thisArg && typeof thisArg !== 'object' ||
      thisArg && Array.isArray(thisArg) ||
      thisArg && typeof thisArg === 'null'
    ) {
      throw new Error()
    }
    const filteredArray = []
    this.forEach((item, index, array) => {
      if (callback.call(thisArg, item, index, array)) {
        filteredArray.push(item)
      }
    })
    return filteredArray
  }
})