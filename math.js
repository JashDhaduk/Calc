// import { setupUI } from './ui.js';

// document.addEventListener("DOMContentLoaded", () => {
//     setupUI();
// });

import { handleInput } from "./inputHandler";

export function isValidPlacement(input, char) {

    const validOperators = ['+', '-', '*', '/', '%', '^'];
    
    if (input === '' || validOperators.includes(input[input.length - 1])) {
        return true;
    }

    if (/\d|\)/.test(input[input.length - 1])) {
        return false;
    }

    return true;
}


export function evaluateExpression(expression) {
    expression = expression.replace(/π/g, Math.PI);
    expression = expression.replace(/e/g, Math.E);
    expression = expression.replace(/x/g, '*');
    expression = expression.replace(/÷/g, '/');
    expression = expression.replace(/mod/g, '%'); 
    expression = expression.replace(/xy/g, '^')  

    try {
        const result = Function('return ' + expression)();
        addToHistory(currentInput, result);
        return result.toString();
    } 
    catch (error) {
        throw new Error("Invalid Expression");
    }
}

function degreesToRadians(degrees) {
    return degrees * (Math.PI / 180);
}

export function calculateTrigonometric(value, func) {
    let angle = parseFloat(value);
    if (isNaN(angle)) {
        alert('Please enter an angle in degrees first.');
    } else {
        const radians = degreesToRadians(angle);
        currentInput = func(radians).toString();
        addToHistory(angle, currentInput);
        display.value = currentInput;
    }
}


export function calculateFactorial(input) {
    const num = parseInt(input);
    if (isNaN(num) || num < 0) {
        throw new Error('Invalid Input');
    }
    let factorial = 1;
    for (let i = 1; i <= num; i++) {
        factorial *= i;
    }
    return factorial.toString();
}

export function calculateMathOperation(value, operation) {
    const input = parseFloat(value);
    if (isNaN(input)) {
        alert('Please enter a valid number first.');
        return;
    }

    let result;
    switch (operation) {
        case 'square':
            result = input * input;
            break;
        case 'squareroot':
            result = Math.sqrt(input);
            break;
        case 'powOfTen':
            result = Math.pow(10, input);
            break;
        case 'log':
            result = Math.log10(input);
            break;
        case 'ln':
            result = Math.log(input);
            break;
        case 'exp':
            result = Math.exp(input);
            break;
        default:
            alert('Unknown operation');
            return;
    }

    currentInput = result.toString();
    addToHistory(value, currentInput);
    display.value = currentInput;
}
