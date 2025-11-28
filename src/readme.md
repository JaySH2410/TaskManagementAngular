# 🖥️ Task Management Frontend – Angular 20 (Standalone + Signals)

This is the frontend UI for the **Task Management System**, built using **Angular 20** with **Standalone Components**, **Signals state management**, **HttpClient API integration**, and **Tailwind CSS** for styling. The application interacts with the ASP.NET Core Web API backend to perform task and category management operations.

---

## 🚀 Features

- Angular 20 standalone component architecture
- Signals for reactive state management (no NgRx needed)
- Task & Category CRUD operations
- Service-based API layer
- Form handling using Angular Reactive Forms
- Toast notifications & validation handling
- Environment-based API URL configuration

---

## 📁 Project Structure

src/\
│── app/\
│ │── components/ → UI components (Task, Category, List, Form)\
│ │── guards/ → Route guards (if used)\
│ │── models/ → TypeScript model interfaces\
│ │── pipes/ → Custom pipes (if any)\
│ │── services/ → API services using HttpClient & Signals state\
│ │── app.routes.ts → Application routing configuration\
│ │── app.ts → Root standalone application component\
│ │── app.config.ts → bootstrapApplication + providers setup\
│── env/
│── assets/\
│── index.html\
│── main.ts\
│── styles.css


---

## 🧠 Tech Stack

| Technology / Library | Purpose |
|----------------------|---------|
| **Angular 20** | Framework |
| **Signals** | Local reactive state management |
| **Standalone Components** | Modern Angular app structure |
| **HttpClient** | API communication |
| **TypeScript** | Language |
| **RxJS** | Async operations |

---

## 🌐 Backend API Integration

The app communicates with the ASP.NET Core API at:
```ts
const API_BASE_URL = 'https://localhost:5001/api';
```

---

## Future Enhancements

- Add Login Screen and JWT Authentication
- Auth Guards to routes
- Add Page for List of Categories and updating and deleting categories
- Pagination for tasks
- Use shared components