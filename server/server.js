const PORT = "1337";
const express = require("express");
const app = express();

app.get("/", function (req, res) {
	res.send("Hello World");
});

app.listen(PORT, (err) => {
	if (err) console.log("error", err);
	console.log(`> Running on localhost:${PORT}`);
});
