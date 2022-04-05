require('dotenv').config();
const express = require('express');
const massive = require('massive');
const session = require('express-session');
const controller = require('./controller');
const authController = require('./auth');
const app = express();
const cors = require('cors');
const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET
} = process.env;

app.use(express.json());
//Make sure to use the session secret in your .env file
//Eventually i plan to have a log in page that will allow you to log in and out
app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}));

//connect cors to route it through local host
app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true
}));
//Connect to the database thru massive
massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(db => {
    app.set('db', db);
    console.log('db connected');

}).catch(err => console.log(err));


//Endpoints
//register new user
app.post(`/auth/register`, authController.register);
//Create a new user
app.post('/form/users', controller.addUser);
//View all users
app.get(`/form/users`, controller.getUsers);
//View a single User by id
app.get(`/form/users/:id`, controller.getUserById);
//Update a user by id
app.put(`/form/users/:id`, controller.updateUser);
//Delete a user by id
app.delete(`/form/users/:id`, controller.deleteUser);



app.listen(SERVER_PORT, () => console.log(`don't switch that dail from...${SERVER_PORT}`));