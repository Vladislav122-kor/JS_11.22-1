// returns a function what won't be triggered until as long as it
// continues to be called
const createDebounceFunction = (cb, delay) => {
  if (typeof cb !== 'function' || !Number.isFinite(delay)) {
    throw new Error()
  }
  let timeout

  return function executedFunction(...args) {
    //The callback function that will be executed after
    //the debounce time has elapsed
    const later = () => {
      clearTimeout(timeout)
      cb(...args)
    }

    clearTimeout(timeout)
    timeout = setTimeout(later, delay)
  }
}
