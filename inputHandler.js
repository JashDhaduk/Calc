// // export const inputHandler = (() => {
// //     let isDecimalNumber = false;
// //     const operators = ['-', '+', '^', '*', '/', '%'];
// //     let parenthesis = 0;

// //     const resetParenthesis = () => (parenthesis = 0);

// //     const updateDecimalNumber = (input) => {
// //         if (input.length <= 0) {
// //             isDecimalNumber = false;
// //             return;
// //         }
// //         const lastChar = input[input.length - 1];
// //         isDecimalNumber = lastChar === '.' || (!operators.includes(lastChar) && isDecimalNumber);
// //     };

// //     const checkOperator = (input) => {
// //         if (input.length < 2) return input;
// //         const lastChar = input[input.length - 1];
// //         const prevChar = input[input.length - 2];

// //         if (operators.includes(lastChar) && operators.includes(prevChar)) {
// //             return input.slice(0, -1);
// //         }
// //         return input;
// //     };

// //     const processInput = (input) => {
// //         const lastChar = input[input.length - 1];

// //         if (lastChar === '(') parenthesis++;
// //         if (lastChar === ')' && parenthesis > 0) parenthesis--;

// //         const updatedInput = checkOperator(input);
// //         updateDecimalNumber(updatedInput);
// //         return updatedInput;
// //     };

// //     return {
// //         processInput,
// //         checkForDecimal: () => isDecimalNumber,
// //         checkForParenthesis: () => parenthesis > 0,
// //         resetParenthesis
// //     };
// // })();

// import { isValidPlacement } from "./math";
// import { evaluateExpression } from "./math";
// import { calculateFactorial } from "./math";
// import { calculateMathOperation } from "./math";
// import { calculateTrigonometric } from "./math";

// // Input Handler
// export function handleInput(value) {

//     document.addEventListener('DOMContentLoaded', () => {
//         const display = document.querySelector(".display")


//         let currentInput = '';
//         let lastOperation = '';
//         let operatorUsed = false;
//         let calculationHistory = [];

//         if (value === 'C') {
//             currentInput = '';
//             display.value = '0';
//             operatorUsed = false;
//         }
//         else if (value === '⌫') {
//             currentInput = currentInput.slice(0, -1);
//             display.value = currentInput || '0';
//             operatorUsed = false;
//         }
//         else if (value === '=') {

//             if (/^\d+(\.\d+)?$/.test(currentInput)) {

//                 alert('Invalid expression! You must enter an operator.');
//                 return;
//             }
//             try {
//                 currentInput = evaluateExpression(currentInput);
//                 display.value = currentInput;
//                 operatorUsed = true;
//             } catch (error) {
//                 display.value = 'Error';
//                 currentInput = '';
//                 operatorUsed = false;
//             }
//         }
//         else if (value === 'π') {
//             if (isValidPlacement(currentInput, 'π')) {
//                 currentInput += 'π';
//                 display.value = currentInput;
//             } else {
//                 alert('Invalid (Add operator first)');
//             }
//         }
//         else if (value === 'e') {
//             if (isValidPlacement(currentInput, 'e')) {
//                 currentInput += 'e';
//                 display.value = currentInput;
//             } else {
//                 alert('Invalid (Add operator first)');
//             }
//         }
//         else if (value === 'n!') {
//             if (currentInput === '') {
//                 alert('Please enter a number first.');
//             } else {
//                 const result = calculateFactorial(currentInput);
//                 addToHistory(currentInput, result);
//                 currentInput = result;
//                 display.value = currentInput;
//             }
//         }
//         else if (value === 'x2') {
//             if (currentInput === '') {
//                 alert('Please enter a number first.');
//             } else {
//                 calculateMathOperation(currentInput, 'square');
//             }
//         }
//         else if (value === '√x') {
//             if (currentInput === '') {
//                 alert('Please enter a number first.');
//             } else {
//                 calculateMathOperation(currentInput, 'squareroot');
//             }
//         }
//         else if (value === '10x') {
//             if (currentInput === '') {
//                 alert('Please enter a number first.');
//             } else {
//                 calculateMathOperation(currentInput, 'powOfTen');
//             }
//         }
//         else if (value === 'log') {
//             if (currentInput === '') {
//                 alert('Please enter a number first.');
//             } else {
//                 calculateMathOperation(currentInput, 'log');
//             }
//         }
//         else if (value === 'ln') {
//             if (currentInput === '') {
//                 alert('Please enter a number first.');
//             } else {
//                 calculateMathOperation(currentInput, 'ln');
//             }
//         }
//         else if (value === 'exp') {
//             if (currentInput === '') {
//                 alert('Please enter a number first.');
//             } else {
//                 calculateMathOperation(currentInput, 'exp');
//             }
//         }
//         else if (value === 'Sin') {
//             calculateTrigonometric(currentInput, Math.sin);
//         }
//         else if (value === 'Cos') {
//             calculateTrigonometric(currentInput, Math.cos);
//         }
//         else if (value === 'Tan') {
//             calculateTrigonometric(currentInput, Math.tan);
//         }

