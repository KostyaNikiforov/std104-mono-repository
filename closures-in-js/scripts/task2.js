console.log("Task 2");


function createCounter(start = 0) {
    var count = start;
    return () => { 
        count++;
        return count;
    }
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log("Counter 1: ", counter1()); // 1
console.log("Counter 1: ", counter1()); // 2
console.log("Counter 2: ", counter2()); // 1
console.log("Counter 1: ", counter1()); // 3
console.log("Counter 2: ", counter2()); // 2
