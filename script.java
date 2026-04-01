function getValues() {
    let n1 = parseFloat(document.getElementById("num1").value) || 0;
    let n2 = parseFloat(document.getElementById("num2").value) || 0;
    return [n1, n2];
}

function add() {
    let [n1, n2] = getValues();
    let result = n1 + n2;
    document.getElementById("result").innerText = "Result = " + result;
}

function subtract() {
    let [n1, n2] = getValues();
    let result = n1 - n2;
    document.getElementById("result").innerText = "Result = " + result;
}
