A simple REST API using node.js express js using memory data store data.

The application has 2 users by default:
const users = [
{ id: 1, name: 'Simon' },
{ id: 2, name: 'Kai Jing' }
];

To get a list users:
GET http://localhost:3000/api/users

To get a user:
GET http://localhost:3000/api/users/:id

To add a user:
POST http://localhost:3000/api/users

To update a user:
PATCH http://localhost:3000/api/users/:id

To delete a user:
DELETE http://localhost:3000/api/users/:id

## Available Scripts

In the project directory, you can run:

### `npm install`

Download and install dependences.

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### References

Installing Express JS
https://expressjs.com/en/starter/installing.html

nodemon - Automatically restarting the node application when file changes in the directory are detected
https://www.npmjs.com/package/nodemon

@hapi/joi - data validation
https://www.npmjs.com/package/@hapi/joi

uuid - Generate unique id
https://www.npmjs.com/package/uuid

Postman - To test the Rest API
https://www.postman.com/
