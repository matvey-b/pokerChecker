var main = function () {
	$('#random-gen').on('click', () => 
					generateRandomTable());

	/////////// CHOOSE DIALOG ////////////////
	const $chooseDialog = $("#choose-dialog");
	const $chooseBtn = $("#choose-and-gen");
	const $closeBtn = $(".close");
	
	// Show dialog
	$chooseBtn.on("click", () => $chooseDialog.css("display", "block"));
	// Close dialog
	$closeBtn.on("click", () => $chooseDialog.css("display", "none"));
	// When the user clicks anywhere outside of the modal, close it
	$(window).on("click", event => {
		if ($(event.target)[0] == $chooseDialog[0]) {
			$closeBtn.trigger("click");
		}
	});

	// My checkboxes implementation
	const getCheckBoxesFromModalDialog = () => {
			return $(".modal-body .checker-on, .modal-body .checker-off");
		};

	const enableCheckBoxesFlashing = checkBoxesCollection => {
		const switchCheckBoxState = event => {
			$(event.target).toggleClass("checker-on checker-off");
		};
		checkBoxesCollection.on("click", switchCheckBoxState);
	};
	
	enableCheckBoxesFlashing(getCheckBoxesFromModalDialog());
	//////////////////////////////////////////
	

	console.log("App is working!!!");
	// console.log(getRandomHandArray());
};

// Get formatted card name str from card object
const getCardName = card => {
	const rank = card.rank[0].toUpperCase() + card.rank.slice(1);
	const suit = card.suit[0].toUpperCase() + card.suit.slice(1);
	return rank + ' of ' + suit;
};

function getRandomHandArray() {
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

// Checking cards combination on server
const getCombinationName = hand => {
	console.log('getCombName running...');
	const objectForPOST = {
		"msg": "Here is your Hand object!",
		"hand": hand
	};
	
	var result;
	
	if (objectForPOST.hand === undefined) {
		console.log("There is no Hand object!");
		result = "There is no Hand object!";
	} else {
		$.post("check_hand", objectForPOST, res => {
					result = res.combinationName;
					// console.log(result);
				});
		// console.log(x.responseJSON.combinationName);
	}
	return result;
};

// Update data on our gaming table
const updateCardTable = hand => {
	const updateCardContainers = () => {
		const updateCardContainerByIdx = (card, index) => {
			const $cardContainers = $(".cards-line div[class^=card]");
			const updateImage = () => {
				const $cardImg = $cardContainers.eq(index).children("img");
				const img_path = `images/${card.rank}_of_${card.suit}.png`;
				$cardImg.hide();
				$cardImg.attr("src", img_path);
				$cardImg.fadeIn(800);
			};
			const updateDescription = () => {
				const cardName = getCardName(card);
				$cardContainers.eq(index).children("p").text(cardName);
			};

			updateImage();
			updateDescription();
		};

		hand.forEach((card, index) => {
			updateCardContainerByIdx(card, index);
		});
	};

	var combName = getCombinationName(hand);
	const updateCombinationName = () => {
		console.log('updCombName running...');
		console.log(combName);
		// $(".combination-name h3").text(combName);
	};

	updateCardContainers();
	updateCombinationName();
};

// Main random generator function
const generateRandomTable = () => {
	const newHand = getRandomHandArray();
	updateCardTable(newHand);
};

$(document).ready(main);
