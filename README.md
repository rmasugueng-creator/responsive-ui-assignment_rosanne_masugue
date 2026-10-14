# Responsive UI Assignment - Simple Contact Book
**Student:** Rosanne Masugue Ngangoumoun

I designed this application to be as simple and concise as possible. I avoided complex visual frameworks to focus exclusively on writing clean, functional code; code I have fully mastered and can explain line by line.

## Technical Breakdown & Proof of Work

### 1. HTML & Accessibility (A11y)
- **Structure:** I used native semantic landmarks like `<header>`, `<main>`, and `<section>` so that search engines and screen readers can understand the hierarchy.
- **Forms:** Every input field has an explicit `<label for="...">` linked to its `id`. This ensures anyone navigating via assistive technologies can easily fill out the form.

### 2. CSS & Responsive Architecture (Mobile-First)
- **Grid Layout:** To meet the responsive requirements without bloating the stylesheet, I used CSS Grid. 
- **Breakpoints:** By default, the layout loads in **1 single column** (perfect for Mobile screens). I added a `@media (min-width: 768px)` rule so that it automatically snaps into **2 columns** on Tablet and Desktop (Form on the left, Table on the right).

### 3. JavaScript Logic & Data Handling
- **State Management:** The application data lives inside a global `contacts` array. 
- **Persistence:** I used `localStorage.setItem()` and `JSON.parse(localStorage.getItem())`. This ensures that even if you refresh the browser or close the tab, the records are not lost.
- **Import/Export:** The data portability uses native JavaScript Blobs. To handle potential corruption safely, the import listener wraps the `JSON.parse()` operation inside a `try...catch` block. If a malformed file is uploaded, the script catches the runtime exception and fires an alert instead of crashing the UI thread.

### 4. Code Catalog: Form Validation via Regex
I wrote 4 explicit regular expressions to validate user inputs before submission:
1. `nameRegex = /^[a-zA-ZÀ-ÿ\s]{3,100}$/` -> Ensures the name contains only letters and spaces, accommodating longer names up to 100 characters.
2. `emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/` -> A flexible, universal pattern that accurately checks for standard email formatting.
3. `phoneRegex = /^[0-9]{8,15}$/` -> A flexible configuration that accepts standard international numbers between 8 and 15 digits.
4. `securityRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/` -> **This is my advanced validation.** It uses two independent **positive lookaheads**:
   - `(?=.*[A-Z])`: Scans the string to verify at least one uppercase letter exists.
   - `(?=.*\d)`: Scans the string to verify at least one number exists.
   - `.{6,}`: Ensures the total length is at least 6 characters.

### 5. Dynamic Theme Selection (Dark Mode)
To improve user experience (UX) and contrast accessibility, I implemented a custom theme switcher. The system reads and updates a custom `data-theme` attribute on the root HTML element. The user's visual preference is dynamically saved into `localStorage` so the chosen theme persists across separate browser sessions.
