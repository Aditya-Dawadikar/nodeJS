var http= require('http');

var server= http.createServer(function(req,res){
	res.end('Server works');
});

server.listen(3000,function(){
	console.log("server started on port 3000");
});