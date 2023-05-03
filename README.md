## Description

NestJS authentication and authorization application. JWT authentication is a widely used method for securing APIs by issuing and verifying tokens. RBAC, on the other hand, is a popular approach for managing access control based on users' roles and permissions.

## Features

- Authentication
- Authorization

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Routes

---

### Admin Login

**Public route**

```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
"username": "admin",
"password": "admin"
}
```

---

### User Login

**Public route**

```
POST http://localhost:3000/auth/login
Content-Type: application/json

{
"username": "user",
"password": "user"
}
```

---

### Profile

**Private route only accessable from User role**

```
GET http://localhost:3000/auth/login/auth/profile
Content-Type: application/json
Authorization: Bearer {{token}}
```

---

### Settings

**Private route, only accessable from Admin role**

```
GET http://localhost:3000/auth/settings
Content-Type: application/json
Authorization: Bearer {{token}}
```
