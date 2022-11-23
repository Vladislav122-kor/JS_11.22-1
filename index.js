const currentCalculation = document.querySelector('.current-operand')
const currentResult = document.querySelector('.current-result')
const calculatorButtons = document.querySelector('.calculator')
currentResult.innerText = '0'
currentCalculation.innerText = ''
let curOp = ''
let isResult = false

calculatorButtons.addEventListener('click', function(event) {
  return calculator(event)
})

function calculator(event) {
  const target= event.target.closest('button')
  let curString = currentCalculation.innerText
  const opArray = ['+', '-', '/', '*']
  let openBracks
  let closedBracks

  if (target.className === 'print') {
    return print()
  }

  if (target.innerText === 'C') {
    return clear()
  }

  if (target.innerText === 'Del') {
    return del()
  }

  if (target.innerText === '=') {
    return calcResult()
  }

  if (target.className === 'operand int') {
    return intInput()
  }

  if (target.className === 'poz-negative') {
    return signChange()
  }

  if (target.className === 'operator') {
    return operator()
  }

  if (target.innerText === '.') {
    return dotOperator()
  }

  if (target.innerText === '(') {
    return openBracket()
  }

  if (target.innerText === ')') {
    return closedBracket()
  }

  //calculator functions
  function calculation(args) {
    let calcArgs = args
    openBracks = 0
    closedBracks = 0
    calcBrackets(calcArgs)
    if (openBracks !== closedBracks) {
      return {error: 'brackets' , brackNum: openBracks - closedBracks}
    }
    let fun = new Function('return ' + calcArgs)
    if (!isFinite(fun())) {
      return 'Error'
    }
    if (fun() > 999999999) {
      const output = fun()
      return output.toExponential()
    }

    if ((fun() % 1).toString().slice(2).length > 8) {
      const output = fun()
      return output.toFixed(8)
    }
      
    return fun()
  }

  function calcBrackets(string) {
    Array.from(string).forEach((item) => {
      if(item === '(') {
        openBracks++
      }
      if(item === ')') {
        closedBracks++
      }
    })
  }

  function print() {
    console.log(curString) 
    currentResult.innerText = 'PRESS F12 TO SEE EQUATATION'
    return
  }

  function clear() {
    isResult = false
    currentCalculation.innerText = ''
    currentResult.innerText = '0'
    curOp = ''
    return
  }

  function del() {
    if(curString.slice(-1) === '(' || curString.slice(-1) === ')') {
      currentCalculation.innerText = curString.slice(0, -1)
      console.log(curOp)
      return
    }
    currentCalculation.innerText = curString.slice(0, -1)
    curOp = curOp.slice(0, -1)
    return
  }

  function calcResult() {
    isResult = true
    if (opArray.includes(curString.slice(-1))) {
      isResult = false
      return
    }
    if (calculation((curString)).length > 10) {
      let curLongResult = calculation(currentCalculation.innerText)
      currentResult.innerText = 'Too long. (Press F12)  '+ curLongResult.toString().slice(0, 4) + '...'
      console.log(curLongResult)
      return
    }
    if(calculation(curString).error) {
      currentResult.innerText = `You have ${calculation(currentCalculation.innerText).brackNum} open brackets`
      return
    } 
    else {
      currentCalculation.innerText = calculation(currentCalculation.innerText)
      curOp = currentCalculation.innerText
      currentResult.innerText = ''
      return
    }
  }

  function intInput() {
    if (isResult) {
      currentCalculation.innerText = ''
      curOp = ''
    }
    isResult = false
    if (curOp.endsWith(')')) {
      currentResult.innerText = 'Please type operand first'
      return
    }
    const curString = currentCalculation.innerText
    if(target.innerText === '0' && curOp === '' ||
    target.innerText === '00' && curOp === '' || 
    target.innerText === '0' && curOp === '(' ||
    target.innerText === '00' && ifStartsWithBracks(curOp)
    )
    {
      currentCalculation.innerText += 0
      curOp += 0
    } 
    else if(curOp === '0' || curString.endsWith('(0')) {
      if(target.innerText === '0' ||
      target.innerText === '00' ) {
        return
      }
      currentCalculation.innerText = curString.slice(0, -1) + target.innerText
      curOp = target.innerText
      return
    }
     else {
      currentCalculation.innerText += target.innerText
      curOp += target.innerText
      return
    }

  }

  function signChange() {
    if(!curOp || curOp === '.') {
      currentResult.innerText = 'Type a number'
      return
    }
    if (curOp * 1 === 0) {
      currentResult.innerText = 'Zero always zero'
      return
    }
    isResult = false
    let curOpLength = curOp.toString().length
    if (curString.endsWith('))')) {
      currentResult.innerText = 'Please remove closing bracket'
      return
    }
    let intChangeSign
    let calcString = Array.from(curString)

    if (curString.endsWith(')')) {
      intChangeSign = calcString.splice(-curOpLength-1)
      intChangeSign = intChangeSign.slice(0, -1)
      calcString = calcString.slice(0, -1)
    } else {
      intChangeSign = calcString.splice(-curOpLength)
    }


    if(intChangeSign.length === 0) {
      currentResult.innerText = 'No number to change'
      return
    }
    if (intChangeSign[0] === '-') {
      intChangeSign.shift()
      const intString = intChangeSign.join('')
      curOp = intString
      currentCalculation.innerText = calcString.join('') +  intString 
      return
    }
    if (intChangeSign[0] !== '-') {
      intChangeSign.unshift('-')
      const intString = intChangeSign.join('')
      curOp = intString
      currentCalculation.innerText = calcString.join('') + '(' + intString + ')'
      return
    }
  }

  function operator() {
    isResult = false
    if (curString.endsWith('.')) {
      currentResult.innerText = 'Type smth after the dot'
      return
    }
    if (!curString) {
      return
    }
    if (curString.endsWith('(')) {
      currentResult.innerText = 'You cannot type it here'
      return
    }
    curOp = ''
    if (opArray.includes(curString.slice(-1))) {
      currentCalculation.innerText = curString.slice(0, -1) + target.dataset.operator
      return
    } 
    else {
    currentCalculation.innerText += target.dataset.operator
    currentResult.innerText = calculation(curString).error ? `You have ${calculation(curString).brackNum} open brackets` : calculation(curString)
    return
    }
  }

  function dotOperator() {
    if (isResult) {
      currentCalculation.innerText = ''
      curOp = ''
    }
    isResult = false
    if(curOp.includes('.')) {
      return
    }
    currentCalculation.innerText += target.innerText
    curOp += target.innerText
    return
  }

  function openBracket() {
    if (isResult) {
      currentCalculation.innerText = ''
      curOp = ''
    }
    isResult = false
    if (curOp || !curOp === '' ) {
      currentResult.innerText = 'You cannot type this here'
      return
    }
    currentCalculation.innerText += target.innerText
    return
  }

  function closedBracket() {
    openBracks = 0
    closedBracks = 0
    if (curString.slice(-2) === '(.') {
      currentResult.innerText = 'Don\'t close dot alone!!!'
      return
    }
    if (opArray.includes(curString.slice(-1))) {
      currentResult.innerText = 'You cannot type it here'
      return
    }
    if (curString.endsWith('(')) {
      currentResult.innerText = 'Please type smth inside'
      return
    }

    calcBrackets(curString)
    if(closedBracks === openBracks) {
      currentResult.innerText = 'No open brackets'
      return
    }
    currentCalculation.innerText += target.innerText
    return
  }

  function ifStartsWithBracks(string) {
    return Array.from(string).every((item) => item === '(')
 }
}

