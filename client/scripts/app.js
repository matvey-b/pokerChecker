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

	// Get hand from combinations
	const $getHandFromCombBtn = $("#find-appropriate-hand");
	$getHandFromCombBtn.on("click", () => getHandFromCombinations());

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
};

// Get formatted card name str from card object
const getCardName = card => {
	const rank = card.rank[0].toUpperCase() + card.rank.slice(1);
	const suit = card.suit[0].toUpperCase() + card.suit.slice(1);
	return rank + ' of ' + suit;
};

// Show loading dialog
const showLoadingDialog = () => {
		$("body").addClass("on-loading");
	};

// Hide loading dialog
const hideLoadingDialog = () => {
	$("body").removeClass("on-loading");
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

	const updateCombinationName = () => {
		/*On moment when i write this code, i don't understand how can use
		$.post as handler for 'setName' func and not vice versa.
		If i try implement data requesting, like that:
		const getCombName = hand => {
			const requestData = {
				"msg" : "Hello from client!",
				"hand" : hand
			};
			var result;
			$.post("get_comb_name", requestData, res => {
				result = res.combName; 
			});
			return result;
		}
		then in 'result' i get just undefined..
		It's going on cuz $.post method is asynchronous. And how it work, i still not fully understand.
		Now i just use setName as handler for $.post method.
		*/
		const setName = response => {
			// Callback handler for $.post
			const combName = response.combinationName;
			$(".combination-name h3").text(combName);
		};

		const requestDataFromSrv = () => {
			const requestData = {
				"msg" : "Hello from client!",
				"hand" : hand
			};
			$.post("get_comb_name", requestData, setName);
		};

		requestDataFromSrv();
	};

	updateCardContainers();
	updateCombinationName();
}; // end updateCardTable

// Main random generator function
const generateRandomTable = () => {
	const newHand = getRandomHandArray();
	updateCardTable(newHand);
};

// Generating hand from combinations names
const getCombNames = () => {
	const chkBoxToCombNamesDict = {
		"high-card-sel": "High Card",
		"pair-sel": "One Pair",
		"two-pair-sel": "Two Pairs",
		"three-sel": "3-of-a-Kind",
		"straight-sel": "Straight",
		"flush-sel" : "Flush",
		"full-house-sel": "Full House",
		"four-sel": "4-of-a-Kind",
		"straight-flush-sel": "Straight Flush",
		"royal-straight-flush-sel": "Royal Flush"
	};
	var combNames = [];
	const $turnedOnCheckBoxes = $(".modal-body .checker-on");
	$turnedOnCheckBoxes.each(index => {
		const chkBoxName = $turnedOnCheckBoxes.eq(index).attr("id");
		combNames.push(chkBoxToCombNamesDict[chkBoxName]);
	});
	return combNames;
};

const getHandFromCombinations = () => {
	const closeModalDialog = () => {
		const $closeBtn = $(".close");
		$closeBtn.trigger("click");
	};

	const applyResult = response => {
		const hand = response.hand;
		closeModalDialog();
		hideLoadingDialog();
		updateCardTable(hand);
	};

	const requestDataFromSrv = combNames => {
		const requestData = {
			"combNames" : combNames
		};
		showLoadingDialog();
		$.post("get_hand_from_comb", requestData, applyResult);
	};
	const combNames = getCombNames();
	if (combNames.length !== 0) {
		// send request only if user select one or more combinations
		requestDataFromSrv(combNames);
	}
};

$(document).ready(main);
