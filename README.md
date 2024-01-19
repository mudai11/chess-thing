<div align="center">
<a href="#">
  <img src="./web/public/logo.png" alt="logo" width="180"/>
</a>
</div>

<h1 align="center">
  <a href="#">Chess Thing Web Application</a>
</h1>

<p align="center">

 <a href="https://github.com/mudai11/chess-thing">
    <img src="https://img.shields.io/github/license/mudai11/chess-thing" alt="license"/>
  </a>
  <a href="https://github.com/mudai11/chess-thing/fork">
    <img src="https://img.shields.io/github/forks/mudai11/chess-thing" alt="fork"/>
  </a>
  <a href="https://github.com/mudai11/chess-thing">
    <img src="https://img.shields.io/github/stars/mudai11/chess-thing" alt="stars"/>
  </a>
  
</p>

<p align="center">
 <img src="./assets/homepage.png" alt="main">
</p>

> **Warning:** If you are not familiar with Typescript or any other programming language related to this project, please learn it first before attempting to work on this project. **I won't be able to help anyone who doesn't know how to do basic stuff.**

## Introduction

<p><a href="#">Chess Thing</a> is a chess web application, built with <a href="https://github.com/vercel/next.js/">Next.js</a> and <a href="https://github.com/tailwindlabs/tailwindcss">Tailwind</a> using <a href="https://github.com/shadcn-ui/ui">shadcui</a>, featuring a sleek and modern design. It offers multiplayer capabilities with a good user experience and many more features to come.</p>

## Features

- General
  - Multiplayer
  - User-friendly interface
  - Mobile responsive
  - Fast page load

## To Do List

- [x] Create README file
- [x] Add profile page
- [] Add abondoned countdown and ability to reconnect
- [] Add the ability to review and analyze archived games
- [] Add AI bots (stockfish)
- [] Add PWA support

## Bug Report

If you encounter any issues or bug on the site please head to [issues](https://github.com/mudai11/chess-thing/issues) and create a bug report there.

## For Local Development

1. Clone this repository using :

```bash
git clone https://github.com/mudai11/chess-thing.git
```

2. Install server package using npm :

```bash
cd server && npm install
```

3. Install web package using npm :

```bash
cd web && npm install
```

4. Create `.env` file in the server folder and put this inside the file :

```bash
## Server settings
HOST='0.0.0.0'
PORT='8080'
SECRET_KEY="create a secret key for your jwt"
ORIGIN="your client url for example in development localhost:3000"
SERVER_URL="the server url for example in development localhost:8080"
DOMAIN="domain of the url for example in development localhost"

## Google Oauth
GOOGLE_CLIENT_ID='google oauth client id'
GOOGLE_CLIENT_SECRET='google oauth client secret'
GOOGLE_OAUTH_REDIRECT_URL='api/auth/google/callback'

## Database URL (postgresql)
DATABASE_URL="Your database connection url"

## Redis
# I use upstash but you can run a docker container or use any redis provider
REDIS_URL="rediss://username:password@host:port"

```

5. Create `.env` file in the web folder and put this inside the file :

```bash
## Nextjs settings
NEXT_PUBLIC_SERVER_URL='http://localhost:8080'
NEXT_PUBLIC_CLIENT_URL='http://localhost:3000'
SERVER_URL='http://0.0.0.0:8080'

```

5. Generate Prisma inside the server folder (/server) :

```bash
npx prisma migrate dev
npx prisma generate
```

6. Start local servers :

```bash
npm run web
npm run server
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE.md](LICENSE.md) file for details.

> This means that if you choose to use or host this site for your own purposes, you are also required to release the source code of any modifications or improvements you make to this project. This open-source ethos is central to the project's philosophy.

## Contact

Thank You for passing by!!

If you have any questions or feedback, please reach out to us at [akahades11@gmail.com](mailto:akahades11@gmail.com?subject=[Chess-Thing]%20-%20Your%20Subject), or you can join our [discord server](https://discord.gg/9FKyFFvv).
<br>
or you can DM me on Discord `aka_theos#3375`.
