console.log("--- Task 5 ---");

class Hobby {
    constructor(name, isIndoor, weeklyHours, tools) {
        this.name = name;
        this.isIndoor = isIndoor;
        this.weeklyHours = weeklyHours;
    }

    describe() {
        return `My hobby is ${this.name}. It's an ${this.isIndoor ? "indoor" : "outdoor"} activity, and I spend ${this.weeklyHours} hours a week on it.`;
    }
}

const climbing = new Hobby("Climbing", true, 6);
const painting = new Hobby("Painting", false, 4);

console.log(climbing.describe());
console.log(painting.describe());

console.log("---");
