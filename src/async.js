
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function runJob(name, duration) {
  const start = performance.now();
  await sleep(duration);
  const elapsed = performance.now() - start;
  console.log(`${name} finished in ${elapsed.toFixed(0)} ms`);
}

async function compareExecution() {
  console.log("=== Sequential execution ===");
  let start = performance.now();

  await runJob("Job 1", 300);
  await runJob("Job 2", 200);
  await runJob("Job 3", 100);

  console.log(
    `Sequential total: ${(performance.now() - start).toFixed(0)} ms\n`
  );

  console.log("=== Parallel execution ===");
  start = performance.now();

  await Promise.all([
    runJob("Job 1", 300),
    runJob("Job 2", 200),
    runJob("Job 3", 100),
  ]);

  console.log(
    `Parallel total: ${(performance.now() - start).toFixed(0)} ms\n`
  );
}

async function fetchUsers() {
  const controller = new AbortController();

  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 5000);

  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users",
      { signal: controller.signal }
    );

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }

    const users = await response.json();

    console.table(
      users.map(({ id, name, email, address }) => ({
        id,
        name,
        email,
        city: address.city,
      }))
    );
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.log("Request timed out!");
    } else if (error instanceof Error) {
      console.log("Error:", error.message);
    } else {
      console.log("An unknown error occurred.");
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

await compareExecution();
await fetchUsers();
