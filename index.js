// Load saved guests from localStorage when the page loads
document.addEventListener('DOMContentLoaded', () => {
  const savedGuests = JSON.parse(localStorage.getItem('guestList')) || [];
  savedGuests.forEach(guest => {
    renderGuest(guest.name, guest.attending);
  });
});

function addGuest() {
  const input = document.getElementById('guestName');
  const guestName = input.value.trim();
  const guestList = document.getElementById('guestList');

  if (guestName === '') {
    alert("Please enter a guest name.");
    return;
  }

  const currentGuests = JSON.parse(localStorage.getItem('guestList')) || [];
  if (currentGuests.length >= 10) {
    alert("Guest list limit reached (10 people max).");
    return;
  }

  renderGuest(guestName, false);
  currentGuests.push({ name: guestName, attending: false });
  localStorage.setItem('guestList', JSON.stringify(currentGuests));

  input.value = '';
}

function renderGuest(name, attending) {
  const guestList = document.getElementById('guestList');
  const listItem = document.createElement('li');

  const nameSpan = document.createElement('span');
  nameSpan.className = 'guest-name';
  nameSpan.textContent = name;

  const rsvpButton = document.createElement('button');
  rsvpButton.textContent = attending ? "Attending" : "Not Attending";
  rsvpButton.className = 'rsvp-button';
  if (attending) rsvpButton.classList.add('attending');

  rsvpButton.onclick = function () {
    rsvpButton.classList.toggle('attending');
    rsvpButton.textContent = rsvpButton.textContent === "Attending" ? "Not Attending" : "Attending";

    updateGuest(name, rsvpButton.textContent === "Attending");
  };

  const deleteButton = document.createElement('button');
  deleteButton.textContent = "Remove";
  deleteButton.className = 'delete-button';

  deleteButton.onclick = function () {
    guestList.removeChild(listItem);
    deleteGuest(name);
  };

  listItem.appendChild(nameSpan);
  listItem.appendChild(rsvpButton);
  listItem.appendChild(deleteButton);

  guestList.appendChild(listItem);
}

function updateGuest(name, attending) {
  const guests = JSON.parse(localStorage.getItem('guestList')) || [];
  const updated = guests.map(g => g.name === name ? { ...g, attending } : g);
  localStorage.setItem('guestList', JSON.stringify(updated));
}

function deleteGuest(name) {
  const guests = JSON.parse(localStorage.getItem('guestList')) || [];
  const updated = guests.filter(g => g.name !== name);
  localStorage.setItem('guestList', JSON.stringify(updated));
}
