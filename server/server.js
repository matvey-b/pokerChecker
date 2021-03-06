var debug = false;

var express = require('express');
var bodyParser = require('body-parser');
var pokerChecker = require('./checkerCore.js');
var app = express();


// app.get('', function (req, res) {
// 	res.send('Hello World!');
// });
app.use(express.static(__dirname + '/../client')); // absolute path as recommends in express documentation
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/get_comb_name", function (req, res) {
	const receivedHand = req.body.hand;
	const receivedMsg = req.body.msg;
	const combinationName = pokerChecker.getCombinationName(receivedHand);
	res.json({"error": null, "combinationName": combinationName });
	if (debug) {
		console.log(receivedMsg);
		console.log(receivedHand);
	}
});

app.post("/get_hand_from_comb", (req, res) => {
	var resJSON = {"error": null};
	const combNames = req.body.combNames;
	resJSON.hand = pokerChecker.getHandFromCombinations(combNames);
	res.json(resJSON);
});

app.listen(3000, function () {
	console.log('pokerChecker backend listening on port 3000!');
});
