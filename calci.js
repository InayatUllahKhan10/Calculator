document.addEventListener('DOMContentLoaded', () => {
    const input = document.querySelector('.input');
    const buttons = document.querySelectorAll('.button');

    let currentInput = '';
    let operator = '';
    let operand1 = '';
    let expression = ''; // Variable to track the full expression for display

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const value = button.textContent;

            if (value === 'AC') {
                // Reset everything when 'AC' is pressed
                currentInput = '';
                operator = '';
                operand1 = '';
                expression = ''; // Clear the expression as well
                input.value = '';
            } else if (value === '=') {
                // Handle the calculation when '=' is pressed
                if (currentInput) {
                    const operand2 = currentInput;
                    if (operand1 && operator && operand2) {
                        const result = calculate(parseFloat(operand1), operator, parseFloat(operand2));
                        input.value = expression + ` ${operand2} = ${result}`; // Show the full equation
                        currentInput = result;
                        operand1 = result;
                        operator = '';
                        expression = ''; // Reset the expression
                    }
                }
            } else if (['+', '-', '*', '/'].includes(value)) {
                // Handle operator button click
                if (currentInput === '') {
                    // If operator is pressed without any input, do nothing
                    return;
                }
                if (operand1 === '') {
                    operand1 = currentInput;
                } else if (operator) {
                    operand1 = calculate(parseFloat(operand1), operator, parseFloat(currentInput));
                    input.value = operand1;
                }
                operator = value;
                expression = operand1 + ' ' + operator; // Add operator to expression
                input.value = expression; // Update display with expression so far
                currentInput = ''; // Reset current input for second operand
            } else {
                // Handle number or decimal input
                currentInput += value;
                input.value = expression + ' ' + currentInput; // Display full expression with new input
            }
        });
    });

    function calculate(operand1, operator, operand2) {
        switch (operator) {
            case '+':
                return operand1 + operand2;
            case '-':
                return operand1 - operand2;
            case '*':
                return operand1 * operand2;
            case '/':
                return operand1 / operand2;
            default:
                return 0;
        }
    }
});
