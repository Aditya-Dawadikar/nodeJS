var fs= require('fs');

fs.writeFile('./hello.txt',"hey man!",function(err){
	if(!err){
		fs.readFile('./hello.txt',function(err,data){
			if(!err){
				console.log(data.toString());
			}
		});
	}
});