var app = require("express")();
var http = require("http").Server(app);
var io = require("socket.io")(http);

var fs = require("fs");
var request = require("request");
var cheerio = require("cheerio");

app.get("/", function(req, res){
	res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket){
	console.log("Someone connected.");
	socket.on("websiteURL", function(webURL){
		console.log(webURL);

		request(webURL, function(error, response, html){
			var $ = cheerio.load(html);

			var entireList = "";

			$('.statTitle').each(function(index){
				entireList += $(this).text();
				console.log($(this).text());
			});

			fs.appendFile("carTest.txt", entireList);

		});

	});	
});



http.listen(8080, function(){
	console.log("Listening on *:8080");
});