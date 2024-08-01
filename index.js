const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const { render } = require("ejs");
const mongodb = require('mongodb');

//* connection url
let con_url = "mongodb://localhost:27017";
//* create client
const client = new mongodb.MongoClient(con_url);

//* test connection
client.connect()
.then(()=> console.log('Database Connection Successful'))
.catch((error) => console.log(error));

//parse request to json
app.use(express.json())
app.use(cookieParser());
// set view enginge
app.set("view engine", "ejs");

app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})

//create database instance
const db = client.db('SchoolDb');
//create collection
const students = db.collection('students')

//! insert data into students table;
app.post('/students', (req, res, next) => {
    const { name, regno, department, age, phone, email } = req.body;
    const student = students.insertOne({
        name,
        regno,
        department,
        age,
        phone,
        email
    })
    .then( () => res.status(201).send('Student Created Successfully'))
    .catch((error) => res.status(500).send(error.message));
});

//* insert data into students table;
app.post('/students/many', (req, res, next) => {
    //* register array of students in request body
    const student = students.insertMany(req.body)
    .then( () => res.status(201).send('Students Created Successfully'))
    .catch((error) => res.status(500).send(error.message));
});

//find students by regno; department or all students
app.get('/students/', (req, res) => {
    const regno = req.query.regno;
    const department = req.query.department;
    if (regno) {
        students.findOne({regno: regno.toUpperCase()})
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).send(error.message));
    }
    if (department) {
        students.find({department}).toArray()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).send(error.message));
    }
    else{
        students.find().toArray()
        .then((data) => res.status(200).json(data))
        .catch((error) => res.status(404).send(error.message));
    }
})
// update endpoint
app.put('/students', (req, res, next) => {
    const {email} = req.query;
    const {department, age} = req.body;
    students.findOneAndUpdate({email: email}, {$set: {department, age}}, {returnDocument: "after"})
        .then((data) => {
            console.log(data);
            res.status(200).json({message: "User Updated Successfuly", updatedStudent: data});
        })
        .catch((error) => {
            res.status(500).json({message: error.message});
        })
})
//! listen on server
app.listen(3000, console.log(`Server running at Port ${PORT}`));