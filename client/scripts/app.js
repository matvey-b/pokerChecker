var main = function () {
	console.log("App is working!!!");
	console.log(getRandomCard());
};

const possibleRanksArray = ["2", "3", "4", "5", "6",
"7", "8", "9", "10", "jack", "queen", "king", "ace"];
const possibleSuitsArray = ["hearts", "diamonds", "spades", "clubs"];

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min)) + min;
}

function getRandomCard() {
	var result = {};
	result.rank = possibleRanksArray[getRandomInt(0, 
		possibleRanksArray.length)];
	result.suit = possibleSuitsArray[getRandomInt(0,
		possibleSuitsArray.length)];
	return result;
}

$(document).ready(main);
