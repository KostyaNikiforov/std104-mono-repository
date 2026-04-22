console.log("--- Task 4 ---");

function checkNumberType(num) {
    if (num > 0) {
        return "Positive";
    } else if (num < 0) {
        return "Negative";
    } else {
        return "Zero";
    }
}

let number = 10;
console.log(number + " is " + checkNumberType(number));
number = -5;
console.log(number + " is " + checkNumberType(number));
number = 0;
console.log(number + " is "  +checkNumberType(number));

console.log("---");
