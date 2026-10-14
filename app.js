// 4 regex mandatory
const nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,100}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{8,15}$/;
const securityRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;

let contacts = JSON.parse(localStorage.getItem('my_contacts')) || [];
let editIndex = -1; 

const form = document.getElementById('contact-form');
const contactsBody = document.getElementById('contacts-body');
const cancelBtn = document.getElementById('cancel-btn');
const submitBtn = document.getElementById('submit-btn');

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
                <button onclick="editContact(${index})">Edit</button>
                <button onclick="deleteContact(${index})" style="background:red;">Delete</button>
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
    if (!nameRegex.test(nameVal)) return alert("Invalid Name (3-100 letters)");
    if (!emailRegex.test(emailVal)) return alert("Invalid Email");
    if (!phoneRegex.test(phoneVal)) return alert("Invalid Phone (8-15 digits)");
    if (!securityRegex.test(keyVal)) return alert("Invalid Key (Must have 1 Upper, 1 Number, 6 chars min)");

    const newContact = { name: nameVal, email: emailVal, phone: phoneVal, key: keyVal };
    if (editIndex === -1) {
        // Adding a new contact
        contacts.push(newContact);
    } else {
        // Editing a contact
        contacts[editIndex] = newContact;
        editIndex = -1;
        submitBtn.textContent = "Save";
        cancelBtn.style.display = "none";
    }
    localStorage.setItem('my_contacts', JSON.stringify(contacts));
    form.reset();
    render();
});
// Function to load data into the form for editing
window.editContact = function(index) {
    const c = contacts[index];
    document.getElementById('full-name').value = c.name;
    document.getElementById('email').value = c.email;
    document.getElementById('phone').value = c.phone;
    document.getElementById('security-key').value = c.key;

    editIndex = index;
    submitBtn.textContent = "Update Contact";
    cancelBtn.style.display = "inline-block"; 
};
// button (Go back)
cancelBtn.addEventListener('click', function() {
    form.reset();
    editIndex = -1;
    submitBtn.textContent = "Save";
    cancelBtn.style.display = "none";
});
window.deleteContact = function(index) {
    if(confirm("Delete this contact?")) {
        contacts.splice(index, 1);
        localStorage.setItem('my_contacts', JSON.stringify(contacts));
        render();
    }
};
document.getElementById('search-input').addEventListener('input', function(e) {
    const text = e.target.value.toLowerCase();
    const filtered = contacts.filter(c => c.name.toLowerCase().includes(text));
    contactsBody.innerHTML = '';
    filtered.forEach((c, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${c.name}</td><td>${c.email}</td><td>${c.phone}</td><td>${c.key}</td><td><button onclick="editContact(${index})">Edit</button> <button onclick="deleteContact(${index})" style="background:red;">Delete</button></td>`;
        contactsBody.appendChild(row);
    });
});
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
document.getElementById('import-file').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (!file) return;
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

// This is to change the thema of the website
const themeToggleBtn = document.getElementById('theme-toggle');

// Let's first check if the user had chosen the dark mode before
const savedTheme = localStorage.getItem('my_theme') || 'light';
document.documentElement.setAttribute('data-theme', savedTheme);

// Then we can change the website theme
themeToggleBtn.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    let newTheme = 'light';
    if (currentTheme === 'light') {
        newTheme = 'dark';
    }
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('my_theme', newTheme);
});
