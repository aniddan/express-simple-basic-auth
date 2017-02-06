# express-simple-basic-auth
Simple Basic authorization middleware for Express

### Fetures
 - Promise based
 - Database ready

### Usage

```bash
npm install --save express-simple-basic-auth
```
*Using yarn is even better*

```JavaScript
const express = require('express');
const basicAuth = require('express-simple-basic-auth');

const app = express();
app.use(basicAuth({
  find(username, password) {
    return db.collection('users').findOne({ username, password });
  }
  // or
  find(username) {
    return db.collection('users').findOne({ username, password }).then(user => user && ({ [user.username]: user.password }));
  }
});
```
