// 4 Regex mandatory
const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,100}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{8,15}$/;
const securityRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/; // Lookahead: 1 uppercase letter, 1 number, 6 letters minimum

let contacts = JSON.parse(localStorage.getItem('my_contacts')) || [];
const form = document.getElementById('contact-form');
const contactsBody = document.getElementById('contacts-body');

// Display contacts in the HTML table
function render() {
    contactsBody.innerHTML = '';
    contacts.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${c.phone}</td>
            <td>${c.key}</td>
            <td>
                <button onclick="deleteContact(${index})">Delete</button>
            </td>
        `;
        contactsBody.appendChild(row);
    });
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const nameVal = document.getElementById('full-name').value;
    const emailVal = document.getElementById('email').value;
    const phoneVal = document.getElementById('phone').value;
    const keyVal = document.getElementById('security-key').value;
    if (!nameRegex.test(nameVal)) return alert("Invalid Name (3-30 letters)");
    if (!emailRegex.test(emailVal)) return alert("Invalid Email");
    if (!phoneRegex.test(phoneVal)) return alert("Invalid Phone (10 digits)");
    if (!securityRegex.test(keyVal)) return alert("Invalid Key (Must have 1 Upper, 1 Number, 6 chars min)");
    const newContact = { name: nameVal, email: emailVal, phone: phoneVal, key: keyVal };
    contacts.push(newContact);
    localStorage.setItem('my_contacts', JSON.stringify(contacts));
    form.reset();
    render();
});

// delete contact
window.deleteContact = function(index) {
    contacts.splice(index, 1);
    localStorage.setItem('my_contacts', JSON.stringify(contacts));
    render();
};
document.getElementById('search-input').addEventListener('input', function(e) {
    const text = e.target.value.toLowerCase();
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(text));
  
    contactsBody.innerHTML = '';
    filtered.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${c.name}</td><td>${c.email}</td><td>${c.phone}</td><td>${c.key}</td><td><button onclick="deleteContact(${index})">Delete</button></td>`;
        contactsBody.appendChild(row);
    });
});

// Simple A-Z sort
document.getElementById('sort-btn').addEventListener('click', function() {
    contacts.sort((a, b) => a.name.localeCompare(b.name));
    localStorage.setItem('my_contacts', JSON.stringify(contacts));
    render();
});

document.getElementById('export-btn').addEventListener('click', function() {
    const data = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(contacts));
    const link = document.createElement('a');
    link.setAttribute("href", data);
    link.setAttribute("download", "backup.json");
    link.click();
});

// JSON import with error handling (Try/Catch)
document.getElementById('import-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(evt) {
        try {
            contacts = JSON.parse(evt.target.result);
            localStorage.setItem('my_contacts', JSON.stringify(contacts));
            render();
        } catch(err) {
            alert("Bad JSON file");
        }
    };
    reader.readAsText(file);
});

// Loading when we're going to start
render();
