import { evaluateExpression } from './calculator.js';
import { inputHandler } from './inputHandler.js';
import { addToHistory, updateHistoryDisplay } from './history.js';

export function setupUI() {
    const display = document.querySelector(".display");
    const buttons = document.querySelectorAll(".btn");
    const historyPanel = document.querySelector('.history-panel');
    const historyContent = document.querySelector('.history-content');
    const factorialButton = document.querySelector('.factorial');   

    let currentInput = '';
    let operatorUsed = false;

    function updateDisplay(value) {
        display.value = value.length > 15 ? "Overflow" : value || "0";
    }

    function handleInput(value) {
        if (value === 'C') {
            currentInput = '';
            inputHandler.resetParenthesis();
            updateDisplay('0');
            return;
        }
        if (value === '⌫' || value === 'Backspace') {
            currentInput = currentInput.slice(0, -1);
            updateDisplay(currentInput || '0');
            return;
        }
        if (value === '=' || value === 'Enter') {
            let result = evaluateExpression(currentInput);
            addToHistory(currentInput, result);
            updateDisplay(result);
            currentInput = result;
            inputHandler.resetParenthesis();
            return;
        }

        // Disable factorial if no number is entered
        if (currentInput.match(/\d$/)) {
            factorialButton.disabled = false; // Enable the factorial button if input ends with a number
        } else {
            factorialButton.disabled = true; // Disable the factorial button if not
        }

        currentInput += value;
        updateDisplay(currentInput);
    }

    // Handle button clicks
    buttons.forEach(button => {
        button.addEventListener("click", () => handleInput(button.textContent.trim()));
    });

    // Handle keyboard input
    document.addEventListener("keydown", (event) => {
        event.preventDefault(); // Ensure keys don't trigger unwanted browser behavior
    
        const keyMap = {
            "Enter": "=",
            "Backspace": "⌫",
            "Delete": "C",
            ".": ".",
            "p": "π",
            "e": "e",
            "*": "×",
            "/": "÷",
            "+": "+",
            "-": "-",
            "=": "="
        };
    
        if (keyMap[event.key]) {
            handleInput(keyMap[event.key]);
        } else if (event.key >= '0' && event.key <= '9') {
            handleInput(event.key);
        } else if (['+', '-', '*', '/', '%', '^'].includes(event.key)) {
            handleInput(event.key);
        }else if (event.key === 'Enter') {  // If Enter is pressed, handle it
            handleInput('=');  // Treat Enter as "="
        }
    });
    

    // Show/Hide history panel
    document.querySelector('.history-button').addEventListener('click', () => {
        historyPanel.classList.add('active');
    });

    document.querySelector('.close-history').addEventListener('click', () => {
        historyPanel.classList.remove('active');
    });

    updateHistoryDisplay(historyContent);
}
