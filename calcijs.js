const display = document.getElementById('display');
const buttons = document.querySelectorAll('button');
let currentInput = '';
let operator = '';
let firstOperand = '';
let fullExpression = '';

function clearDisplay() {
    currentInput = '';
    operator = '';
    firstOperand = '';
    fullExpression = '';
    display.value = '';
}

function appendToDisplay(value) {
    currentInput += value;
    fullExpression += value;
    display.value = fullExpression;
}

function handleNumberClick(value) {
    appendToDisplay(value);
}

function handleOperatorClick(value) {
    if (currentInput === '') return;
    if (firstOperand === '') {
        firstOperand = currentInput;
        operator = value;
        fullExpression += value;
        display.value = fullExpression;
        currentInput = '';
    } else {
        handleEqualsClick();
        operator = value;
        fullExpression += value;
        display.value = fullExpression;
    }
}

function handleEqualsClick() {
    if (operator === '' || firstOperand === '' || currentInput === '') return;

    const num1 = parseFloat(firstOperand);
    const num2 = parseFloat(currentInput);

    switch (operator) {
        case '+':
            currentInput = (num1 + num2).toString();
            break;
        case '-':
            currentInput = (num1 - num2).toString();
            break;
        case '*':
            currentInput = (num1 * num2).toString();
            break;
        case '/':
            if (num2 !== 0) {
                currentInput = (num1 / num2).toString();
            } else {
                currentInput = 'Error';
            }
            break;
        default:
            return;
    }

    fullExpression += '=' + currentInput;
    display.value = fullExpression;
    firstOperand = '';
    operator = '';
    currentInput = '';
}

buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const value = e.target.textContent;
        if (!isNaN(value) || value === '.') {
            handleNumberClick(value);
        } else if (value === 'C') {
            clearDisplay();
        } else if (['+', '-', '*', '/'].includes(value)) {
            handleOperatorClick(value);
        } else if (value === '=') {
            handleEqualsClick();
        }
    });
});
