const buttons = Array.from(document.querySelectorAll(".button"));
const displayMain = document.querySelector("#display-main");
const displayExtra = document.querySelector("#display-extra");

let currentValue = "0";
let storedValue = "";
let displayValue = "";
let operator = "";

buttons.forEach(function(button) {
    button.addEventListener("click", buttonPressed);
});

window.addEventListener("keydown", keyPressed);

function keyPressed(e) {
    if (document.querySelector(`.button[data-key="${e.keyCode}"]`)) {
        buttonPressed(document.querySelector(`.button[data-key="${e.keyCode}"]`));
    } else {
        console.log(`invalid keyCode ${e.keyCode}`);
    }
}

function buttonPressed(e) {
    let data;
    if (e.dataset) {
        data = e.dataset;
    } else if (e.target.dataset) {
        data = e.target.dataset;
    }

    if (data.number) {
        if (currentValue == "0") currentValue = "";
        currentValue += data.number;
    }

    if (data.operator) {
        if (operator) currentValue = calculate(storedValue, currentValue, operator);
        storedValue = currentValue;
        displayValue = currentValue;
        operator = data.operator;
        currentValue = "0";
    }

    if (data.action) {
        switch(data.action) {
            case "period": 
                if (!currentValue.includes('.')) currentValue += ".";
                break;

            case "negate": 
                currentValue = (parseFloat(currentValue)*-1).toString();
                break;

            case "enter": 
                displayValue = `${storedValue} ${operator} ${currentValue} = `;
                currentValue = calculate(storedValue, currentValue, operator);
                operator = "";
                storedValue = "";
                break;

            case "delete": 
                currentValue = currentValue.slice(0, -1);
                if (currentValue == "" || currentValue == "-") currentValue = "0";
                break;

            case "clear": 
                currentValue = "0";
                storedValue = "";
                displayValue = "";
                operator = "";
                break;
        }
    }

    if (!isFinite(currentValue)) currentValue = "NOPE";
    if (!isFinite(storedValue)) storedValue = "NOPE";
    displayMain.textContent = currentValue;
    displayExtra.textContent = displayValue + " " + operator;
}

function calculate(x, y, op) {
    x = parseFloat(x);
    y = parseFloat(y);
    let z = 0;

    switch(op) {
        case "+":
            z = x + y;
            break;
        case "-":
            z = x - y;
            break;
        case "*":
            z = x * y;
            break;
        case "/":
            z = x / y;
            break;
        default:
            z = y;
    }
    return (Math.round(z*1000)/1000).toString();
}