console.log("Task 1");

console.log("Call area function before all declaratioons: ");

console.log("Calculate area of a circle with radius 5: ", getCalculation("area")('circle', 5));
console.log("Calculate area of a square with side 4: ", getCalculation("area")('square', 4));

console.log("---");

console.log('"calculateArea" before the declaration = ' + typeof calculateArea); // function

function calculateArea(shape, value) {
    if (shape === 'circle') {
        return Math.PI * value * value;
    } else if (shape === 'square') {
        return value * value;
    } else {
        return -1;
    }
}

console.log('"calculateArea" after the declaration = ' + typeof calculateArea); // function

console.log("---");

try {
    console.log('"calculatePerimeter" before the declaration = ' + typeof calculatePerimeter); // undefined
} catch (error) {
    console.log("Error: " + error.message);
}

const calculatePerimeter = (shape, value) => {
    if (shape === 'circle') {
        return 2 * Math.PI * value;
    } else if (shape === 'square') {
        return 4 * value;
    } else {
        return -1;
    }
}

console.log('"calculatePerimeter" after the declaration = ' + typeof calculatePerimeter); // function

console.log("---");

console.log("Call perimeter function before all declaratioons: ");

console.log("Calculate perimeter of a circle with radius 5: ", getCalculation("perimeter")('circle', 5));
console.log("Calculate perimeter of a square with side 4: ", getCalculation("perimeter")('square', 4));

console.log("---");

function getCalculation(type) {
    if (type === 'area') {
        return calculateArea;
    } else if (type === 'perimeter') {
        return calculatePerimeter;
    } else {
        return null;
    }
}
