//import the Express library
const express = require('express');
const fs = require('fs');
const static = require('node-static');
const WebSocket = require('ws');
const portNumber = 4200;
const imageDataURI = require('image-data-uri')
let app = express(); 
let server = require('http').createServer(app);  
const wss = new WebSocket.Server({server});

app.use(express.static(__dirname+'/public'));
app.use('/wsc', wscClientRoute)

function wscClientRoute(req, res, next){
    res.sendFile(__dirname + '/public/ws.html');
}

// Default route
app.get('/', function(req, res){
  res.send('<h1>Hello world</h1>');
});
 
// Make server listen for incoming messages
server.listen(portNumber, function(){
  console.log('listening on port:: '+portNumber);
})

// IMPLEMENT THE BROADCAST FUNCTION TO ALL
wss.broadcast = function broadcast(data) {
  //get all clients (note that the Socket server instance does maintain a list of clients)
  wss.clients.forEach(function each(client) {
      //if client is there
      if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(data));
      }
  });
};

wss.on('connection', function connection(ws,req){
  const in_ip = req.socket.remoteAddress;
  console.log("Client connected"+ in_ip);
  
  ws.on("message", function incoming(message){

    let messageJson = JSON.parse(message);
    // console.log(messageJson);

    if (messageJson.eventName === "default") {
      console.log("DEFAULT");
      console.log(messageJson.payload);

    }
    if (messageJson.eventName === "stringLabel") {
        console.log("STRING");
        console.log(messageJson.payload);
        wss.clients.forEach(function each(client) {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
                  client.send(JSON.stringify(jsonParse.payload));
             }
         });

    }
    if (messageJson.eventName === "jsonLabel") {
        console.log("JSON");
        console.log(messageJson.payload.text);
        wss.broadcast(messageJson.payload);

    } 
    if (messageJson.eventName === "fileLabel") {
      console.log('fileLabel');
      let decodedFile = imageDataURI.decode(messageJson.payload.fileData);
        fs.writeFile(messageJson.payload.fileName, decodedFile.dataBuffer, function (err) {
          if (err) throw err;
          console.log('File saved.')
        });
      }
   });
   
    let jsonSend = {
      type: "message",
      text: "test message from server",
    };

    ws.send(JSON.stringify(jsonSend));
})
