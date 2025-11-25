Admin Dashboard Guide
Access the Admin Panel
Navigate to /admin or click "Admin Login" in the footer
Use the demo credentials:
Email: admin@fenriz.com
Password: admin123
Features
Manage Content
The admin dashboard allows you to manage four types of content:

Classes - Martial arts classes offered (Muay Thai, MMA, BJJ, etc.)
Events - Upcoming events and seminars
Shop - Merchandise items for sale
Partners - Partner organization logos
Operations
Add New Item
Click "Add New" button in any section
Fill in the form fields:
Name (required)
Image URL (required)
Description (for classes and events)
Date (for events)
Click "Save"
Edit Item
Click "Edit" on any item card
Modify the fields
Click "Save"
Delete Item
Click "Delete" on any item card
Confirm the deletion
Data Persistence
All changes are saved to browser localStorage
Changes are immediately reflected on the main website
Data persists across browser sessions
To reset: Clear browser localStorage
Technical Notes
Authentication is demo-only (client-side)
In production, this would use proper backend authentication
Data is stored in browser localStorage (not a database)
For production, integrate with a real backend/database