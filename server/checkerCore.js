var debug = false; // easy way for testing
const handForTests = [
{
	"rank": "ace",
	"suit": "spades" 
},
{
	"rank": "2",
	"suit": "spades" 
},
{
	"rank": "4",
	"suit": "spades" 
},
{
	"rank": "6",
	"suit": "spades" 
},
{
	"rank": "king",
	"suit": "hearts" 
}
];

/*const possibleRanks = ["2", "3", "4", "5", "6",
"7", "8", "9", "10", "jack", "queen", "king", "ace"];
const possibleSuits = ["hearts", "diamonds", "spades", "clubs"];
*/

//////////// Helpers for checkers ////////////
const getRanksFromHand = hand => hand.map(card => card.rank.toLowerCase());

const getSuitsFromHand = hand => hand.map(card => card.suit.toLowerCase());

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


////////////  Checkers //////////////
const isHighCard = hand => {
	// Dummy function used in some in checkHand function
	return true;
};

const hasPair = hand => {
	// One pair, or simply a pair, is a poker hand containing two cards of the
	// same rank and three cards of three other ranks (the kickers), such as
	// 4♥ 4♠ K♠ 10♦ 5♠ ("one pair, fours" or a "pair of fours"). It ranks
	// below two pair and above high card.

	const namesOfRanks = getRanksFromHand(hand);
	return namesOfRanks.some(rank => containNTimes(rank, namesOfRanks, 2));
};

const hasTwoPairs = hand => {
	/*Two pair is a poker hand containing two cards of the same rank, two
	cards of another rank and one card of a third rank (the kicker), such as
	J♥ J♣ 4♣ 4♠ 9♥ ("two pair, jacks and fours" or "two pair, jacks over
	fours" or "jacks up").[18][26] It ranks below three of a kind and above
	one pair.*/

	var result = [];
	const namesOfRanks = getRanksFromHand(hand);

	namesOfRanks.forEach(rankName => {
		if (result.indexOf(rankName) === -1) {
			if (containNTimes(rankName, namesOfRanks, 2)) 
				result.push(rankName);
		}
	});

	return (result.length === 2) ? true : false;
};

const hasThree = hand => {
	/*Three of a kind, also known as trips or a set, is a poker hand
	containing three cards of the same rank and two cards of two other ranks
	(the kickers), such as 2♦ 2♠ 2♣ K♠ 6♥ ("three of a kind, twos" or "trip
	twos" or a "set of twos"). It ranks below a straight and above two pair.*/

	const namesOfRanks = getRanksFromHand(hand);
	return namesOfRanks.some(rank => containNTimes(rank, namesOfRanks, 3));
};

const hasStraight = hand => {
	/*A straight is a poker hand containing five cards of sequential rank, not
	all of the same suit, such as 7♣ 6♠ 5♠ 4♥ 3♥ (a "seven-high straight"). It
	ranks below a flush and above three of a kind.[7] As part of a straight,
	an ace can rank either above a king or below a two, depending on the rules
	of the game. Under high rules, an ace can rank either high (e.g. A♦ K♣ Q♣
	J♦ 10♠ is an ace-high straight) or low (e.g. 5♣ 4♦ 3♥ 2♥ A♠ is a five-high
	straight), but the ace cannot rank both high and low in the same hand (
	e.g. Q♠ K♠ A♣ 2♥ 3♦ is an ace-high high-card hand, not a straight).*/

	const ranksByIndices = ["ace", "2", "3", "4", "5", "6", "7", "8", "9",
	 		"10", "jack", "queen", "king"];

	const namesOfRanks = getRanksFromHand(hand);

	// getting sorted array of integers numbers from ranks for ariphmetic
	// processing in the future
	// In result all cards maps in [0..13] array of integers. 0 and 13 = 'ACE'.
	var ranksAsInt = namesOfRanks.map(rankName => 
			ranksByIndices.indexOf(rankName)).sort((a, b) => a < b ? -1 : 1);

	// if namesOfRanks has 'ACE', we need add his duplicate at the end
	// of integers array. Because 'ACE' === 0 and 13 at the same time.
	if (ranksAsInt.indexOf(0) === 0) ranksAsInt.push(13);

	// if elem5 - elem1 in sorted unique sequence = 4 (e.g.: 2,3,4,5,6), then 
	// it has Straight.
	// if sequence has 'ACE', then we need to process 1,5 and 2,6 elements.
	// (e.g. ACE, 2, 3, 4, 5 or 10, JACK, QUEEN, KING, ACE)
	const hasDuplicates = ranksAsInt.some((elem, idx, array) => {
		return array.slice(idx + 1).includes(elem);
	});
	if (hasDuplicates) return false;

	if (ranksAsInt.length === 5) {
		return ((ranksAsInt[4] - ranksAsInt[0]) === 4) ? true : false;
	} else {
		return (ranksAsInt[4] - ranksAsInt[0] === 4 ||
			ranksAsInt[5] - ranksAsInt[1] === 4) ? true : false;
	}
};

const hasFlush = hand => {
	/*A flush is a poker hand containing five cards all of the same suit, not
	all of sequential rank, such as K♣ 10♣ 7♣ 6♣ 4♣ (a "king-high flush" or
	"king-ten-high flush").[20] It ranks below a full house and above a
	straight.*/

	const namesOfSuits = getSuitsFromHand(hand);
	const firstSuitName = namesOfSuits[0];
	return namesOfSuits.every(currSuitName => currSuitName === firstSuitName);
};

