# Internship
--Task Manager --
This is a simple yet powerful Task Manager application built with React. It allows users to add, edit, delete, and sort tasks. The app uses localStorage to persist tasks and provides the ability to search and sort tasks by name or priority.

Features --:
Add Tasks: Create tasks with a title, description, and priority.
Sort Tasks: Sort tasks by name or priority (low, normal, high).
Search Tasks: Quickly search for tasks by title.
Mark as Completed: Mark tasks as completed with a checkbox.
Delete Tasks: Remove tasks permanently from the list.
Persistent Data: Tasks are saved to localStorage and remain after page reloads.

Technologies Used --:
React: A JavaScript library for building user interfaces.
Tailwind CSS: A utility-first CSS framework used for styling.
localStorage: Used to store tasks locally in the browser.

Installation
To run this project locally, follow these steps:

Prerequisites :
Node.js and npm should be installed on your system. You can download them from here.
Clone the Repository :git clone https://github.com/your-username/task-manager.git
cd task-manager
npm install

Run the Application :
npm start
This will start the development server at (http://localhost:5173/)

How to Use
Add a Task: Enter a task title and description, select a priority level (low, normal, high), and click "Add Task".
Sort Tasks: Click on "Sort by Name" or "Sort by Priority" to reorder your tasks.
Search Tasks: Use the search bar to filter tasks by their title.
Mark as Completed: Click the checkbox next to a task to mark it as completed.
Delete a Task: Click the "Delete" button to remove a task permanently.


Assumptions --:
LocalStorage Availability:
The app relies on the browser's localStorage to persist tasks between page reloads. It assumes that localStorage is supported by the user's browser, which is the case for modern browsers.

Data Format:
The task objects in localStorage are assumed to be structured consistently, with each task having an id, title, description, completed, and priority field. This format is expected to be maintained for correct functionality.

No Authentication:
The app does not require any user authentication or user-specific data. All tasks are stored in localStorage, meaning they are global to the browser on which they are stored, not tied to any individual user.

Unique Task IDs:
Each task's ID is generated using Date.now(), which ensures that IDs are unique as long as tasks are added at different times. However, this method doesn't guarantee absolute uniqueness, especially if tasks are added at the same millisecond.

Browser Support:
The app assumes that the user is using a modern browser that supports features like useState, useEffect, and localStorage. Older browsers or browsers with JavaScript disabled may not work properly.

No Backend Integration:
The app is fully client-side and does not integrate with a backend API. All tasks are stored and managed in the browser using localStorage, with no external database or server involved.

No Error Handling for LocalStorage:
There is no advanced error handling for localStorage operations (e.g., handling the case when localStorage is full or unavailable). It assumes that localStorage operations will succeed without issues.

