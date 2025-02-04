// export function evaluateExpression(expression) {
//     try {
//         // Check for mismatched parentheses
//         if (inputHandler.checkForParenthesis()) {
//             return "Mismatched parentheses";
//         }

//         // Continue with the existing expression replacement logic
//         expression = expression
//             .replace(/π/g, Math.PI)
//             .replace(/e/g, Math.E)
//             .replace(/×/g, '*')
//             .replace(/÷/g, '/')
//             .replace(/mod/g, '%')
//             .replace(/²/g, '**2')
//             .replace(/√/g, 'Math.sqrt(')
//             .replace(/\^/g, '**')
//             .replace(/10\*\*/g, '10**')
//             .replace(/log\(/g, 'Math.log10(')
//             .replace(/ln\(/g, 'Math.log(');

//         // Handle factorial `n!`
//         if (/(\d+)!/.test(expression)) {
//             expression = expression.replace(/(\d+)!/g, (_, n) => calculateFactorial(n));
//         }

//         // Evaluate the expression safely
//         const result = Function(`'use strict'; return (${expression})`)();
        
//         // Check if the result is NaN
//         if (isNaN(result)) {
//             return "Invalid Expression";
//         }

//         // Return the result as a string, with proper formatting
//         return Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '');
//     } catch (error) {
//         return `Error: ${error.message}`;  // Provide more specific error message
//     }
// }

// // Factorial calculation
// function calculateFactorial(n) {
//     let num = parseInt(n);
//     if (num < 0 || !Number.isInteger(num)) return "Error";
//     let factorial = 1;
//     for (let i = 2; i <= num; i++) factorial *= i;
//     return factorial.toString();
// }

import { handleInput } from "./inputHandler";


document.addEventListener("DOMContentLoaded", function () {
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
})
