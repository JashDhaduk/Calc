export function evaluateExpression(expression) {
    try {
        // Check for mismatched parentheses
        if (inputHandler.checkForParenthesis()) {
            return "Mismatched parentheses";
        }

        // Continue with the existing expression replacement logic
        expression = expression
            .replace(/π/g, Math.PI)
            .replace(/e/g, Math.E)
            .replace(/×/g, '*')
            .replace(/÷/g, '/')
            .replace(/mod/g, '%')
            .replace(/²/g, '**2')
            .replace(/√/g, 'Math.sqrt(')
            .replace(/\^/g, '**')
            .replace(/10\*\*/g, '10**')
            .replace(/log\(/g, 'Math.log10(')
            .replace(/ln\(/g, 'Math.log(');

        // Handle factorial `n!`
        if (/(\d+)!/.test(expression)) {
            expression = expression.replace(/(\d+)!/g, (_, n) => calculateFactorial(n));
        }

        // Evaluate the expression safely
        const result = Function(`'use strict'; return (${expression})`)();
        
        // Check if the result is NaN
        if (isNaN(result)) {
            return "Invalid Expression";
        }

        // Return the result as a string, with proper formatting
        return Number.isInteger(result) ? result.toString() : result.toFixed(4).replace(/\.?0+$/, '');
    } catch (error) {
        return `Error: ${error.message}`;  // Provide more specific error message
    }
}

// Factorial calculation
function calculateFactorial(n) {
    let num = parseInt(n);
    if (num < 0 || !Number.isInteger(num)) return "Error";
    let factorial = 1;
    for (let i = 2; i <= num; i++) factorial *= i;
    return factorial.toString();
}