//         else if (value === '+/-') {
//             let currentNumber = parseFloat(currentInput);

//             if (!isNaN(currentNumber)) {
//                 currentInput = (currentNumber * -1).toString();
//                 display.value = currentInput;
//             } else {
//                 alert('Please enter a valid number first.');
//             }
//         }
//         else if (value === '.') {
//             // Allow decimal if there is no decimal already in the current operand
//             const lastOperand = currentInput.split(/[\+\-\*\/\%]/).pop();  // Get the last operand (after the last operator)

//             if (!lastOperand.includes('.')) {
//                 currentInput += '.';
//                 display.value = currentInput;
//             }
//         }
//         else if (/[0-9]/.test(value)) {
//             // Allow normal number input
//             currentInput += value;
//             display.value = currentInput;
//             operatorUsed = false;
//         }
//         else if (/[+-x÷modxy]/.test(value)) {
//             // Handle operator input
//             if (currentInput === '') {
//                 // Prevent input like '+', '-', '*', etc., without any number before it
//                 alert("Enter number first")
//                 return;
//             }

//             // Add operator if a number is present
//             currentInput += value;
//             display.value = currentInput;
//             operatorUsed = true;
//         }
//         else if (value === '(') {
//             // Allow '(' if last input is an operator, number, or empty
//             if (currentInput === '' || /[+\-*/%^]$/.test(currentInput) || /\d$/.test(currentInput)) {
//                 currentInput += '(';
//                 display.value = currentInput;
//             }
//         }
//         else if (value === ')') {
//             // Allow ')' if there's an unmatched '('
//             if (currentInput.match(/\(/g) && (currentInput.match(/\(/g).length > (currentInput.match(/\)/g) ? currentInput.match(/\)/g).length : 0))) {
//                 currentInput += ')';
//                 display.value = currentInput;
//             }
//         }
//     })
// }

class Calculator {
    constructor() {
        this.currentInput = '';
        this.operatorUsed = false;
        this.display = document.getElementById('display');  // Assuming you have a display element
    }

    clear() {
        this.currentInput = '';
        this.display.value = '0';
        this.operatorUsed = false;
    }

    backspace() {
        this.currentInput = this.currentInput.slice(0, -1);
        this.display.value = this.currentInput || '0';
        this.operatorUsed = false;
    }

    toggleSign() {
        let currentNumber = parseFloat(this.currentInput);
        if (!isNaN(currentNumber)) {
            this.currentInput = (currentNumber * -1).toString();
            this.display.value = this.currentInput;
        } else {
            alert('Please enter a valid number first.');
        }
    }

    addDecimal() {
        // Allow decimal if there is no decimal already in the current operand
        const lastOperand = this.currentInput.split(/[\+\-\*\/\%]/).pop();  // Get the last operand
        if (!lastOperand.includes('.')) {
            this.currentInput += '.';
            this.display.value = this.currentInput;
        }
    }

