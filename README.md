# Fashion Lookbook (Node.js + Express + MongoDB)

Fashion Lookbook is a WEB2 Final Prooject (Express backend + static frontend) where users can register/login, create fashion posts, browse hot topics, and see inspiration from an external API (Unsplash).

## Features
- JWT authentication (register/login)
- User profile endpoints (get/update)
- Posts CRUD (private endpoints)
- Topics endpoint (hot topics)
- Image uploads (multer)
- External API integration: Unsplash (fashion inspiration)

## Tech Stack
- Node.js, Express
- MongoDB + Mongoose
- JWT + bcrypt
- Joi validation
- Multer (uploads)
- Static frontend in `/public`

---

## Setup & Installation

### Install dependencies
```bash
npm install
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
UNSPLASH_ACCESS_KEY=your_unsplash_access_key 

http://localhost:5000/index.html

API Documentation

Auth (Public)
Method	Endpoint	Description
POST	/api/auth/register	Register a new user (password hashed)
POST	/api/auth/login	Login and get JWT


Users (Private, JWT required)
Method	Endpoint	Description
GET	/api/users/profile	Get logged-in user profile
PUT	/api/users/profile	Update profile

Posts (Private, JWT required)
Method	Endpoint	Description
POST	/api/posts	Create a post
GET	/api/posts	Get user posts (supports query filters)
GET	/api/posts/:id	Get a post by id
PUT	/api/posts/:id	Update a post
DELETE	/api/posts/:id	Delete a post


Topics
Method	Endpoint	Description
GET	/api/topics/hot	Get hot topics
External API (Optional)
Method	Endpoint	Description
GET	/api/external/unsplash?query=...&per_page=...	Unsplash inspiration
