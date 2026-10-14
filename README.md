# responsive-ui-assignment_rosanne_masugue
# Responsive UI Assignment - Simple Contact Book

This project is a simple web app to manage contacts. It was built quickly following a medical absence, focusing strictly on functional requirements.

## Features
- Layout changes from 1 column (mobile) to 2 columns (desktop) using CSS grid.
- Saves data locally in the browser (`localStorage`).
- Form checked with 4 basic Regex rules (including 1 advanced password-style lookahead key).
- Basic search bar filtering results by name.
- Simple JSON export and import with basic try/catch protection.

Basically, in my work, the complex regex is the line `const securityRegex = /^(?=.*[A-Z])(?=.*\d).{6,}/`, where `(?=.*[A-Z])` checks for an uppercase letter and `(?=.*\d)` checks for a digit without blocking the input. It's a positive lookahead.
