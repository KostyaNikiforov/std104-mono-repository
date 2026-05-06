console.log("Task 3");

function greetUser(name = "Guest") {
    console.log(`Hello, ${name}!`);
}

console.log("Greet user without name: ");
greetUser(); // Hello, Guest!

const user1 = {
    name: "Alice",
    sayHi: function () {
        console.log(`Hello from, ${this.name}!`);
    }
}

console.log(`Greet user with ${user1.name}: `);

user1.sayHi(); // Alice

const user2 = {
    name: "Bob",
    sayHi: () => {
        console.log(`Hello from, ${this.name}!`);
    }
}

console.log(`Greet user with ${user2.name}: `);

user2.sayHi(); // undefined

console.log('---');

for (var i = 1; i <= 3; i++) {
    setTimeout(() => {
        console.log(`Value of i: ${i}`);
    }, 1000);
}

for (let j = 1; j <= 3; j++) {
    setTimeout(() => {
        console.log(`Value of j: ${j}`);
    }, 1000);
}