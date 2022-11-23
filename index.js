// querying html elements
const currentCalculation = document.querySelector('.current-operand')
const currentResult = document.querySelector('.current-result')
const calculatorButtons = document.querySelector('.calculator')
//default values for input 
currentResult.innerText = '0'
currentCalculation.innerText = ''
//current (last) operand in input field
let curOp = ''
/* I display result in Input field. So I need to know if symbols in
input field are result or current equatation. For examople, if you type any number after 
the result it should remove result and start adding numbers from scratch*/
let isResult = false
//add listener to calc field 
calculatorButtons.addEventListener('click', function(event) {
  return calculator(event)
})

function calculator(event) {
  //event delegation
  const target= event.target.closest('button')
  //current string in input
  let curString = currentCalculation.innerText
  //array with operator signs
  const opArray = ['+', '-', '/', '*']
  //variables to store the quantity of open and closed brackets
  let openBracks
  let closedBracks
  //print current equatation (to console)
  if (target.className === 'print') {
    return print()
  }
  //clear input
  if (target.innerText === 'C') {
    return clear()
  }
  //delete last character from input
  if (target.innerText === 'Del') {
    return del()
  }
  //calculate the result 
  if (target.innerText === '=') {
    return calcResult()
  }
  //function invoked if user enter numbers
  if (target.className === 'operand int') {
    return intInput()
  }
  //changing number sign (make negative/positive number)
  if (target.className === 'poz-negative') {
    return signChange()
  }
  //function invoked if user enter operators
  if (target.className === 'operator') {
    return operator()
  }
  //function invoked if user enter dot sign
  if (target.innerText === '.') {
    return dotOperator()
  }
  //function invoked if user enter open bracket
  if (target.innerText === '(') {
    return openBracket()
  }
  //function invoked if user enter closed bracket
  if (target.innerText === ')') {
    return closedBracket()
  }
  //calculator functions
  //function to calculate current result (after user press equal sign)
  function calculation(args) {
    let calcArgs = args
    openBracks = 0
    closedBracks = 0
    //function to calculate the number of brackets
    calcBrackets(calcArgs)
    /*if number not equals zero, calculation() function returns error object
    with the difference between open and closed brackets. I display this number
    and user knows how many brackets he should close to calculate the result
    properly*/
    if (openBracks !== closedBracks) {
      return {error: 'brackets' , brackNum: openBracks - closedBracks}
    }
    //function that calculates equatation
    let fun = new Function('return ' + calcArgs)
    //if more than 8 numbers after dot - cut to 8 signs
    if (fun() % 1 !== 0) {
      let output = fun()
      /**if you type smth like 0.0000000001 function returns 1e-14.
       * So my function gets crushed. To prevent this I do one more check
       */
      if (output.toString().includes('e')) {
        return output
      }
      const decimalPart = fun().toString().split('.')[1]
      if (decimalPart.length > 8) {
        output = output.toFixed(8)
        return output
      }
      return fun()
    }
    // if number is to big we turn it to scientific notation(E.g 10e+5)
    if (fun() > 999999999) {
      const output = fun()
      return output.toExponential()
    }      
    return fun()
  }
  //fucntion to count open and closed brackets. Nothing complicated
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
  //function to output current equatation (or full result)
  function print() {
    console.log(curString) 
    currentResult.innerText = 'PRESS F12 TO SEE EQUATATION'
    return
  }
  //function to clear the display and all calculations
  function clear() {
    isResult = false
    currentCalculation.innerText = ''
    currentResult.innerText = '0'
    curOp = ''
    return
  }
  //function to delete last character
  function del() {
    /*I don't add brackets to curOp (variable that stores current operands), 
    so if I delete bracket I delete them only from output, and I don't need to 
    delete anything from curOp*/
    if(curString.slice(-1) === '(' || curString.slice(-1) === ')') {
      currentCalculation.innerText = curString.slice(0, -1)
      return
    }
    //delete from ouput and from curOp(variable that stores current (last) operands)
    currentCalculation.innerText = curString.slice(0, -1)
    curOp = curOp.slice(0, -1)
    return
  }
  //function to calculate result
  function calcResult() {
    isResult = true
    //if nothing calculate nothing happens
    if(!curString) {
      isResult = false
      return
    }
    if(curOp === '.') {
      isResult = false
      currentResult.innerText = 'DOT what?'
      return
    }
     /*If some open brackets are left, calculator cannot count the result. I send
    to user number of open brackets he needs to enclose */
    if(calculation(curString).error) {
      isResult = false
      currentResult.innerText = `You have ${calculation(currentCalculation.innerText).brackNum} open brackets`
      return
    } 
    // If user wants to divide by zero
    if (!isFinite(calculation(curString))) {
      isResult = false
      currentResult.innerText = 'Error'
      return
    }
    //if last symbol is operator (e.g '+' sign) we cannot calculate the result.
    if (opArray.includes(curString.slice(-1))) {
      isResult = false
      return
    }
    /* If number longer than 10 characters - I display only part of it and ask user
    to open console to see full answer */
    if (calculation((curString)).toString().length > 10) {
      let curLongResult = calculation(currentCalculation.innerText)
      currentResult.innerText = 'Too long. (Press F12)  '+ curLongResult.toString().slice(0, 4) + '...'
      console.log(curLongResult)
      return
    }
   
    /**If everething is ok - calculate the result and display it */
    else {
      currentCalculation.innerText = calculation(currentCalculation.innerText)
      curOp = currentCalculation.innerText
      currentResult.innerText = ''
      return
    }
  }
  //function invoked when user enters numbers
  function intInput() {
    //if output is result = remove it from display
    if (isResult) {
      currentCalculation.innerText = ''
      curOp = ''
    }
    isResult = false
    //cannot enter numbers after closed bracket
    if (curString.endsWith(')')) {
      currentResult.innerText = 'Please type operand first'
      return
    }
    /**If we enter zero as a first number, we cannot enter more than one sign.
     * So, if we press '00' button, we need to got only one zero
     */
    if(target.innerText === '0' && curOp === '' ||
    target.innerText === '00' && curOp === '' 
    )
    {
      currentCalculation.innerText += 0
      curOp += 0
    } 
    /**Same. We cannot enter more than one zero, if 0 is only sign */
    else if(curOp === '0' || curString.endsWith('(0')) {
      if(target.innerText === '0' ||
      target.innerText === '00' ) {
        return
      }
      /**If user entered 0, and then desided to enter another number, this code
       * replaces zero with this number. 
       */
      currentCalculation.innerText = curString.slice(0, -1) + target.innerText
      curOp = target.innerText
      return
    }
     else {
      //If everething is ok - add number to output and curOp variable
      currentCalculation.innerText += target.innerText
      curOp += target.innerText
      return
    }

  }
  //function that changes number sign
  function signChange() {
    //if nothing to change - we chenge nothing
    if(!curOp || curOp === '.') {
      currentResult.innerText = 'Type a number'
      return
    }
    if (curOp * 1 === 0) {
      /**Can't change sing of zero. Also, we can't check if our 'number === 0'
       * Becouse, user can type '0.0000', and that will pass our check. So, I decided
       * to make  more versatile check
       */
      currentResult.innerText = 'Zero always zero'
      return
    }
    isResult = false
    //save length of operannd
    let curOpLength = curOp.toString().length
    //if more brackets than 1, return error message
    if (curString.endsWith('))')) {
      currentResult.innerText = 'Please remove closing bracket'
      return
    }
    //variable to store number to change sign
    let intChangeSign
    //convert input to array
    let calcString = Array.from(curString)
    /**If number have 1 open bracket before, and 1 after - everething is ok.
     * we need this to convert it back from negative (because all negative numbers in my
     * calculator are enclosed in brackets)
     */
    if (curString.endsWith(')')) {
      /**But if it has only closed bracket after - it's not a valid operation */
      if (curString.slice(-(curOpLength + 2),-(curOpLength + 1)) !== '(') {
        currentResult.innerText = 'Please remove closing bracket'
        return
      }
      //get last number from input string and delete it from current equatation
      intChangeSign = calcString.splice(-curOpLength-1)
      //delete closing bracket
      intChangeSign = intChangeSign.slice(0, -1)
      //delete open bracket from equatation
      calcString = calcString.slice(0, -1)
    } else {
      /**if number does't have any brackets around - just cut it from
       * current equatation and place to variable
       */
      intChangeSign = calcString.splice(-curOpLength)
    }
    //if nothing to change we change nothing
    if(intChangeSign.length === 0) {
      currentResult.innerText = 'No number to change'
      return
    }
    //if number is negative
    if (intChangeSign[0] === '-') {
      //delete negative sign
      intChangeSign.shift()
      //make string from array
      const intString = intChangeSign.join('')
      //assign this to curOp variable (for further calculations)
      curOp = intString
      //concatenate final output
      currentCalculation.innerText = calcString.join('') +  intString 
      return
    }
    //if number is positive
    if (intChangeSign[0] !== '-') {
      //add negative sign
      intChangeSign.unshift('-')
      //all same as in previous code
      const intString = intChangeSign.join('')
      curOp = intString
      currentCalculation.innerText = calcString.join('') + '(' + intString + ')'
      return
    }
  }
  //if user press operator button
  function operator() {
    isResult = false
    //if user types the dot only
    if (curOp === '.') {
      currentResult.innerText = 'Type smth after the dot'
      return
    }
    //if current input empty do nothing
    if (!curString) {
      return
    }
    //cannot add operator after open brackets
    if (curString.endsWith('(')) {
      currentResult.innerText = 'You cannot type it here'
      return
    }
    //clear curOp variable
    curOp = ''
    //if last sign is operator = replace it with new user pressed operator
    if (opArray.includes(curString.slice(-1))) {
      currentCalculation.innerText = curString.slice(0, -1) + target.dataset.operator
      return
    } 
    else {
      /**if some open brackets are not closed - return message 
       * with nuumber of open brackets instead of result. 
       * If everetthing is ok = display result in 'current result' output
      */
      currentCalculation.innerText += target.dataset.operator
      currentResult.innerText = calculation(curString).error ? 
      `You have ${calculation(curString).brackNum} open brackets` : 
      calculation(curString)
      return
    }
  }
  //if user pressed '.' sign
  function dotOperator() {
    if (isResult) {
      //if result was before - reset output and curOp variable
      currentCalculation.innerText = ''
      curOp = ''
    }
    isResult = false
    //Cannot type more than 1 dot sign in a row
    if(curOp.includes('.')) {
      return
    }
    //cannot type dot after closed bracke
    if (curString.endsWith(')')) {
      return
    }
    currentCalculation.innerText += target.innerText
    curOp += target.innerText
    return
  }
  //if user type open bracket
  function openBracket() {
    if (isResult) {
      currentCalculation.innerText = ''
      curOp = ''
    }
    isResult = false
    /**cannot type open bracket after the operands. Only after operator
     * or at the begining of equatation
    */
    if (curOp || !curOp === '' ) {
      currentResult.innerText = 'You cannot type this here'
      return
    }
    currentCalculation.innerText += target.innerText
    return
  }
  //if user type closed bracket
  function closedBracket() {
    openBracks = 0
    closedBracks = 0
    //cannot close dot alone
    if (curString.slice(-2) === '(.') {
      currentResult.innerText = 'Don\'t close dot alone!'
      return
    }
    //cannot close after the operator
    if (opArray.includes(curString.slice(-1))) {
      currentResult.innerText = 'You cannot type it here'
      return
    }
    //cannot close empty brackets
    if (curString.endsWith('(')) {
      currentResult.innerText = 'Please type smth inside'
      return
    }
    //Count the number of open and closed brackets
    calcBrackets(curString)
    //Cannot type closed brackets if there no open brackets
    if(closedBracks === openBracks) {
      currentResult.innerText = 'No open brackets'
      return
    }
    //add brackets to output (without adding to carOp variable)
    currentCalculation.innerText += target.innerText
    return
  }
}