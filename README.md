# Prisma Node JS Express RESTAPI

## 📖 Overview  

This Rest API is built with Node.js, Express, Prisma ORM, and PostgresQL. It provides CRUD functionality for a simple quotes application. Users can create, read, update, and delete quotes, as well as create and read authors and users.

## ✅ Prerequisites  

Before you begin, ensure you have the following installed on your system: 


1. **Node.js** (v18 or later) → [Download here](https://nodejs.org/)
2. **PostgreSQL** (v14 or later) → [Download here](https://www.postgresql.org/download/)
   - **Make sure PostgreSQL is running before proceeding.**
3. **Git** (if not installed) → [Download here](https://git-scm.com/downloads)

## ⚙️ Installation
### 🚀 Step 1: Clone the Project
Open a terminal and run:
```sh
git clone https://github.com/your-repo.git
cd your-repo
```
### 📦 Step 2: Install Dependencies
Run the following command to install the required packages:
```sh
npm install
```
### 🛠️ Step 3: Configure Environment Variables
1. Create a .env file in the root directory.
2. Copy and paste the following into .env, then modify the values:
```
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydatabase"
SECRET_KEY="your-secret-key"

```
* Replace password with your PostgreSQL password.
* Replace mydatabase with the database name.


### 📂 Step 4: Set Up the Database
Run the setup script to create the database, apply migrations, and seed data:

```
npm run setup
```
#### 🔹 If you get an error, make sure PostgreSQL is running before retrying.
#### 🔹 If your system does not recognize the `sh` command, run the command in Git Bash instead.

### 🔥 Step 5: Start the Server
To start the backend server, run:
```
npm start
```

## ⚠️ Important  

Your frontend does **not** include a sign-up feature. Therefore, you need to add users manually. Here are three ways to do it:  

### **1️⃣ Using Postman (Recommended)**  
You can use Postman or any API client to create a new user by sending a `POST` request to the backend.  

#### **Example Request (Sign Up a New User)**
```http
POST http://localhost:5000/api/auth/signup
Content-Type: application/json

{
  "username": "newuser",
  "password": "securepassword",
  "role": "admin"  // Options: "user", "admin"
}
```
### 2️⃣ Using pgAdmin (Direct Database Entry)
If you have pgAdmin installed, you can manually insert users into the database.

#### SQL Query to Insert a User
```
INSERT INTO "User" (username, password, role) 
VALUES ('admin', '$2b$10$hashedpassword...', 'admin');
```
🔹 Note: The password must be hashed before storing in the database. Use bcrypt or Prisma's seed.js to generate hashed passwords.

### 3️⃣ Using Prisma Seed Script (Automated Initialization)
You can use the Prisma seed script to initialize default users and roles automatically.

#### Run the seed script:
```
npm run setup
```
#### This will create default users such as:
```json
[
  { "username": "admin@example.com", "password": hashed password of "password", "role": "admin" },
  { "username": "user1@example.com", "password": hashed password of "password", "role": "user" },
  { "username": "user2@example.com", "password": hashed password of "password" "role": "user" }
]
```
🔹 Tip: Modify prisma/seed.js to customize default users.