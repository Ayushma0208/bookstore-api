Here's a complete and well-structured **README.md** file for your **Bookstore REST API** project, including:

* Project description
* Setup instructions
* API usage (including test email)
* JWT auth flow
* Optional Swagger and testing info

---

## 📄 README.md

````markdown
# 📚 Bookstore REST API

A Node.js + Express RESTful API for managing a bookstore with:

- File-based JSON persistence
- JWT-based authentication
- Protected user-specific CRUD operations
- Pagination and search
- Swagger documentation
- Unit tests with Jest

---

## 🚀 Features

- ✅ Register and login with JWT
- ✅ Secure book CRUD (only owner can edit/delete)
- ✅ File-based storage (users & books)
- ✅ Pagination: `GET /books?page=1&limit=10`
- ✅ Search by genre: `GET /books/search?genre=Fiction`
- ✅ Swagger API docs

---

## 🛠️ Setup

1. **Clone the repository:**

```bash
git clone https://github.com/ayushma0208/bookstore-api.git
cd bookstore-api
````

2. **Install dependencies:**

```bash
npm install
```

3. **Run the server:**

```bash
npm run dev
```

Server runs at: `http://localhost:3000`

---

## 🔐 Authentication

* Uses **JWT** for secure access.
* After login, you’ll receive a `token`.
* Include it in all `/books` requests:

```
Authorization: Bearer <token>
```

---

## 🧪 Test User

Use this to test endpoints:

```json
{
  "email": "testUser@yopmail.com",
  "password": "test1234"
}
```

---

## 🧾 API Endpoints

### 📌 Auth Routes

| Method | Route           | Description       |
| ------ | --------------- | ----------------- |
| POST   | `/api/register` | Register new user |
| POST   | `/api/login`    | Login, get token  |

---

### 📘 Book Routes *(require auth)*

| Method | Route                             | Description                 |
| ------ | --------------------------------- | --------------------------- |
| GET    | `/api/books`                      | List your books (paginated) |
| GET    | `/api/books/:id`                  | Get book by ID              |
| POST   | `/api/books`                      | Create a new book           |
| PUT    | `/api/books/:id`                  | Update your book            |
| DELETE | `/api/books/:id`                  | Delete your book            |
| GET    | `/api/books/search?genre=Fiction` | Filter books                |

---

Includes:

* Pagination logic
* Book controller routes (mocked)

---

## 📚 Swagger Docs

View full interactive API docs:

```bash
http://localhost:3000/api-docs
```

---

## 📂 Data Storage

Uses local JSON files for persistence:

* `src/models/users.json`
* `src/models/books.json`

---

## 📄 Project Structure

```
src/
├── controllers/
├── routes/
├── middleware/
├── utils/
├── models/
├── docs/
├── app.js
├── swagger.js
```

---

## 📌 Notes

* Ensure files like `books.json` and `users.json` exist with `[]` inside them.
* JWT secret is hardcoded here for demo purposes in .env.test 

---

Would you like a downloadable `Postman` collection or link to Swagger demo hosted on `render` or `vercel`? Let me know!
```
# bookstore-api
