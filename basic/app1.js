var http = require('http');
var events= require('events');

var eventEmitter = new events.EventEmitter();



var server= http.createServer(function(req,res){
	eventEmitter.emit('someEvent');//event trigger
	res.end("server works");
});


eventEmitter.on('someEvent',function(){
	console.log('a request was made');
})

server.listen(3000,function(){
	console.log("server started on port 3000");
});