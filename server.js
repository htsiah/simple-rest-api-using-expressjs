const express = require('express');
const Joi = require('@hapi/joi');

const app = express();
const port = process.env.port || 3000;

// Adding middleway to use syntax req.body.name.
app.use(express.json());

// User Data Validation
function validateUser(user) {
  // Define the data validation schema
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });

  // Validating and return the result
  return schema.validate(user);
}

const users = [
  { id: 1, name: 'Simon' },
  { id: 2, name: 'Kai Jing' }
];
app.get('/', (req, res) => res.send('Hello World!'));

app.get('/api/users', (req, res) => {
  res.send(users);
});

app.get('/api/users/:id', (req, res) => {
  // Look up the user
  let user = users.find(user => user.id === parseInt(req.params.id));

  // Return 404 if the user not found
  if (!user) return res.status(404).send('Not Found');

  // Else return the user
  res.send(user);
});

app.post('/api/user', (req, res) => {
  // Define the data validation schema
  const schema = Joi.object({
    name: Joi.string()
      .min(3)
      .required()
  });

  // Validating
  const result = schema.validate(req.body);

  // Return 400 data error
  if (result.error) return res.status(400).send(result.error.details[0].message);

  // Else add the user
  const user = {
    id: users.length + 1,
    name: req.body.name
  };
  users.push(user);
  res.send(user);
});

app.put('/api/users/:id', (req, res) => {
  // Look up the user
  let user = users.find(user => user.id === parseInt(req.params.id));

  // Return 404 if the user not found
  if (!user) return res.status(404).send('Not Found');

  // Validating
  const result = validateUser(req.body);

  // Return 400 data error
  if (result.error) return res.status(400).send(result.error.details[0].message);

  // Update the course
  user.name = req.body.name;
  res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
  // Look up the user
  let user = users.find(user => user.id === parseInt(req.params.id));

  // Return 404 if the user not found
  if (!user) return res.status(404).send('Not Found');

  // Delete
  const index = users.indexOf(user);
  users.splice(index, 1);

  // return
  res.send(users);
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
