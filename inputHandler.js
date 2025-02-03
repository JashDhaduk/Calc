export const inputHandler = (() => {
    let isDecimalNumber = false;
    const operators = ['-', '+', '^', '*', '/', '%'];
    let parenthesis = 0;

    const resetParenthesis = () => (parenthesis = 0);

    const updateDecimalNumber = (input) => {
        if (input.length <= 0) {
            isDecimalNumber = false;
            return;
        }
        const lastChar = input[input.length - 1];
        isDecimalNumber = lastChar === '.' || (!operators.includes(lastChar) && isDecimalNumber);
    };

    const checkOperator = (input) => {
        if (input.length < 2) return input;
        const lastChar = input[input.length - 1];
        const prevChar = input[input.length - 2];

        if (operators.includes(lastChar) && operators.includes(prevChar)) {
            return input.slice(0, -1);
        }
        return input;
    };

    const processInput = (input) => {
        const lastChar = input[input.length - 1];

        if (lastChar === '(') parenthesis++;
        if (lastChar === ')' && parenthesis > 0) parenthesis--;

        const updatedInput = checkOperator(input);
        updateDecimalNumber(updatedInput);
        return updatedInput;
    };

    return {
        processInput,
        checkForDecimal: () => isDecimalNumber,
        checkForParenthesis: () => parenthesis > 0,
        resetParenthesis
    };
})();
