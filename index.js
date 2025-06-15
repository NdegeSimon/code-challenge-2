// Load existing guests on page load
document.addEventListener("DOMContentLoaded", loadGuestsFromStorage);

function addGuest() {
  const input = document.getElementById("guestName");
  const name = input.value.trim();
  if (!name) return;

  const guest = {
    name,
    attending: false
  };

  saveGuestToStorage(guest);
  renderGuest(guest);
  input.value = "";
}

function renderGuest(guest) {
  const li = document.createElement("li");

  const nameSpan = document.createElement("span");
  nameSpan.className = "guest-name";
  nameSpan.textContent = guest.name;

  const buttonGroup = document.createElement("div");
  buttonGroup.className = "button-group";

  const rsvpBtn = document.createElement("button");
  rsvpBtn.className = "btn rsvp-button";
  rsvpBtn.textContent = guest.attending ? "✔ Attending" : "Attending";
  if (guest.attending) rsvpBtn.classList.add("attending");

  rsvpBtn.onclick = () => {
    rsvpBtn.classList.toggle("attending");
    const isAttending = rsvpBtn.classList.contains("attending");
    rsvpBtn.textContent = isAttending ? "✔ Attending" : "Attending";
    updateGuestStatus(guest.name, isAttending);
  };

  const deleteBtn = document.createElement("button");
  deleteBtn.className = "btn delete-button";
  deleteBtn.textContent = "Remove";
  deleteBtn.onclick = () => {
    li.remove();
    deleteGuestFromStorage(guest.name);
  };

  buttonGroup.appendChild(rsvpBtn);
  buttonGroup.appendChild(deleteBtn);

  li.appendChild(nameSpan);
  li.appendChild(buttonGroup);

  document.getElementById("guestList").appendChild(li);
}

function saveGuestToStorage(guest) {
  const guests = getGuestsFromStorage();
  guests.push(guest);
  localStorage.setItem("guests", JSON.stringify(guests));
}

function getGuestsFromStorage() {
  return JSON.parse(localStorage.getItem("guests")) || [];
}

function loadGuestsFromStorage() {
  const guests = getGuestsFromStorage();
  guests.forEach(renderGuest);
}

function deleteGuestFromStorage(name) {
  let guests = getGuestsFromStorage();
  guests = guests.filter(guest => guest.name !== name);
  localStorage.setItem("guests", JSON.stringify(guests));
}

function updateGuestStatus(name, attending) {
  const guests = getGuestsFromStorage();
  const updated = guests.map(guest => {
    if (guest.name === name) {
      guest.attending = attending;
    }
    return guest;
  });
  localStorage.setItem("guests", JSON.stringify(updated));
}
