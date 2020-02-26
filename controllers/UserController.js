const Joi = require('@hapi/joi');
const uuid = require('uuid');

const USERS = [
  { id: '1', name: 'Simon' },
  { id: '2', name: 'Kai Jing' }
];

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

const getUsers = (req, res, next) => {
  res.send(USERS);
};

const getUserById = (req, res, next) => {
  // Look up the user
  let user = USERS.find(user => user.id === parseInt(req.params.id));

  // Return 404 if the user not found
  if (!user) return res.status(404).send('Not Found');

  // Else return the user
  res.send(user);
};

const createUser = (req, res, next) => {
  // Validating
  const result = validateUser(req.body);

  // Return 400 data error
  if (result.error) return res.status(400).send(result.error.details[0].message);

  // Else add the user
  const user = {
    id: uuid.v4(),
    name: req.body.name
  };
  USERS.push(user);
  res.send(user);
};

const updateUserById = (req, res, next) => {
  // Look up the user
  let user = USERS.find(user => user.id === req.params.id);

  // Return 404 if the user not found
  if (!user) return res.status(404).send('Not Found');

  // Validating
  const result = validateUser(req.body);

  // Return 400 data error
  if (result.error) return res.status(400).send(result.error.details[0].message);

  // Update the course
  // user.name = req.body.name; --- We don't direct update the data
  // This method is to make sure all elements update into the object, then only push to source.
  const userIndex = USERS.findIndex(p => p.id === parseInt(req.params.id));
  user.name = req.body.name;
  USERS[userIndex] = user;

  res.send(user);
};

const deleteUserById = (req, res, next) => {
  // Look up the user
  let user = USERS.find(user => user.id === req.params.id);

  // Return 404 if the user not found
  if (!user) return res.status(404).send('Not Found');

  // Delete
  const index = USERS.indexOf(user);
  USERS.splice(index, 1);

  // return
  res.send(USERS);
};

exports.getUsers = getUsers;
exports.getUserById = getUserById;
exports.createUser = createUser;
exports.updateUserById = updateUserById;
exports.deleteUserById = deleteUserById;
