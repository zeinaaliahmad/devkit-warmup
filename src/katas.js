const students = [
  { id: 1, name: "Lina", grade: 14 },
  { id: 2, name: "Omar", grade: 17 },
  { id: 3, name: "Maya", grade: 12 },
  { id: 4, name: "Karim", grade: 19 },
  { id: 5, name: "Nour", grade: 16 },
];

console.log(students);

// Destructuring: extract values from an object
const { name, grade } = students[0];

console.log(name);
console.log(grade);

// Rest operator: collect the remaining properties
const { id, ...otherInfo } = students[0];

console.log(otherInfo);

// Create a new array with renamed properties
const renamedStudents = students.map(({ id, name, grade }) => ({
  studentId: id,
  fullName: name,
  grade: grade,
}));

console.log(renamedStudents);

// Increase every student's grade by 2
const curvedStudents = students.map((student) => ({
  ...student,
  grade: student.grade + 2,
}));

console.log("Original grades:", students);
console.log("Updated grades:", curvedStudents);

// Find students who passed (grade >= 14)
// Then extract only their names
const passedStudents = students
  .filter((student) => student.grade >= 14)
  .map((student) => student.name);

console.log("Students who passed:", passedStudents);

// Calculate the sum of all grades
const total = students.reduce(
  (sum, student) => sum + student.grade,
  0
);

// Calculate the average
const average = total / students.length;

console.log("Total grades:", total);
console.log("Class average:", average);

// Sort students by grade, from highest to lowest
const sortedStudents = students.toSorted(
  (a, b) => b.grade - a.grade
);

console.log("Sorted students:", sortedStudents);
console.log("Original students:", students);

// Find the last student with a grade of at least 15
const lastHighScorer = students.findLast(
  (student) => student.grade >= 15
);

console.log("Last high scorer:", lastHighScorer);

const groupedStudents = students.reduce(
  (groups, student) => {
    if (student.grade >= 10) {
      groups.passed.push(student.name);
    } else {
      groups.failed.push(student.name);
    }

    return groups;
  },
  { passed: [], failed: [] }
);

console.log("Grouped students:", groupedStudents);

function makeCounter() {
  let count = 0;

  return function () {
    count++;
    return count;
  };
}

const counter = makeCounter();

console.log(counter()); // 1
console.log(counter()); // 2
console.log(counter()); // 3

class Wallet {
  static count = 0;
  #balance = 0;

  constructor() {
    Wallet.count++;
  }

  deposit(amount) {
    this.#balance += amount;
    return this; // Allows chaining
  }

  getBalance() {
    return this.#balance;
  }
}

const wallet1 = new Wallet();
wallet1.deposit(50).deposit(25);

const wallet2 = new Wallet();
wallet2.deposit(100);

console.log("Wallet 1 balance:", wallet1.getBalance());
console.log("Wallet 2 balance:", wallet2.getBalance());
console.log("Wallets created:", Wallet.count);