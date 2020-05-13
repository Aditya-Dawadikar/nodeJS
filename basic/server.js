var http=require('http');

function onRequest(request,response){
	response.writeHeader(200,{'Content-Type':'text/pain'});
	response.write('Hello World');
	response.write(' i just figured out how to run a server');
	response.end();
}

http.createServer(onRequest).listen(1270);