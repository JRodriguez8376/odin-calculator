let displayValue ="";
let currentOperator = 0;
let storedValue = 0;

let newOperand = false;
let validOperation = false;
let totalValue = 0;
let first = true;
const calculatorDisplay = document.querySelector('#display-values');
const calculatorButtons = document.querySelectorAll(".calculator-btn");


function add(num1, num2) {
        return(num1 + num2);
}
function sub(num1, num2) {        
        return(num1 - num2)
}
function multiply(num1, num2) {
        product = num1*num2;
        if(product.toString().includes(".")) {
            return(product.toPrecision(5));
        } else {
            return product;
        }
}
function divide(num1, num2) {
        if(num2 === 0) {
            return "NICE TRY";
        }
        quotient = num1/num2;
        if(quotient.toString().includes(".")) {
            return(quotient.toPrecision(5));
        } else {
            return quotient;
        }
}

// Given two operands and an operator, 
// calculate a given operation, return the value
function operate(operator, operand1, operand2) {
    operand1 = parseFloat(operand1) || 0;
    operand2 = parseFloat(operand2) || 0;

    switch(operator) {
        case "+": 
            return(add(operand1, operand2));
        case "-": 
            return(sub(operand1, operand2));
        case "*": 
            return(multiply(operand1, operand2));
        case "/": 
            return(divide(operand1, operand2));
        default:
            return "ERROR";
    }
}
function populateDisplay(value) {
    calculatorDisplay.textContent+=value;
}
function clearDisplay() {
    calculatorDisplay.textContent="";
}
//Perform the appropriate calculation command given a keypress/button click
function parseInput(keypress) {

    const input = this.value || keypress;

    switch(input) {
        case "back":
            if(displayValue != "") {
                displayValue = displayValue.slice(0,-1);
                clearDisplay();
                populateDisplay(displayValue);
            }
            break;
        case "sign":
            if(displayValue != "" && displayValue.includes("-") ) {
                displayValue = displayValue.substring(1);
                clearDisplay();
                populateDisplay(displayValue);
            } else {
                let sign = "-";
                displayValue = sign + displayValue;
                clearDisplay();
                populateDisplay(displayValue);
            }
            break;
        case "%":
            if(displayValue != "") {
                displayValue = operate("*", displayValue, .01).toString();
                clearDisplay();
                populateDisplay(displayValue);
            }
            break;
        case ".":
            if(newOperand) {
                storedValue = displayValue;
                displayValue = "";
                clearDisplay();
                newOperand = false;
                validOperation = true;
            }
            if(displayValue.includes(".")) {
                break;
            }
            if(displayValue == "") {
                displayValue += "0";
                populateDisplay(0);
            }  
            displayValue += input;
            populateDisplay(input);
            break;
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
            if(displayValue.length > 10 && !newOperand) {
                break;
            }
            if(first) {
                first = false;
                displayValue = "";
                storedValue = "";
                totalValue = 0;
                clearDisplay();
                validOperation = false;
                newOperand = false;
            }
            if(newOperand) {
                storedValue = displayValue;
                displayValue = "";
                clearDisplay();
                newOperand = false;
                validOperation = true;
            }
            displayValue += input;
            populateDisplay(input);
            break;
        case "+":
        case "-":
        case "*":
        case "/":
            first = false;
            if(validOperation) {
                totalValue = operate(currentOperator, storedValue, displayValue);
                clearDisplay();
                populateDisplay(totalValue);
                displayValue = totalValue.toString();
                validOperation = false;

            }  
                if(!newOperand) {
                    currentOperator = input;
                    newOperand = true;
                }

            break;
        case "=":
            first = true;
            if(storedValue == "" || displayValue == "") {
                break;
            }
            totalValue = operate(currentOperator, storedValue, displayValue);
            displayValue = totalValue.toString();
            storedValue = displayValue;
            clearDisplay();
            populateDisplay(totalValue); 
            validOperation = false;
            newOperand = false;
            currentOperator = "";
            break;
        case "clear":
            if(storedValue == "" || displayValue == "") {
                clearDisplay();
                populateDisplay(0);
                break;
            }
            clearDisplay();
            displayValue = "";
            storedValue = "";
            totalValue = 0;
            break;
    }
}
//Bind specific keypresses to keys
function parseKeys(event) {
    switch(event.key) {
        case "0":
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "+":
        case "-":
        case "*":
        case "/": 
        case ".":
        case "=":
            parseInput(event.key);
            break;
        case "Enter":
            parseInput("=");
            break;
        case "Backspace":
            parseInput("back");
            break;
        case "c":
            parseInput("clear");
            break;
        case "t":
            parseInput("sign");
            break;
        case "%":
            parseInput("%");
            break;
    }
}
//Adds event listeners for ever button on click
calculatorButtons.forEach(elem =>  {
    elem.addEventListener("click", parseInput)
});
//Keypress event listener
document.addEventListener("keydown", parseKeys);