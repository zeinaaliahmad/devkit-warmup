import type { Student, User } from "./types.js";
import { fetchJson } from "./api.js";

// 1. Create some students
const students: Student[] = [
  { id: 1, name: "Lina", major: "CS", grade: 14, city: "Beirut" },
  { id: 2, name: "Omar", major: "Math", grade: 17, city: "Tripoli" },
  { id: 3, name: "Maya", major: "CS", grade: 12, city: "Jounieh" },
  { id: 4, name: "Karim", major: "Physics", grade: 19, city: "Beirut" },
];

// 2. Generic groupBy function
function groupBy<T, K extends string>(
  items: T[],
  keyFn: (item: T) => K
): Record<K, T[]> {
  return items.reduce((groups, item) => {
    const key = keyFn(item);
    (groups[key] ??= []).push(item);
    return groups;
  }, {} as Record<K, T[]>);
}

console.log("Students grouped by major:");
console.log(groupBy(students, (student) => student.major));

// 3. Typed counter
function makeCounter(start = 0, step = 1) {
  let count = start;

  return {
    increment: () => (count += step),
    decrement: () => (count -= step),
    reset: () => (count = start),
    get value() {
      return count;
    },
  };
}

const counter = makeCounter(10, 2);
console.log(counter.increment());
console.log(counter.decrement());
console.log(counter.value);
counter.reset();
console.log(counter.value);

// 4. Fetch users using our generic API function
async function main() {
  const users = await fetchJson<User[]>(
    "https://jsonplaceholder.typicode.com/users"
  );

  console.table(
    users.map(({ id, name, email, address }) => ({
      id,
      name,
      email,
      city: address.city,
    }))
  );
}

main().catch(console.error);