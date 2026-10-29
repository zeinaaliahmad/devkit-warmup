
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
      users.map(({ id, name, email, company }) => ({
        id,
        name,
        email,
        company: company.name,
      }))
    );
  } catch (error) {
    if (error.name === "AbortError") {
      console.log("Request timed out!");
    } else {
      console.log("Error:", error.message);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

await fetchUsers();