const hasFullHouse = hand => {
	/*A full house, also known as a full boat or tight[citation needed] (and
	originally called a full hand), is a poker hand containing three cards of
	one rank and two cards of another rank, such as 3♣ 3♠ 3♦ 6♣ 6♥ (a "full
	house, threes over sixes" or "threes full of sixes" or "threes
	full"). It ranks below four of a kind and above a flush.*/
	
	var result = false;
	const namesOfRanks = getRanksFromHand(hand);
	var rankOfThree = '';

	// getting name of rank included in 3-of-a-kind combination
	namesOfRanks.some(rankName => {
		if (containNTimes(rankName, namesOfRanks, 3)) {
			rankOfThree = rankName;
			return true;
		}
	});

	// If we have Trip combination the we finding pair.
	// If it there then result = true and we have FullHouse
	namesOfRanks.some(rankName => {
		if (rankOfThree !== '' && rankName !== rankOfThree && 
			containNTimes(rankName, namesOfRanks, 2)) {
			result = true;
			return true;
		}
	});

	return result;
};

const hasFour = hand => {
	/*Four of a kind, also known as quads, is a poker hand containing four
	cards of the same rank and one card of another rank (the kicker), such as
	9♣ 9♠ 9♦ 9♥ J♥ ("four of a kind, nines"). It ranks below a straight flush
	and above a full house.*/

	const namesOfRanks = getRanksFromHand(hand);
	return namesOfRanks.some(rank => containNTimes(rank, namesOfRanks, 4));
};

const hasStraightFlush = hand => {
	/*A straight flush is a poker hand containing five cards of sequential
	rank, all of the same suit, such as Q♥ J♥ 10♥ 9♥ 8♥ (a "queen-high
	straight flush").[4] It ranks below five of a kind and above four of a
	kind.[7] As part of a straight flush, an ace can rank either above a king
	or below a two, depending on the rules of the game. Under high rules, an
	ace can rank either high (e.g. A♥ K♥ Q♥ J♥ 10♥ is an ace-high straight
	flush) or low (e.g. 5♦ 4♦ 3♦ 2♦ A♦ is a five-high straight flush), but
	cannot rank both high and low in the same hand (e.g. Q♣ K♣ A♣ 2♣ 3♣ is an
	ace-high flush, not a straight flush).*/
	
	return hasStraight(hand) && hasFlush(hand);
};


const hasRoyalFlush = hand => {
	/*An ace-high straight flush, such as A♦ K♦ Q♦ J♦ 10♦, is commonly known
	as a royal flush or royal straight flush and is the best possible hand in
	high games when not using wild cards. A five-high straight flush, such as
	5♥ 4♥ 3♥ 2♥ A♥, is otherwise known as a steel wheel and is significant in
	ace-to-five high-low split games for being both the best low hand and
	usually the best high hand of the showdown.*/

	if (hasStraightFlush(hand)) {
		const namesOfRanks = getRanksFromHand(hand);
		return namesOfRanks.includes('10') && namesOfRanks.includes('ace');
	} else return false;

};

function checkHand(hand) {
	// manually create array with all checks and combination names
	const allChecks = [
	{ "combinationName": "Royal Flush", "checkFunc": hasRoyalFlush },
	{ "combinationName": "Straight Flush", "checkFunc": hasStraightFlush },
	{ "combinationName": "4-of-a-Kind", "checkFunc": hasFour },
	{ "combinationName": "Full House", "checkFunc": hasFullHouse },
	{ "combinationName": "Flush", "checkFunc": hasFlush },
	{ "combinationName": "Straight", "checkFunc": hasStraight },
	{ "combinationName": "3-of-a-Kind", "checkFunc": hasThree },
	{ "combinationName": "Two Pairs", "checkFunc": hasTwoPairs },
	{ "combinationName": "One Pair", "checkFunc": hasPair },
	{ "combinationName": "High Card", "checkFunc": isHighCard }
	];

	// test on all checks, until not get true from one of them
	var result;
	allChecks.some(checkerObject => {
		const currCheckResult = checkerObject.checkFunc(hand);
		const currCombinationName = checkerObject.combinationName;
		if (debug) console.log(`Check on ${currCombinationName}  => ${currCheckResult}`);
		if (currCheckResult) {
			result = currCombinationName;
			return true; // brake poin for 'some()'
		}
	});

	return result;
}

const printHand = hand =>{
	console.log('Printing hand...');
	hand.forEach(card => {
		const rank = card.rank[0].toUpperCase() + card.rank.slice(1);
		const suit = card.suit[0].toUpperCase() + card.suit.slice(1);
		console.log(`${rank} - ${suit}`);
	});
	console.log('==========================');
};

const testAllChecks = hand => {
	printHand(handForTests);
	console.log();
	console.log('Testing checker...');
	console.log('Checker return => ' + checkHand(handForTests));
	console.log('===========================');
};

if (!module.parent || debug) {
	debug = true; // if module starts directly then turn on debugging
	testAllChecks(handForTests);
}

// link on list of poker hands:
// https://en.wikipedia.org/wiki/List_of_poker_hands
// I do not use combination with a wild card
