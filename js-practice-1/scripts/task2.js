console.log("--- Task 2 ---");

const studentNames = ["Alice", "Bob", "Charlie", "David", "Eve"];

for (let studentName of studentNames) {
    console.log(studentName);
}

studentNames.push("Frank");

studentNames.unshift("Grace");

console.log(studentNames);

console.log("---");
