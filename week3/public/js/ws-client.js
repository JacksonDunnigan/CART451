window.onload = function () {
  console.log("client js loaded in ws example");
  let myID = Date.now();
  document.getElementById("willPut").innerHTML = myID;

  let ws = new WebSocket("ws://localhost:4200");
  ws.onopen = function(){
    ws.send(JSON.stringify({ eventName: 'default', payload: `Sending a Message from ${myID}` }));
    //2: when we receive something
    ws.onmessage = function (event) {
      let receivedMsg = JSON.parse(event.data);
  
      console.log("Message is received..." + receivedMsg);
      document.getElementById("response").innerHTML = receivedMsg.text;
    };
  }
  ws.onclose = function(){
    console.log("connection closed")
  }
  document.querySelectorAll(".sendItem").forEach(
    function(item){
      item.addEventListener("click", function(){
        ws.send(JSON.stringify({ eventName: 'stringLabel', payload: `Sending a Message from ${myID} with message: ${this.getAttribute("data-send")}` }));
      })
    });


  document.querySelectorAll(".sendItemJ").forEach(
    function(item){
      item.addEventListener("click", function(){
        let msg = {
          type: "message",
          text: this.getAttribute("data-send"),
          id: myID
        }
        ws.send(JSON.stringify({ eventName: 'jsonLabel', payload: msg }));     

      })
    })

    const input = document.querySelector('input[type=file]');
    input.addEventListener("change", function (){
      let file = input.files[0];
      
      const reader = new FileReader();
 
      //using the FILE READER API
      reader.addEventListener("load", () => {
        // convert image file to base64 string
        console.log(reader.result)
        ws.send(JSON.stringify({ eventName: 'fileLabel', payload: { fileName: file.name, fileType: file.type, fileData: reader.result }}));
 
      }, false);
 
      if (file) {
        reader.readAsDataURL(file);
      }
      
      //ws.send(JSON.stringify({ eventName: 'fileLabel', payload: { fileName: file.name, fileType: file.type }}));
      // ws.send(file);
    })
  }
