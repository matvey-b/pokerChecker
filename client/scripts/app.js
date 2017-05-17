var main = function () {
	var createdHand;

	// Create Hand by Random Generating
	$("#generateHand").on("click", () => {
		createdHand = getRandomHand();
		for (var i = 0; i < createdHand.length; i++) {
			const cardId = 'div #card' + i;
			$(cardId).hide();
			$(cardId + ' .rank').text(createdHand[i].rank);
			$(cardId + ' .suit').text(createdHand[i].suit);
			$(cardId).fadeIn();
		}
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
