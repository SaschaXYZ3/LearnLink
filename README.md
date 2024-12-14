# LearnLink

# How to start a Webserver:

start webserver static

```bash
npm start
```

start webserver witrh auto update if some changes are made

```bash
npm start nodemon
```

## In case it does not work:

Do this in frontend directory

```bash
npm install --save-dev nodemon #this installs it locally in the repo
#initialize npm packet manager
npm init -y
#install react
npm install react-scripts --save
```

Maybe some vulnerabilities appear and the Webserver doesnt start, try this 1-2 times

```
#Update - vulnerabilities
npm audit fix --force
#redo if more than 2 vulnerabilities appear
```

## install additional packages

bcrypt to hash passwords for storing in database\
sqlite3 as database\
body-parser to compile to SQL-querries

```
npm init -y
npm install express sqlite3 body-parser cors bcrypt
```

## install Jason Web Token for assigning jwt

```
npm install jsonwebtoken
```

## install react-router-dom for routing

```
npm install react-router-dom
```