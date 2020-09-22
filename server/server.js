const PORT = "1337";
const express = require("express");
const app = express();

const fs = require('fs');
var movies = require('../movies.json');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	next();
  });

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.listen(PORT, (err) => {
	if (err) console.log("error", err);
	console.log(`> Running on localhost:${PORT}`);
});

app.get("/movies", (req, res) => {
	res.json(movies);
});	

app.route("/movies:id")
	.get((req, res) => {
		let movie = {};
		for(let i = 0; i < movies.results.length; i++){
			if(movies.results[i].id === Number(req.params.id)) {
				console.log("found");
				movie = movies.results[i];
				break;
			}
		}
		res.json(movie);
	})
	.put((req, res) => {
		let movie = {};

		for(let i = 0; i < movies.results.length; i++){
			if(movies.results[i].id === Number(req.params.id)) {
				Object.keys(req.params).forEach( key => {
					movies.results[i][key] = req.params[key]
				})
				movie = movies.results[i];
				break;
			}
		}

		fs.writeFile('../movies.json', JSON.stringify(movies), function writeJSON(err) {
			if (err) return console.log(err);
			console.log('updating movies.json');
		})

		res.json(movie);
	});	