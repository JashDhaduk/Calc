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

    buttons.forEach((button) => {
        button.addEventListener("click", function () {
            const value = button.textContent.trim();
            handleInput(value);
        });
    });


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
        } else if (key === 'Backspace') {
            handleInput('⌫');
        } else if (key === 'Delete') {
            handleInput('C');
        } else if (key === '.') {
            handleInput('.');
        }
        else if (key === 'f') {
            handleInput('n!');
        } else if (key === 'p') {
            handleInput('π');
        } else if (key === 'e') {
            handleInput('e');
        }
    });

    function degreesToRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    function handleInput(value) {
        if (value === 'C') {
            currentInput = '';
            display.value = '0';
            operatorUsed = false;
        } else if (value === '⌫') {
            currentInput = currentInput.slice(0, -1);
            display.value = currentInput || '0';
            operatorUsed = false;
        } else if (value === '=') {

            if (/^\d+(\.\d+)?$/.test(currentInput)) {
                // If no operator is found, show an alert
                alert('Invalid expression! You must enter an operator.');
                return;  // Stop further processing
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
        } else if (value === 'π') {
            if (isValidPlacement(currentInput, 'π')) {
                currentInput += 'π';
                display.value = currentInput;
            } else {
                alert('Invalid (Add operator first)');
            }   
        } else if (value === 'e') {
            if (isValidPlacement(currentInput, 'e')) {
                currentInput += 'e';
                display.value = currentInput;
            } else {
                alert('Invalid (Add operator first)');
            }   
        } else if (value === 'n!'){
            if(currentInput === ''){
                alert('Please enter a number first.');  
            } else{
                const result = calculateFactorial(currentInput);
                addToHistory(currentInput, result);
                currentInput = result;  // Update the input with the result
                display.value = currentInput; 
            }
        } 
        else if (value === 'x2'){
            if(currentInput === ''){
                alert('Please enter a number first.');  
            } else{
                const result = calculateSquare(currentInput);
                addToHistory(currentInput, result);
                currentInput = result;  // Update the input with the result
                display.value = currentInput; 
            }
        } 
        else if (value === '√x'){
            if(currentInput === ''){
                alert('Please enter a number first.');  
            } else{
                const result = calculateSquareroot(currentInput);
                addToHistory(currentInput, result);
                currentInput = result;  // Update the input with the result
                display.value = currentInput; 
            }
        } 
        else if (value === '10x'){
            if(currentInput === ''){
                alert('Please enter a number first.');  
            } else{
                const result = powOfTen(currentInput);
                addToHistory(currentInput, result);
                currentInput = result;  // Update the input with the result
                display.value = currentInput; 
            }
        }
        else if (value === 'log'){
            if(currentInput === ''){
                alert('Please enter a number first.');  
            } else{
                const result = log(currentInput);
                addToHistory(currentInput, result);
                currentInput = result;  // Update the input with the result
                display.value = currentInput; 
            }
        } 
        else if (value === 'ln'){
            if(currentInput === ''){
                alert('Please enter a number first.');  
            } else{
                const result = ln(currentInput);
                addToHistory(currentInput, result);
                currentInput = result;  // Update the input with the result 
                display.value = currentInput; 
            }
        } 
        else if (value === 'exp'){
            if(currentInput === ''){
                alert('Please enter a number first.');  
            } else{
                const result = exponential(currentInput);
                addToHistory(currentInput, result);
                currentInput = result;  // Update the input with the result 
                display.value = currentInput; 
            }
        } 
        else if (value === 'Sin') {
            let angle = parseFloat(currentInput);
            if (isNaN(angle)) {
                alert('Please enter a number first.');  
            } else {
                const radians = degreesToRadians(angle);  // Convert angle to radians
                const exp = angle
                currentInput = Math.sin(radians).toString(); // Corrected: use Math.sin instead of sin
                addToHistory(exp, currentInput);
                display.value = currentInput;  // Update the display with the result
            }
        }
        else if (value === 'Cos') {
            let angle = parseFloat(currentInput);
            if (isNaN(angle)) {
                alert('Please enter a number first.');  
            } else {
                const radians = degreesToRadians(angle);  // Convert angle to radians
                const exp = angle
                currentInput = Math.cos(radians).toString(); // Corrected: use Math.sin instead of sin
                addToHistory(exp, currentInput);
                display.value = currentInput;  // Update the display with the result
            }
        }
        else if (value === 'Tan') {
            let angle = parseFloat(currentInput);
            if (isNaN(angle)) {
                alert('Please enter a number first.');  
            } else {
                const radians = degreesToRadians(angle);  // Convert angle to radians
                const exp = angle
                currentInput = Math.tan(radians).toString(); // Corrected: use Math.sin instead of sin
                addToHistory(exp, currentInput);
                display.value = currentInput;  // Update the display with the result
            }
        }
        else if (value === '+/-') {
            let currentNumber = parseFloat(currentInput);
        
            if (!isNaN(currentNumber)) {
                currentInput = (currentNumber * -1).toString();  // Toggle the sign
                display.value = currentInput;  // Update the display with result
            } else {
                alert('Please enter a valid number first.');
            }
        }
        else if (value === '.') {
            if (!currentInput.includes('.')) {
                currentInput += '.';    
                display.value = currentInput;
            }
        } else if (value === '') {
            if (isValidPlacement(currentInput, 'e')) {
                currentInput += 'e';
                display.value = currentInput;
            } else {
                alert('Invalid (Add operator first)');
            }   
        } else {
            if (operatorUsed && !['+', '-', '*', '/', '%'].includes(value)) {
                currentInput = '';
            }
            currentInput += value;
            display.value = currentInput;
            operatorUsed = false;
        }
    }

    function isValidPlacement(input, char) {
        // Check if 'π' is placed after an operator or at the start
        const validOperators = ['+', '-', '*', '/'];
        
        // If it's the first character or after an operator, it's valid
        if (input === '' || validOperators.includes(input[input.length - 1])) {
            return true;
        }
    
        // Check if 'π' comes after a number or another symbol (invalid)
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

        try {
            const result = Function('return ' + expression)();
            addToHistory(currentInput, result);
            return result.toString();
        } catch (error) {
            throw new Error("Invalid Expression");
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

    function calculateSquare (input) {
        return input * input;   
    }

    function calculateSquareroot (input){
        return Math.sqrt(input)
    }

    function powOfTen(input){
        return Math.pow(10,input)
    }

    function log(input){
        return Math.log10(input)
    }

    function ln(input){
        return Math.log(input)
    }

    function exponential(input){
        return Math.exp(input)
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
                    <div>${entry.expression}</div>
                    <div>= ${entry.result}</div>
                </div>
            `)
            .join('');
    }
});



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