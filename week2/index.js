let express = require('express');
const portNumber = 4200;
let app = express();

app.use('/banana.html',errorRoute);
app.use('/testForm.html', errorRoute);
app.use(express.static(__dirname + '/public'));
app.use('/banana',bananaRoute);
app.use('/testForm', getProcessingTestForm);
app.use('/passTheFood', getData);
app.listen(portNumber, function(){

    console.log('Server Running!');
})

function bananaRoute(req, res, next){
    res.sendFile(__dirname + '/public/banana.html');
 }

function getProcessingTestForm(req, res){
    res.sendFile(__dirname+"/public/testForm.html");
}

function errorRoute(req, res, next){
    const error = new Error('Not valid url');
   res.send(error.message);
}

function getData(req, res){
    console.log(req.query);
    res.send("sending bck to get request");
}

app.get("/", requestHandler);

function requestHandler(req, res){
    console.log('hello');
    console.log(req);
    console.log(req.url);
    res.send("sent from server");
}

app.use("/cheese",cheeseHandler,[nextHandler]);

function cheeseHandler(req, res, next){
    console.log("in cheese");
    next()
}
function nextHandler(req, res){
    res.send("cheeeeese!!");
}

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.post("/aPostEndPoint", postRequestHandler);

function postRequestHandler(req, res) {
    res.send("post was sent");
    console.log(req.body);
}

// app.get('/bananas',function(req,res){
//    res.send("bananas were requested");

// })
// app.get('/bananas/fruit',function(req,res){
//     res.send("bananas and fruit were requested");
// })

// app.get('/fruit/veg/:vegValue/fruit/:fruitValue', function(req,res){
//     console.log(req.params);
//     res.send(req.params);
// })

// app.get('/fruits/peaches', (req, res) => {
//     res.send("hello peaches")
// })

// app.get('/fruits/watermelon', (req, res, next) => {
//     console.log("the response will be sent to the next function ...");
//     next()
//     }, (req,res) => {
//         res.send("Hello I'm a watermelon")
//     })

// function orangesFunction (req,res){
//     res.send("hello from oranges independent");
//     }
 
//   app.get('/fruits/oranges',(req, res,next) => {
//     console.log('the response will be sent by the next function again ...')
//     next()
 
//   },[orangesFunction])