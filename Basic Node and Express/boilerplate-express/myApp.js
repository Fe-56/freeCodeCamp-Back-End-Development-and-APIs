require('dotenv').config();
const bodyParser = require('body-parser');

let express = require('express');
let app = express();

console.log("Hello World");

let handleURLencodedData = bodyParser.urlencoded({extended: false});

app.use("/public", express.static(__dirname + "/public")); // mounts the middleware express.static(); will be executed for all requests

app.use((req, res, next) => { // for every request, it logs to the console the string of the following format: method path - ip, i.e. GET /json - ::ffff::127.0.0.1
    let logged = `${req.method} ${req.path} - ${req.ip}`;
    console.log(logged);
    next(); // call next; if not, the server will be stuck forever
});

app.use(handleURLencodedData);

// serve the string "Hello Express" to GET requests matching the "/" (ROOT) path
app.get("/", (req, res) => {
    // res.send('Hello Express');
    res.sendFile(__dirname + "/views/index.html");
});

// simple API: responds with a JSON at the path /json
app.get("/json", (req, res) => {
    let message = "Hello json";
    messageStyle = process.env.MESSAGE_STYLE;

    if (messageStyle == "uppercase"){
        message = message.toUpperCase();
    }

    object = {"message": message};
    res.json(object);
});

app.get("/now", (req, res, next) => {
    req.time = new Date().toString();
    next();
}, (req, res) => {
    let object = {'time': req.time};
    res.json(object);
});

app.get("/:word/echo", (req, res) => {
    let echoWord = req.params.word; // gets whatever is in place at ":word"
    let object = {"echo": echoWord};
    res.json(object);
});

// app.get("/name", (req, res) => {
//     let firstName = req.query.first;
//     let lastName = req.query.last;
//     let object = {"name": `${firstName} ${lastName}`};
//     res.json(object);
// });

// app.post("/name", (req, res) => {
//     let firstName = req.body.first;
//     let lastName = req.body.last;
//     let object = {"name": `${firstName} ${lastName}`};
//     res.json(object);
// })

app.route("/name")
.get((req, res) => {
    let firstName = req.query.first;
    let lastName = req.query.last;
    let object = {"name": `${firstName} ${lastName}`};
    res.json(object);
})
.post((req, res) => {
    let firstName = req.body.first;
    let lastName = req.body.last;
    let object = {"name": `${firstName} ${lastName}`};
    res.json(object);
});

module.exports = app;
