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

## Recommendations 💡

>[!IMPORTANT]
>
> It is recommended that you have this project installed on your machine and that it runs correctly:
>
> - Mysql 8.0
> - Node 18
> - Visual Studio or another IDE
> - git 2.43.0
> - Postman

## Get project 📥

> Open your git bash in a folder of your choice and paste the command below to have the project on your computer.

``` bash
git clone https://github.com/gabrielsantos969/API-InventoryManagementSystemTS.git
```

## Contribute to the Project 

> You can contribute to this project at any time with code improvements or necessary implementations.
>
>If you don't know how to do it, below is a link to a post on Linkedin that I made, with the aim of showing you step by step how to contribute to any project.
>
> 🔗 [How to contribute to a project on Github with Fork and Pull](https://www.linkedin.com/posts/gabriel-santos-b53632196_github-git-tecnologia-activity-7209626258278649856-g_wr?utm_source=share&utm_medium=member_desktop)

## Installation & Configuration ⚙️

### Installation 📥
> To start the project, perform the necessary installation with the command below which will install all the resources used in this project.

```bash
    npm install
```
---

### Configuration ⚙️

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

## Database

>[!IMPORTANT]
>
> It is recommended that you use MySQL as the database on which the scripts were created based on.
>
> Here is the installation link:  [MySQL Installer 8.0.37](https://dev.mysql.com/downloads/installer/ "https://dev.mysql.com/downloads/installer/")

> After installing MySQL and configuring the workbench to be able to use the database, run the scripts that are at the root of the project to have all the tables that the API has, so that it works correctly.

## Putting it to run 🎉

> We separate it to run in two ways, which is as dev and compiled.

### __Running in dev mode__ 🏃‍♂️💨
```bash
npm run dev
```

### Compiling project 📥
```bash
npm run compile
```

### __Running in compiled mode__ 🏃‍♂️💨
```bash
npm run start
```