    handleInput(value) {
        switch(value) {
            case 'C':
                this.clear();
                break;
            case '⌫':
                this.backspace();
                break;
            case '=':
                this.evaluateExpression();
                break;
            case 'π':
            case 'e':
                this.addConstant(value);
                break;
            case 'n!':
                this.calculateFactorial();
                break;
            case 'x2':
                this.calculateMathOperation('square');
                break;
            case '√x':
                this.calculateMathOperation('squareroot');
                break;
            case '10x':
                this.calculateMathOperation('powOfTen');
                break;
            case 'log':
                this.calculateMathOperation('log');
                break;
            case 'ln':
                this.calculateMathOperation('ln');
                break;
            case 'exp':
                this.calculateMathOperation('exp');
                break;
            case 'Sin':
            case 'Cos':
            case 'Tan':
                this.calculateTrigonometric(value);
                break;
            case '+/-':
                this.toggleSign();
                break;
            case '.':
                this.addDecimal();
                break;
            default:
                if (/[0-9]/.test(value)) {
                    this.addNumber(value);
                } else if (/[+\-x÷modxy]/.test(value)) {
                    this.addOperator(value);
                } else if (value === '(') {
                    this.addParenthesis('(');
                } else if (value === ')') {
                    this.addParenthesis(')');
                }
        }
    }

    addNumber(value) {
        this.currentInput += value;
        this.display.value = this.currentInput;
        this.operatorUsed = false;
    }

    addOperator(value) {
        if (this.currentInput === '') {
            alert("Enter number first");
            return;
        }
        this.currentInput += value;
        this.display.value = this.currentInput;
        this.operatorUsed = true;
    }

    addParenthesis(value) {
        if (value === '(' && (this.currentInput === '' || /[+\-*/%^]$/.test(this.currentInput) || /\d$/.test(this.currentInput))) {
            this.currentInput += '(';
            this.display.value = this.currentInput;
        } else if (value === ')' && (this.currentInput.match(/\(/g)?.length > (this.currentInput.match(/\)/g)?.length || 0))) {
            this.currentInput += ')';
            this.display.value = this.currentInput;
        }
    }

    addConstant(value) {
        if (this.isValidPlacement(value)) {
            this.currentInput += (value === 'π' ? Math.PI : Math.E).toString();
            this.display.value = this.currentInput;
        } else {
            alert('Invalid (Add operator first)');
        }
    }

    isValidPlacement(value) {
        return !/[+\-*/%^]$/.test(this.currentInput) && this.currentInput !== '';
    }

    calculateFactorial() {
        if (this.currentInput === '') {
            alert('Please enter a number first.');
        } else {
            const result = this.factorial(parseInt(this.currentInput));
            this.currentInput = result.toString();
            this.display.value = this.currentInput;
        }
    }

    factorial(num) {
        if (num === 0 || num === 1) return 1;
        let result = 1;
        for (let i = 2; i <= num; i++) {
            result *= i;
        }
        return result;
    }

    calculateMathOperation(operation) {
        if (this.currentInput === '') {
            alert('Please enter a number first.');
            return;
        }
        const input = parseFloat(this.currentInput);
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
        }
        this.currentInput = result.toString();
        this.display.value = this.currentInput;
    }

    calculateTrigonometric(value) {
        if (this.currentInput === '') {
            alert('Please enter a number first.');
            return;
        }
        const angle = parseFloat(this.currentInput);
        const radians = this.degreesToRadians(angle);
        let result;
        switch (value) {
            case 'Sin':
                result = Math.sin(radians);
                break;
            case 'Cos':
                result = Math.cos(radians);
                break;
            case 'Tan':
                result = Math.tan(radians);
                break;
        }
        this.currentInput = result.toString();
        this.display.value = this.currentInput;
    }

    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    evaluateExpression() {
        try {
            if (/^\d+(\.\d+)?$/.test(this.currentInput)) {
                alert('Invalid expression! You must enter an operator.');
                return;
            }
            this.currentInput = eval(this.currentInput).toString();
            this.display.value = this.currentInput;
            this.operatorUsed = true;
        } catch (error) {
            this.display.value = 'Error';
            this.currentInput = '';
            this.operatorUsed = false;
        }
    }
}

// Create an instance of the calculator
const calculator = new Calculator();