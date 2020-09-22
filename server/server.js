const PORT = "1337";
const express = require("express");
const app = express();

const fs = require('fs');
var movies = require('../movies.json');

app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
	next();
  });

app.use(express.json());

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.listen(PORT, (err) => {
	if (err) console.log("error", err);
	console.log(`> Running on localhost:${PORT}`);
});

app.route("/movies")
	.get((req, res) => {
		res.json(movies);
	})
	.post((req, res) => {
		req.body.id = Math.floor(Math.random()*99999)+1;

		movies.results.push(req.body);

		fs.writeFile('../movies.json', JSON.stringify(movies, null, 4), function writeJSON(err) {
			if (err) return console.log(err);
		})

		res.send('added movie');
	});	

app.route("/movies:id")
	.get((req, res) => {
		let movie = {};
		for(let i = 0; i < movies.results.length; i++){
			if(movies.results[i].id === Number(req.params.id)) {
				movie = movies.results[i];
				break;
			}
		}
		res.json(movie);
	})
	.put((req, res) => {
		for(let i = 0; i < movies.results.length; i++){
			if(movies.results[i].id === Number(req.params.id)) {
				movies.results[i] = req.body;			
				break;
			}
		}

		fs.writeFile('../movies.json', JSON.stringify(movies, null, 4), function writeJSON(err) {
			if (err) return console.log(err);
			console.log('updating movies.json');
		})

		res.send('Movie updated succesfully');
	});	