// declare a new class
// the class was named after it's purpose, calculator
// the class have 7 methods
// which are: clear, delete, appendNumber, chooseOperation, compute, getDisplayNumber, updateDisplay
// clear will responsible to remove all the numbers from the display
// delete will responsible to remove last element or last number from input display
// appendNumber will responsible to add the number to the input display
// chooseOperation will responsible to choose the operation
// compute will responsible to do the operation, which are add, subtract, multiply and divide
// getDisplayNumber will responsible to get the number from the input display, and return it
// updateDisplay will responsible to update the display every user klicked on the button
class Calculator {
  // this constructor is responsible to initialize the class
  // it will take two parameters, previousOperandTextElement and currentOperandTextElement
  // previousOperandTextElement is the element that will display the previous number
  // currentOperandTextElement is the element that will display the current number

  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement
    this.currentOperandTextElement = currentOperandTextElement
    this.clear()
  }

  // this method is responsible to clear the display
  clear() {
    this.currentOperand = ''
    this.previousOperand = ''
    this.operation = null
  }

  // this method is responsible to delete the last element or last number from input display
  delete() {
    // we will use the slice method to remove the last element from the string
    // because the slice method will remove the last element from the string
    this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }

  // this method is responsible to add the number to the input display
  // it will take one parameter, a number
  appendNumber(number) {
    // check if the number is a dot
    // if it is a dot, we will check if the currentOperand already have a dot
    // if it already have a dot, we will return and terminate this method
    if (number === '.' && this.currentOperand.includes('.')) return
    // if the currentOperand is empty, we will set the currentOperand to the number that we passed in
    this.currentOperand = this.currentOperand.toString() + number.toString()
  }

  // this method is responsible to choose the operation
  // it will take one parameter, an operation which are add, subtract, multiply and divide
  chooseOperation(operation) {
    // if the currentOperand is empty, we will return and terminate this method
    if (this.currentOperand === '') return
    // if the previousOperand is empty, we call the compute method to do the operation
    if (this.previousOperand !== '') {
      this.compute()
    }
    // we will set the operation to the operation that we passed in
    this.operation = operation
    this.previousOperand = this.currentOperand
    this.currentOperand = ''
  }

  // compute method will responsible to do the operation, which are add, subtract, multiply and divide
  compute() {
    // let's declare a variable to store the result
    let computation

    // and then parse the previousOperand and currentOperand to float
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)

    // if prev and current is not a number, we will return and terminate this method
    if (isNaN(prev) || isNaN(current)) return

    // other than that, let's do a switch case to do the operation
    switch (this.operation) {
      // if the operation is add, we will add the previousOperand and currentOperand
      case '+':
        computation = prev + current
        // then stop the switch case
        // below case are same as the above case
        break
      case '-':
        computation = prev - current
        break
      case '*':
        computation = prev * current
        break
      case '÷':
        computation = prev / current
        break
      default:
        return
    }
    // then we will set the currentOperand to the result
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand = ''
  }

  // this method is responsible to get the number from the input display, and return it
  getDisplayNumber(number) {
    // convert the number to string by using toString method
    const stringNumber = number.toString()
    // and then parse the stringNumber to float and assign it to variable integerDigits
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    // let's declare a variable to store the integerDisplay
    let integerDisplay

    // check if the integerDigits is not a number
    if (isNaN(integerDigits)) {
      // if it is not a number, we will set the integerDisplay to empty string
      integerDisplay = ''
    } else {
      // if it is a number, we will set the integerDisplay to the integerDigits
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 })
    }

    // and then check if the decimalDigits is not null
    if (decimalDigits != null) {
      // if it is not null, we will return the integerDisplay and decimalDigits
      return `${integerDisplay}.${decimalDigits}`
    } else {
      // or else we will return the integerDisplay anyway
      return integerDisplay
    }
  }

  // this method is responsible to update the display every user klicked on the button
  updateDisplay() {
    // every time this method is called, set the currentOperandTextElement to the currentOperand that was returned from getDisplayNumber method and pass in the currentOperand as a argument
    this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
    // first check if the currentOperandTextElement is not null
    if (this.operation != null) {
      // if it is not null, we will set the previousOperandTextElement to the previousOperand that was returned from getDisplayNumber method and pass in the previousOperand as a argument
      this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
    } else {
      // or else we will set the previousOperandTextElement to empty string
      this.previousOperandTextElement.innerText = ''
    }
    // and then check if the currentOperandTextElement is an empty string
    if (this.currentOperandTextElement.innerText === '') {
      // if it is an empty string, we will set the currentOperandTextElement to 0
      this.currentOperandTextElement.innerText = '0'
    }
  }
}

// let's grab all the element that we want to use, to make the calculator
const numberButtons = document.querySelectorAll('.operand_number')
const operationButtons = document.querySelectorAll('.operand')
const equalsButton = document.querySelector('.operand_equals')
const deleteButton = document.querySelector('.operand_delete')
const curOperand = document.querySelector('.cur_output')
const prevOperand = document.querySelector('.prev_output')
const allClear = document.querySelector('.operand_ac')

// let's create a new instance of Calculator class
const calculator = new Calculator(prevOperand, curOperand)

// let's add event listener to all the number buttons
// each time the user klicked on each button, call the appendNumber method and pass in the number that was clicked on
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText)
    calculator.updateDisplay()
  })
})

// let's add event listener to all the operation buttons
// each time the user klicked on each button, call the chooseOperation method and pass in the operation that was clicked on
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText)
    calculator.updateDisplay()
  })
})

// let's add event listener to the equals button
// each time the user klicked on the equals button, call the compute method
equalsButton.addEventListener('click', () => {
  calculator.compute()
  calculator.updateDisplay()
})

// let's add event listener to the delete button
// each time the user klicked on the delete button, call the deleteNumber method
deleteButton.addEventListener('click', () => {
  calculator.delete()
  calculator.updateDisplay()
})

// let's add event listener to the all clear button
// each time the user klicked on the all clear button, call the clear method
allClear.addEventListener('click', () => {
  calculator.clear()
  calculator.updateDisplay()
})
