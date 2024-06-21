const express = require("express");

const app = express();
const PORT = 3000;

//parse request to json
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/example', (req, res) => {
    let data = req.body;
    console.log(data);
});

app.get('/example', (req, res) => {
    res.send('This is GET method')
});

app.put('/example', (req, res) => {
    
    res.send('this is put method');
});

app.delete('/example', (req, res) => {
    
    res.send('this is delete method');
});

app.listen(3000, console.log(`Server running at Port ${PORT}`));