import { setCurrentInput, getCurrentInput } from "./inputHandler.js";
import { addToHistory } from "./history.js";

const display = document.querySelector('.display');

class Calculator {

    // Evaluate Expression
    evaluateExpression(expression) {
        expression = expression.replace(/π/g, Math.PI);
        expression = expression.replace(/e/g, Math.E);
        expression = expression.replace(/x/g, '*');
        expression = expression.replace(/÷/g, '/');
        expression = expression.replace(/mod/g, '%');
        expression = expression.replace(/xy/g, '^');

        try {
            const result = Function('return ' + expression)();
            addToHistory(getCurrentInput(), result);
            return result.toString();
        }
        catch (error) {
            throw new Error("Invalid Expression");
        }
    }

    // Check if the placement of the operator is valid
    isValidPlacement(input, char) {
        const validOperators = ['+', '-', '*', '/', '%'];
        if (input === '' || validOperators.includes(input[input.length - 1])) {
            return true;
        }
        if (/\d|\)/.test(input[input.length - 1])) {
            return false;
        }
        return true;
    }

    // Calculate Factorial
    calculateFactorial(input) {
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

    // Convert degrees to radians
    degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    // Calculate Trigonometric values
    calculateTrigonometric(value, func) {
        let angle = parseFloat(value);
        if (isNaN(angle)) {
            alert('Please enter an angle in degrees first.');
        } else {
            const radians = this.degreesToRadians(angle);
            console.log(radians);
            setCurrentInput(func(radians).toString());
            addToHistory(angle, getCurrentInput());
            display.value = getCurrentInput();
        }
    }

    calculatePower(base, exponent) {
        const baseNum = parseFloat(base);
        const exponentNum = parseFloat(exponent);

        if (isNaN(baseNum) || isNaN(exponentNum)) {
            alert('Invalid input for x^y. Please enter valid numbers for both x and y.');
            return;
        }

        const result = Math.pow(baseNum, exponentNum);
        return result.toString();
    }

    // Perform various math operations
    calculateMathOperation(value, operation) {
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

        setCurrentInput(result.toString());
        addToHistory(value, getCurrentInput());
        display.value = getCurrentInput();
    }
}

export default Calculator;