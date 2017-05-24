var main = function () {
	var newCreatedHand; // oject of new generated Hand

	// Create Hand by Random Generating
	const generateHandBtn = $("#generateHand");
	generateHandBtn.on("click", () => {
		newCreatedHand = getRandomHand();
		for (var i = 0; i < newCreatedHand.length; i++) {
			const cardId = '#card' + i;
			$(cardId).hide();
			$(cardId + ' .rank').text(newCreatedHand[i].rank);
			$(cardId + ' .suit').text(newCreatedHand[i].suit);
			$(cardId).fadeIn();
		}
	});

	// Send on server for checking cards combination
	const checkHandBtn = $("button#checkHand"); 
	checkHandBtn.on("click", () => {
		const objectForPOST = {
			"msg": "Here is your Hand object!",
			"hand": newCreatedHand
		};
		if (objectForPOST.hand === undefined) {
			console.log("There is no Hand object!");
		} else {
			$.post("check_hand", objectForPOST, function (res) {
				console.log(res);
				const $combNameField = $("#combinationName");
				$combNameField.hide();
				$combNameField.text(res.combinationName);
				$combNameField.fadeIn();
			});
		}
	});

	// Generate and send to check in one action
	$("#generateAndCheck").on("click", () => {
		generateHandBtn.trigger("click");
		checkHandBtn.trigger("click");
	});
	
	console.log("App is working!!!");
	// console.log(getRandomHand());
};

function getRandomHand() {
	var result = [];

	const possibleRanks = ["2", "3", "4", "5", "6",
	"7", "8", "9", "10", "jack", "queen", "king", "ace"];
	const possibleSuits = ["hearts", "diamonds", "spades", "clubs"];

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	}

	function getRandomCard() {
		var result = {};
		result.rank = possibleRanks[getRandomInt(0, possibleRanks.length)];
		result.suit = possibleSuits[getRandomInt(0, possibleSuits.length)];
		return result;
	}

	function iter(generatedCard) {
		function isEqualToGeneratedCard(card) {
			const hasEqualSuit = card.suit === generatedCard.suit ?
			true : false;
			const hasEqualRank = card.rank === generatedCard.rank ?
			true : false;
			return hasEqualSuit && hasEqualRank;
		}
		if (result.length < 5) {
			const countOfEqualToGeneratedCard =
				result.filter(isEqualToGeneratedCard).length;
			if (countOfEqualToGeneratedCard === 0) {
				result.push(generatedCard);
				iter(getRandomCard());
			} else {
				iter(getRandomCard());
			}
		}
	}
	iter(getRandomCard());
	return result;
}

$(document).ready(main);
