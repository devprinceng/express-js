const express = require("express");
const app = express();
const PORT = 3000;
const cookieParser = require('cookie-parser');
const { render } = require("ejs");
// create student subroute
let students = express.Router();

//parse request to json
app.use(express.json())
app.use(cookieParser());
// set view enginge
app.set("view engine", "ejs");
//middleware
const middleware1 = (req, res, next) => {
    console.log('Middleware One');
    next()
}
// use middleware
app.use(middleware1)  ;

app.get('/', (req, res) => {
    res.render('pages/index.ejs')
})

app.get('/test', (req, res) => {
    res.render('test.ejs', {
        name: 'Dev Prince NG'
    })
})

app.get('/example',(req, res) =>{
    res.format({
        'text/plain': ()=>{
            res.send('hello world')
        },
        'text/html' : ()=> {
            res.render('pages/index.ejs')
        },
        'application/json': ()=> {
            res.send({
                name: "Dev Prince NG",
                email: "devprinceng@gmail.com"
            })
        },
        default: () => {
            res.send('Nothing Matched')
        }
    })
})

app.listen(3000, console.log(`Server running at Port ${PORT}`));