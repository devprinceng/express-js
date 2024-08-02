const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const PORT = 3000;

//* connection url
const connectionUrl = 'mongodb://localhost:27017/SchoolDb';
mongoose.connect(connectionUrl).then( () => console.log('Database connection successful')).catch((error) => res.status(500).send(error.message));

//setup student Schema
StudentSchema = mongoose.Schema({
    name: String,
    regno: String,
    department: String,
    age: Number,
    phone: String,
    email: String,
});
//setup student model
Student = mongoose.model('student', StudentSchema);

const errorMiddleware = (error, req, res, next) => {
    res.status(500).send(error.message);
};
app.use(errorMiddleware);

//! listen on server
app.listen(3000, console.log(`Server running at Port ${PORT}`));