const app = require('express')();
const http = require('http').createServer(app);
const io=require('socket.io')(http,{cors:{origins:[
    'http://localhost:3000'
]}})

app.get('/', (req, res) => {
  res.send('<h1>socket and express js</h1>');
});

io.on("connection",(socket)=>{
    const token=socket.handshake.auth.token;
         console.log(token?'user connected with token'+token:"one user connected");
         socket.on("disconnect",()=>{
            console.log("user disconnected")
        })
        socket.on("myCustomEvent",(msg)=>{
        console.log("message from client event: myCustomEvent",msg)
            io.emit("broadcast",'server:'+msg);
        })
})

http.listen(3001, () => {
  console.log('listening on *:3001');
});