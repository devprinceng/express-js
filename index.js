const express = require("express");
const mongoose = require('mongoose');

const app = express();
app.use(express.json())
const PORT = 3000;

//* connection url
const connectionUrl = 'mongodb://localhost:27017/SchoolDb';
mongoose.connect(connectionUrl).then( () => console.log('Database connection successful')).catch((error) => console.log(error));

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

// read students
app.get('/students', async(req, res, next) => {
    try {
        const students = await Student.find();
        res.status(200).send(students);
    } catch (error) {
        res.status(500).send(error)
    }
    
})
// add student to database
app.post('/students/single', async (req, res, next) => {
    try {
        const { name, regno, department, age, phone, email } = req.body;

       const student = new Student({
            name,
            regno,
            department,
            age,
            phone,
            email
        });
        //save student
        await student.save()

        res.status(201).json({message: 'Student Created Successully', student})
    } catch (error) {
        res.status(500).send(error.message);
    }
})
//add multiple data
app.post('/students/multiple', async (req, res, next) => {
    try {
        const students = req.body; //array of students
        // console.log(students);
        const documents = await Student.insertMany(students);

        res.status(201).send(documents)
    } catch (error) {
        res.status(500).send(error);
    }
})
// find one and update
app.put('/students', async(req, res, next) => {
    try {
        const { email } = req.query;
        const { department } = req.body;
        //fnd and update
        const student = await Student.findOneAndUpdate({email}, {department}).then(() => res.status(200).send('Student Updated Successfully'));
    } catch (error) {
      res.status(500).send(error);
    }
})

// find by id
app.put('/students/:email', async(req, res, next) => {
    try {
        const { email } = req.params;
        const { department } = req.body;

        // const student= await Student.findById(id);
        const student= await Student.findOne({email});
        student.department = department;
        await student.save();

        res.status(200).send('Student Updated Successfully');
    } catch (error) {
      res.status(500).send(error);
    }
})

//error middleware
const errorMiddleware = (error, req, res, next) => {
    res.status(500).send(error.message);
};
app.use(errorMiddleware);

//! listen on server
app.listen(3000, console.log(`Server running at Port ${PORT}`));