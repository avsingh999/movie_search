		var express = require("express")
		var app = express()
		var request = require("request");
		app.set("view engine", "ejs");

		app.get("/", function(req, res){
			res.render("search");
		});
		app.get("/results", function(req, res){
			var url ="http://www.omdbapi.com/?s="+req.query.search+"&apikey=449939e9"
			request(url, function(error, response, body){
				if(!error && response.statusCode == 200){
					var data = JSON.parse(body);

					if (typeof(data["Search"]) == "undefined"){
						res.render("Not_found.ejs");
					}
					else{
						res.render("results",{data: data});
					}
				}
			})
		});


var port = process.env.PORT || 3000;
	app.listen(port, "0.0.0.0", function() {
			console.log("Listening on Port 3000");
	});