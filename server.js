const express = require('express');
const Joi = require('@hapi/joi');

const UserRoute = require('./routes/UserRoute');

const app = express();
const port = process.env.port || 3000;

// Adding middleway to use syntax req.body.name.
app.use(express.json());

app.get('/', (req, res) => res.send('Hello World!'));

app.use('/api/users', UserRoute);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
