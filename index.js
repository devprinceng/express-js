const express = require("express");

const app = express();
const PORT = 3000;

//parse request to json
app.use(express.json())

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



app.listen(3000, console.log(`Server running at Port ${PORT}`));