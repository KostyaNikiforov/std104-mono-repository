console.log("--- Task 3 ---");

const hobby = {
    name: "Climbing",
    isIndoor: true,
    weeklyHours: 6,
    tools: ["Climbing shoes", "Harness", "Climbing magnesium"],
    getHobbySummary() {
        return `Name: ${this.name}, Indoor: ${this.isIndoor}, Weekly Hours: ${this.weeklyHours}, Tools: ${this.tools.join(", ")}`;
    }
};

console.log(`"I enjoy ${hobby.name}. It's an ${hobby.isIndoor ? "indoor" : "outdoor"} hobby. I spend about ${hobby.weeklyHours} hours per week using tools like: ${hobby.tools.join(", ") }."`);
console.log(hobby.getHobbySummary());

console.log("---");
