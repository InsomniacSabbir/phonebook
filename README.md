## Installation
Clone the repository and run:

* `npm install` to install the dependencies

* `npm start` to start the server


API EndPoints:

* GET `http://localhost:3000/contacts` - listing all users.

* POST `http://localhost:3000/contacts` - create a new contact. payload: `{ name: 'string', number: 'string' }`

* GET `http://localhost:3000/contacts/:number` - to get a specific contact details

* PUT `http://localhost:3000/contacts/:number` - to update a specific contact details. payload: `{ name: 'string', number: 'string' }`

* DELETE `http://localhost:3000/contacts/:number` - to delete a specific contact from list.
