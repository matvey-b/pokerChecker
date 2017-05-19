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
const isHighCard = (hand) => {
	// Dummy function needed for reduce in checkHand function
	// 
	return true;
};

const hasPair = (hand) => {
	// body...
	return true;
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
	
	var result = allChecks.reduce(function (prevCheck, currCheck) {
		return currCheck.checker(hand) ? currCheck : prevCheck;
	});

	return result.combinationName;
}

const printHand = (hand) =>{
	
};

const testAllChecks = (hand) => {
	console.log('Tested');
};

if (!module.parent) { 
	testAllChecks(handForTests); }

// link on list of poker hands:
// https://en.wikipedia.org/wiki/List_of_poker_hands
// I do not use combination with a wild card
