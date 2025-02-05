// document.addEventListener("DOMContentLoaded", function () {
const display = document.querySelector(".display");
const buttons = document.querySelectorAll(".btn");
const equalButton = document.querySelector(".equal");
const historyButton = document.querySelector('.history-button');
const historyPanel = document.querySelector('.history-panel');
const closeHistoryButton = document.querySelector('.close-history');
const historyContent = document.querySelector('.history-content');

let currentInput = '';
let lastOperation = '';
let operatorUsed = false;
let calculationHistory = [];

historyButton.addEventListener('click', () => {
    historyPanel.classList.add('active');
});

closeHistoryButton.addEventListener('click', () => {
    historyPanel.classList.remove('active');
});

// Mouse click input
buttons.forEach((button) => {
    button.addEventListener("click", function () {
        const value = button.textContent.trim();
        handleInput(value);
    });
});

// keyboard input
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9') {
        handleInput(key);
    }
    else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        handleInput(key);
    }
    else if (key === 'Enter') {
        handleInput('=');
    }
    else if (key === 'Backspace') {
        handleInput('⌫');
    }
    else if (key === 'Delete') {
        handleInput('C');
    }
    else if (key === '.') {
        handleInput('.');
    }
    else if (key === 'f') {
        handleInput('n!');
    }
    else if (key === 'p') {
        handleInput('π');
    }
    else if (key === 'e') {
        handleInput('e');
    }
});


// Input Handler
function handleInput(value) {
    if (value === 'C') {
        currentInput = '';
        display.value = '0';
        operatorUsed = false;
    }
    else if (value === '⌫') {
        currentInput = currentInput.slice(0, -1);
        display.value = currentInput || '0';
        operatorUsed = false;
    }
    else if (value === '=') {

        if (/^\d+(\.\d+)?$/.test(currentInput)) {

            alert('Invalid expression! You must enter an operator.');
            return;
        }
        try {
            currentInput = evaluateExpression(currentInput);
            display.value = currentInput;
            operatorUsed = true;
        } catch (error) {
            display.value = 'Error';
            currentInput = '';
            operatorUsed = false;
        }
    }
    else if (value === 'π') {
        if (isValidPlacement(currentInput, 'π')) {
            currentInput += 'π';
            display.value = currentInput;
        } else {
            alert('Invalid (Add operator first)');
        }
    }
    else if (value === 'e') {
        if (isValidPlacement(currentInput, 'e')) {
            currentInput += 'e';
            display.value = currentInput;
        } else {
            alert('Invalid (Add operator first)');
        }
    }
    else if (value === 'n!') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            const result = calculateFactorial(currentInput);
            addToHistory(currentInput, result);
            currentInput = result;
            display.value = currentInput;
        }
    }
    else if (value === 'x2') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calculateMathOperation(currentInput, 'square');
        }
    }
    else if (value === '√x') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calculateMathOperation(currentInput, 'squareroot');
        }
    }
    else if (value === '10x') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calculateMathOperation(currentInput, 'powOfTen');
        }
    }
    else if (value === 'log') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calculateMathOperation(currentInput, 'log');
        }
    }
    else if (value === 'ln') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calculateMathOperation(currentInput, 'ln');
        }
    }
    else if (value === 'exp') {
        if (currentInput === '') {
            alert('Please enter a number first.');
        } else {
            calculateMathOperation(currentInput, 'exp');
        }
    }
    else if (value === 'Sin') {
        calculateTrigonometric(currentInput, Math.sin);
    }
    else if (value === 'Cos') {
        calculateTrigonometric(currentInput, Math.cos);
    }
    else if (value === 'Tan') {
        calculateTrigonometric(currentInput, Math.tan);
    }

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
        // Allow decimal if there is no decimal already in the current operand
        const lastOperand = currentInput.split(/[\+\-\*\/\%]/).pop();  // Get the last operand (after the last operator)

        if (!lastOperand.includes('.')) {
            currentInput += '.';
            display.value = currentInput;
        }
    }
    else if (/[0-9]/.test(value)) {
        // Allow normal number input
        currentInput += value;
        display.value = currentInput;
        console.log(currentInput)
        operatorUsed = false;
    }
    else if (/[+-x÷modxy]/.test(value)) {
        // Handle operator input
        if (currentInput === '') {
            // Prevent input like '+', '-', '*', etc., without any number before it
            alert("Enter number first")
            return;
        }

        // Add operator if a number is present
        currentInput += value;
        display.value = currentInput;
        console.log(currentInput)
        operatorUsed = true;
    }
    else if (value === '(') {
        // Allow '(' if last input is an operator, number, or empty
        if (currentInput === '' || /[+\-*/%^]$/.test(currentInput) || /\d$/.test(currentInput)) {
            currentInput += '(';
            display.value = currentInput;
        }
    }
    else if (value === ')') {
        // Allow ')' if there's an unmatched '('
        if (currentInput.match(/\(/g) && (currentInput.match(/\(/g).length > (currentInput.match(/\)/g) ? currentInput.match(/\)/g).length : 0))) {
            currentInput += ')';
            display.value = currentInput;
        }
    }
}

function isValidPlacement(input, char) {

    const validOperators = ['+', '-', '*', '/', '%', '^'];

    if (input === '' || validOperators.includes(input[input.length - 1])) {
        return true;
    }

    if (/\d|\)/.test(input[input.length - 1])) {
        return false;
    }

    return true;
}


function evaluateExpression(expression) {
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

function calculateTrigonometric(value, func) {
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


function calculateFactorial(input) {
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

function calculateMathOperation(value, operation) {
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
window.addEventListener("error", function (e) {
    display.value = "Error";
    currentInput = '';
});


// function updateDisplay(value) {
//     if (value.length > 15) {
//         display.value = 'Overflow';
//         currentInput = '';   
//     } else {
//         display.value = value || '0';
//     }
// }

function addToHistory(expression, result) {
    calculationHistory.unshift({ expression, result });
    if (calculationHistory.length > 10) calculationHistory.pop();

    historyContent.innerHTML = calculationHistory
        .map(entry => `
                <div class="history-entry">
                    <div class="history-expression">${entry.expression}</div>
                    <div class="history-result">= ${entry.result}</div>
                </div>

            `)
        .join('');
}
// });



document.getElementById('toggle-theme').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');

    const theme = document.body.classList.contains('dark-mode') ? 'dark-mode' : 'light-mode';
    localStorage.setItem('theme', theme);
});

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light-mode';
    document.body.classList.add(savedTheme);
});