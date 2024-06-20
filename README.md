# API Inventory Manager System
![Badge em Produção](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![Badge em Versão](http://img.shields.io/static/v1?label=Versão&message=1.0.0&color=GREEN&style=for-the-badge)

> This system was created for study purposes and provides an API for a product management system.

## Tools 🛠️

![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)
![Node](https://img.shields.io/badge/Node.js-43853D?style=flat&logo=node.js&logoColor=white)
![MySQL](https://img.shields.io/badge/-MySQL-00000F?style=flat&logo=mysql&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=flat&logo=express&logoColor=white)
![Git](https://img.shields.io/badge/-Git-E34F26?style=flat&logo=git&logoColor=white)
![GitHub](https://img.shields.io/badge/-GitHub-100000?style=flat&logo=github&logoColor=white)
![Visual Studio Code](https://img.shields.io/badge/-Visual%20Studio%20Code-333333?style=flat&logo=visual-studio-code&logoColor=007ACC)

## Recommendations 

It is recommended that you have this project installed on your machine and that it runs correctly:

- Mysql 8.0
- Node 18
- Visual Studio or another IDE
- git 2.43.0
- Postman

## Get project 📥

> Open your git bash in a folder of your choice and paste the command below to have the project on your computer.

``` bash
git clone https://github.com/gabrielsantos969/API-InventoryManagementSystemTS.git
```

## Installation & Configuration

### Installation
> To start the project, perform the necessary installation with the command below which will install all the resources used in this project.

```bash
    npm install
```
---

### Configuration

> Configure the port and host to run it in __.env__, if you don't add anything, it comes by default at __PORT=3000__ and __HOST=http://localhost__ in __src/server.ts__.

```.env
PORT=
HOST=
```

---

> Configure the __.env__ to connect to your database, some information if not added is placed by default in __src/config/connect.ts__.

```.env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_DATABASE=
DB_PORT=
```

## Putting it to run 🎉

> We separate it to run in two ways, which is as dev and compiled.

### __Running in dev mode__
```bash
npm run dev
```

### Compiling project
```bash
npm run compile
```

### __Running in compiled mode__
```bash
npm run start
```
