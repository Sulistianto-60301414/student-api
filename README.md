# student-api

A **minimal Express REST API** for managing students. Perfect as a first GitHub project and portfolio starter.

## ✨ Features
- CRUD endpoints (`GET/POST/PUT/DELETE`) for students
- Simple JSON persistence using a file (`/data/students.json`)
- CORS + request logging (morgan)
- Clean, beginner-friendly structure

## 📁 Project Structure
```text
student-api/
├── data/
│   └── students.json
├── routes/
│   └── students.js
├── .gitignore
├── package.json
├── server.js
└── README.md
```

## 🚀 Run Locally
**Requirements:** Node.js 18+

```bash
npm install
npm run dev  # or: npm start
```

API will start at: `http://localhost:3000`

## 🔌 Endpoints
- `GET /` – health check
- `GET /api/students` – list all students
- `GET /api/students/:id` – get one student
- `POST /api/students` – create student (JSON body: `{ "name": "...", "major": "...", "gpa": 3.4 }`)
- `PUT /api/students/:id` – update fields
- `DELETE /api/students/:id` – remove one

### Quick Test (with curl)
```bash
curl http://localhost:3000/api/students
curl -X POST http://localhost:3000/api/students -H "Content-Type: application/json" -d '{"name":"Fatima","major":"IS","gpa":3.7}'
curl -X PUT http://localhost:3000/api/students/1 -H "Content-Type: application/json" -d '{"gpa":3.4}'
curl -X DELETE http://localhost:3000/api/students/2
```

## 🧭 Next Steps (Good for Portfolio)
- Replace file storage with MongoDB or PostgreSQL
- Add validation (Joi/Zod) and better error handling
- Add tests (Jest + Supertest)
- Deploy to Render/Railway/Heroku

## 📄 License
MIT
