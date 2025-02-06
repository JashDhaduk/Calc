import Calculator from "./math.js";
import { addToHistory } from "./history.js";

const display = document.querySelector('.display')
const calc = new Calculator();
let currentInput = '';
let operatorUsed = false;

export function getCurrentInput() {
    return currentInput;
}

export function setCurrentInput(value) {
    currentInput = value;
}

export function handleInput(value){

    // clear
    if (value === 'C'){
        currentInput = '';
        display.value = '0';
        operatorUsed = false;
    }
    else if (value === '⌫'){
        currentInput = currentInput.slice(0,-1);
        display.value = currentInput;
        operatorUsed = false;
    }

    // Evaluation or Enter
    else if (value === '=') {
        if (/^\d+(\.\d+)?$/.test(currentInput)) {

            alert('Invalid expression! You must enter an operator.');
            return;
        }
        if (currentInput.includes('^')) {
            const [base, exponent] = currentInput.split('^');
            const result = calc.calculatePower(base, exponent);
            addToHistory(currentInput, result);
            currentInput = result;
            display.value = currentInput;
            return;
        }
        try {
            currentInput = calc.evaluateExpression(currentInput);
            display.value = currentInput;
            operatorUsed = true;
        } catch (error) {
            display.value = 'Error';
            currentInput = '';
            operatorUsed = false;
        }
    }

    // constant
    else if (value === 'π') {
        if (calc.isValidPlacement(currentInput, 'π')) {
            currentInput += 'π';
            display.value = currentInput;
        } else {
            alert('Invalid (Add operator first)');
        }   
    } 
    else if (value === 'e') {
        if (calc.isValidPlacement(currentInput, 'e')) {
            currentInput += 'e';
            display.value = currentInput;
        } else {
            alert('Invalid (Add operator first)');
        }   
    }

    // factorial
    else if (value === 'n!') {
        if (currentInput === '' || isNaN(currentInput)) {
            alert('Please enter a valid number first.');
        } else {
            const result = calc.calculateFactorial(parseInt(currentInput));
            addToHistory(currentInput, result);
            currentInput = result; 
            display.value = currentInput;
        }
    }

    // degree
    else if (value === 'x2') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calc.calculateMathOperation(currentInput, 'square');
        }
    } 
    else if (value === '√x') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calc.calculateMathOperation(currentInput, 'squareroot');
        }
    } 
    else if (value === '10x') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calc.calculateMathOperation(currentInput, 'powOfTen');
        }
    } 
    else if (value === 'xy') {
        currentInput += '^';
        display.value = currentInput;
    }

    // Logarthmic
    else if (value === 'log') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calc.calculateMathOperation(currentInput, 'log');
        }
    } 
    else if (value === 'ln') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calc.calculateMathOperation(currentInput, 'ln');
        }
    } 
    else if (value === 'exp') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calc.calculateMathOperation(currentInput, 'exp');
        }
    }

    // Trigonometry
    else if (value === 'Sin') {
        calc.calculateTrigonometric(currentInput, Math.sin);
    } 
    else if (value === 'Cos') {
        calc.calculateTrigonometric(currentInput, Math.cos);
    } 
    else if (value === 'Tan') {
        calc.calculateTrigonometric(currentInput, Math.tan);
    }

    // decimal and negative numbers
    else if (value === '+/-') {
        let currentNumber = parseFloat(currentInput);
    
        if (!isNaN(currentNumber)) {
            currentInput = (currentNumber * -1).toString();
            display.value = currentInput;
        } else {
            alert('Please enter a valid number first.');
        }
    }
    else if (value === '.') {
        const lastOperand = currentInput.split(/[\+\-\*\/\%]/).pop();

        if (!lastOperand.includes('.')) {
            currentInput += '.';
            display.value = currentInput;
        }
    }
    
    // Brackets
    else if (value === '(') {
        if (currentInput === '' || /[+\-*/%]$/.test(currentInput) || /\d$/.test(currentInput)) {
            currentInput += '(';
            display.value = currentInput;
        }
    }
    else if (value === ')') {
        if (currentInput.match(/\(/g) && (currentInput.match(/\(/g).length > (currentInput.match(/\)/g) ? currentInput.match(/\)/g).length : 0))) {
            currentInput += ')';
            display.value = currentInput;
        }
    }

    // for numbers [0-9] && general operators [+-x÷mod]
    else{
        currentInput += value;
        display.value = currentInput;
        operatorUsed = true;
    }
}