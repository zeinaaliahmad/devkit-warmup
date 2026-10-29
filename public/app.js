
const usersContainer = document.getElementById("users");
const searchInput = document.getElementById("search");

let allUsers = [];

async function loadUsers() {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("Failed to load users");
    }

    allUsers = await response.json();
    displayUsers(allUsers);
  } catch (error) {
    usersContainer.textContent = "Could not load users. Please try again.";
    console.error(error);
  }
}

function displayUsers(users) {
  usersContainer.replaceChildren();

  users.forEach((user) => {
    const card = document.createElement("div");
    const name = document.createElement("h2");
    const email = document.createElement("p");
    const detailsButton = document.createElement("button");
    const details = document.createElement("p");

    name.textContent = user.name;
    email.textContent = user.email;
    detailsButton.textContent = "Show details";

    details.textContent =
      `${user.address.city} | ${user.company.name}`;
    details.hidden = true;

    detailsButton.addEventListener("click", () => {
      details.hidden = !details.hidden;
      detailsButton.textContent = details.hidden
        ? "Show details"
        : "Hide details";
    });

    card.append(name, email, detailsButton, details);
    usersContainer.append(card);
  });
}

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();

  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(query)
  );

  displayUsers(filteredUsers);
});

loadUsers();
