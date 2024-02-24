
let expression = '';

function addToExpression(value) {
    expression += value;
    document.getElementById('box2').textContent = expression;
}

function clearInput() {
    expression = '';
    document.getElementById('box2').textContent = '';
}

function backspace() {
    expression = expression.slice(0, -1);
    document.getElementById('box2').textContent = expression;
}

function evaluateExpression() {
    const result = calculate(expression);
    document.getElementById('box2').textContent = result;
}

function calculate(expression) {
    // Remove whitespace from the expression 
    expression = expression.replace(/\s/g,'');
    // in our code we don't have logic to make sapaces so this line can be removed

    // Tokenize the expression
    const tokens = expression.match(/\d+|\+|\-|\*|\/|\(|\)/g);

    // Define operator precedence
    const precedence = {
        '+': 1,
        '-': 1,
        '*': 2,
        '/': 2
    };

    const stack = [];
    const output = [];

    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];

        if (!isNaN(parseFloat(token))) {
            // Token is a number
            output.push(parseFloat(token));
        } else if (token === '(') {
            // Token is an opening parenthesis
            stack.push(token);
        } else if (token === ')') {
            // Token is a closing parenthesis
            while (stack.length && stack[stack.length - 1] !== '(') {
                output.push(stack.pop());
            }
            stack.pop(); // Discard the opening parenthesis
        } else {
            // Token is an operator
            while (
                stack.length &&
                precedence[token] <= precedence[stack[stack.length - 1]]
            ) {
                output.push(stack.pop());
            }
            stack.push(token);
        }
    }

    // Push remaining operators from the stack to the output
    while (stack.length) {
        output.push(stack.pop());
    }

    // Evaluate the expression using the output stack
    const resultStack = [];
    for (let i = 0; i < output.length; i++) {
        const token = output[i];

        if (!isNaN(parseFloat(token))) {
            // Token is a number
            resultStack.push(token);
        } else {
            // Token is an operator
            const b = resultStack.pop();
            const a = resultStack.pop();
            let result;

            switch (token) {
                case '+':
                    result = a + b;
                    break;
                case '-':
                    result = a - b;
                    break;
                case '*':
                    result = a * b;
                    break;
                case '/':
                    result = a / b;
                    break;
            }

            resultStack.push(result);
        }
    }

    // The final result is the only item left on the stack
    return resultStack[0];
}