import { handleInput } from "./inputHandler.js";
import "./theme.js"
import "./history.js"

document.addEventListener('DOMContentLoaded', function () {
    const buttons = document.querySelectorAll('.btn');

    // Mouse click input
    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            let value = button.textContent.trim();
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