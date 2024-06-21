const express = require("express");

const app = express();
const PORT = 3000;
// create student subroute
let students = express.Router();

//parse request to json
app.use(express.json())

//use student route
app.use('/students', students)

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/example/:userId', (req, res) => {
    let { userId } = req.params;
    let { name, role } = req.query;
    
    console.log("name:", name);
    console.log("role:", role);

    res.send(`User ID:  ${ userId }`);
});

// test students subroute and retrieve path, base url, details etc
students.get('/example/', (req, res) => {
    console.log('base url:', req.baseUrl);
    console.log('original url:', req.originalUrl);
    console.log('path:', req.path);

    res.send('This is student get route');
});


app.listen(3000, console.log(`Server running at Port ${PORT}`));