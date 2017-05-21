var debug = false; // easy way for testing
const handForTests = [
{
	"rank": "king",
	"suit": "spades" 
},
{
	"rank": "queen",
	"suit": "spades" 
},
{
	"rank": "10",
	"suit": "spades" 
},
{
	"rank": "jack",
	"suit": "spades" 
},
{
	"rank": "ace",
	"suit": "spades" 
}
];

/*const possibleRanks = ["2", "3", "4", "5", "6",
"7", "8", "9", "10", "jack", "queen", "king", "ace"];
const possibleSuits = ["hearts", "diamonds", "spades", "clubs"];
*/

const getRanksFromHand = hand => {
	const result = hand.map(card => {
		return card.rank.toLowerCase();
	});
	// console.log(`getRanksFromHand => ${result}`);
	return result;
};

const containNTimes = (rankName, ranksArray, numOfTimes) => {
	//simple error tracker
	if (ranksArray[0] === undefined) {
		console.log("containNTimes => error: Zero ranksArray");
		return false;
	}

	var result = ranksArray.reduce((acc, currName) => {
		// console.log('containNTimes: acc = ' + acc + ' currName = ' + currName);
		return acc + (currName === rankName ? 1 : 0);
	}, 0);

	return (result === numOfTimes) ? true : false;
};

const isHighCard = (hand) => {
	// Dummy function needed for reduce in checkHand function
	return true;
};

const hasPair = (hand) => {
	// One pair, or simply a pair, is a poker hand containing two cards of the
	// same rank and three cards of three other ranks (the kickers), such as
	// 4♥ 4♠ K♠ 10♦ 5♠ ("one pair, fours" or a "pair of fours"). It ranks
	// below two pair and above high card.

	const handRanks = getRanksFromHand(hand);
	return handRanks.some(rank => containNTimes(rank, handRanks, 2));
};

const hasTwoPairs = (hand) => {
	return true;
};

const hasThree = (hand) => {
	return true;
};

const hasStraight = (hand) => {
	return true;
};

const hasFlush = (hand) => {
	return true;
};

const haseFullHouse = (hand) => {
	return true;
};

const hasFour = (hand) => {
	return true;
};

const hasStraightFlush = (hand) => {
	return true;
};


const hasRoyalFlush = (hand) => {
	return true;
};

function checkHand(hand) {
	const allChecks = [
	{ "combinationName": "High Card", "checker": isHighCard },
	{ "combinationName": "One Pair", "checker": hasPair },
	{ "combinationName": "Two Pairs", "checker": hasTwoPairs },
	{ "combinationName": "3-of-a-Kind", "checker": hasThree },
	{ "combinationName": "Straight", "checker": hasStraight },
	{ "combinationName": "Flush", "checker": hasFlush },
	{ "combinationName": "Full House", "checker": haseFullHouse },
	{ "combinationName": "4-of-a-Kind", "checker": hasFour },
	{ "combinationName": "Straight Flush", "checker": hasStraightFlush },
	{ "combinationName": "Royal Flush", "checker": hasRoyalFlush }
	];

	if (debug) console.log(`Check on High Card => ${isHighCard(hand)}`);
	var result = allChecks.reduce((prevCheck, currCheck) => {
		if (debug) console.log(`Check on ${currCheck.combinationName} => ${currCheck.checker(hand)}`);
		return currCheck.checker(hand) ? currCheck : prevCheck;
	});

	return result.combinationName;
}

const printHand = (hand) =>{
	console.log('Printing hand...');
	hand.forEach(card => {
		const rank = card.rank[0].toUpperCase() + card.rank.slice(1);
		const suit = card.suit[0].toUpperCase() + card.suit.slice(1);
		console.log(`${rank} - ${suit}`);
	});
	console.log('==========================');
};

const testAllChecks = (hand) => {
	printHand(handForTests);
	console.log();
	console.log('Testing checker...');
	checkHand(handForTests);
	console.log('===========================');
};

if (!module.parent || debug) {
	debug = true; // if module starts directly then turn on debugging
	testAllChecks(handForTests);
}

// link on list of poker hands:
// https://en.wikipedia.org/wiki/List_of_poker_hands
// I do not use combination with a wild card
