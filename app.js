const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT|| 3000;

//Middleware
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// task
const tasks = [];

//API routes
app.listen(port, () => {
    console.log('server is running on port ${port}');
});
