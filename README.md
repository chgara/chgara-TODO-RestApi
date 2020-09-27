<img src="https://asp.mvc-tutorial.com/Images/ArticleImages/9/working-with-databases/todo_list.png" alt="Todo Image" />

***A Rest Api of a Todo Server***

# TODO-List Rest-Api

> A Rest API of a TODO-List made in Typescript and MySQL

> A Todo List server who saves the data on a SQL DB

**Description**

- DB used: MySQL, a relational DB. (You can use another DB if you override the database.ts and mantain it's interface).
- Used Typescript insted of Javascript to ensure the code maintainability.
- For this proyect I used express as main dependenci to develop this web app.
- License: MIT

---

## How to consume the API

- **Authentication**

  *All the URL of the API have a **token** validation* except post in /auth/login or /auth/register
  
  **-Token validation**:
  
     *In all the get or post req to the Api should have a header token with the token* **"token":"thetokenprovided"**
    
     The token will be provided in a req post in /auth/login or /auth/register, the server will send a response with the token in the header
  

- **Create/Register a new User:**

  *Make a post in the url /api/auth/register*
  
  *Data required*: username, password, email
  
  **Ej:**
  ```JSON
  
  {
    "username":"admin",
    "email":"admin@admin.com",
    "password":"admin"
  }
  
  ```
  


---

## Change content

- Mantain all the types and implement the interfaces to avoid errors

```Typescript

//Delete this code

class MySQL implements db{

//All the methods of db are here
//Some stuff methods

}
export default MySQL;
```

```Typescript


//Rewrite the code

class MongoDB implements db{

//Implements all the methods of db correctly

}
export default MongoDB;
```

---

## Installation

- You need to have installed node and MYSQL

### Clone

- Clone this repo to your local machine

### Setup

> now install npm modules

```shell
$ npm install
```

> now run the code

```shell
$ npm start
```
---

> If you want to make changes in .ts files

```shell
$ npm run dev
```

---


---

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 chgara.
