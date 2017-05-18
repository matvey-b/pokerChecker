var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// app.get('', function (req, res) {
// 	res.send('Hello World!');
// });
app.use(express.static(__dirname + '/../client')); // absolute path as recommends in express documentation
app.use(bodyParser.urlencoded());

app.post("/check_hand", function (req, res) {
	const receivedHand = req.body.hand;
	const receivedMsg = req.body.msg;
	// res.send("Request was received by the server!");
	res.json({"error": null, "combinationName" : "Not work yet!" });
	console.log(receivedMsg);
	console.log(receivedHand);
});

app.listen(3000, function () {
	console.log('Example app listening on port 3000!');
});
