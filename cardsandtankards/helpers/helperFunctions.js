import { useState, useEffect } from "react";

// ***************************************************************************
// CARD DATA
const FactionType = {
	0: "Neutral",
	1: "Auger Order",
	2: "Dungeon Master",
	3: "Wild Horde",
	4: "Plundering Guild",
};

const CardPackType = {
	0: "Core",
	1: "Tutorial",
	2: "Crusade of Sun and Stone",
	3: "Ashes of Ur-Enku",
};

const CardType = {
	0: "Creature",
	1: "Spell",
	3: "Bane",
	4: "Boon",
};

const CreatureType = {
	0: "General",
	1: "Master",
	2: "Underling",
	3: "Elemental",
	4: "Undead",
	5: "Noble",
	6: "Ooze",
	7: "Mercenary",
	8: "Crusader",
	9: "Nomad",
};

const SpellType = {
	0: "General",
	1: "Contract",
	2: "Ritual",
	3: "Enchantment",
};

const AbilityKeyword = {
	0: "Flight",
	1: "Loophole",
	2: "Multiblocker",
	3: "Armored",
	4: "Pacifist",
	5: "Ranged",
	6: "Restless",
	7: "Taunt",
	8: "Amped",
	9: "Mastery",
	10: "Suppressed",
	11: "Backlash",
	12: "Doomed",
	13: "Marked",
	14: "Stunned",
	15: "Quickstrike",
	16: "Unyielding",
	17: "Poisoned",
};

const CardKeyword = {
	0: "Amped",
	1: "Entrance",
	2: "Ranged",
	3: "Deathblow",
	4: "LastWord",
	5: "Mastery",
	6: "Activate",
	7: "Flight",
	8: "Mobilize",
	9: "Armored",
	10: "Multiblocker",
	11: "Unique",
	12: "Taunt",
	13: "Prepare",
	14: "Aftermath",
	15: "Loophole",
	16: "Pacifist",
	17: "Restless",
	18: "Fetch",
	19: "Plunder",
	20: "Duel",
	21: "Suppressed",
	22: "Outnumbered",
	23: "Discarded",
	24: "Innate",
	25: "PrimaryFactionZone",
	26: "Condition",
	27: "Enhance",
	28: "Enrage",
	29: "Backlash",
	30: "Shift",
	31: "Devotion",
	32: "Doomed",
	33: "Marked",
	34: "Stunned",
	35: "Quickstrike",
	36: "Unyielding",
	37: "Poisoned",
	38: "Banished",
	39: "Mobilized",
	40: "Reserved",
	41: "Blocked",
	42: "Blocking",
	43: "Attacking",
	44: "Sacrificed",
	45: "Wounded",
};

const KeywordDescription = {
	Innate:
		"Card type category which includes Spells and non-Token Creatures while excluding Tokens, Banes, and Boons.",
	Legendary:
		"A card of this rarity can only have one copy saved in a player's Deck.",
	Outnumbered: "There are more enemy combatants than friendly combatants.",
	Doomed:
		"When a card with Doomed would enter your Graveyard, Shift it to your Banish zone instead.",
	Marked:
		"A Combatant with Marked becomes part of a group of creatures which can be specifically targeted by various abilities.",
	Poisoned:
		"A Combatant with Poisoned takes 1 damage at the beginning of each player's turn.",
	Stunned: "A Combatant with Stunned cannot become unexhausted.",
	Suppressed:
		"A Combatant with Suppressed no longer has any other Attributes or Abilities and cannot gain new Attributes or Abilities.",
	Amped:
		"A Combatant with Amped is not Exhausted when entering the battlefield.",
	Armored:
		"A Combatant with Armored does not take damage the first time it's blocked each turn.",
	Backlash:
		"A combatant with Backlash always kills the enemy creature that killed it in battle.",
	Flight:
		"A Combatant with Flight can only be blocked by Combatants that have Flight or Ranged.",
	Loophole:
		"A Combatant with Loophole cannot be blocked by Combatants with a higher attack power.",
	Multiblocker:
		"A Combatant with Multiblocker can block two separate Combatants or the same Combatant twice.",
	Pacifist: "A Combatant with Pacifist is unable to attack.",
	Quickstrike:
		"A Combatant with Quickstrike deals damage first when blocked by non-Quickstrike Combatants.",
	Ranged: "A Combatant with Ranged can block Combatants that have Flight.",
	Taunt:
		"When able, a Combatant with Taunt must be blocked or targeted by the enemy first each turn.",
	Unyielding:
		"A Combatant with Unyielding will deal direct damage when attacking regardless of being blocked.",
	Duel: "Both Combatants deal damage equal to their attack power to one another outside of normal combat.",
	Fetch:
		"A player looks at the top 3 (modifier) Innate cards from their Deck and chooses X card(s) to add to their hand then shuffles the unchosen cards into the deck.",
	Mastery:
		"A player's first damaging spell deals X more damage by consuming their current Mastery until next turn.",
	PrimaryFactionZone:
		"Dungeon Master Zone: Graveyard\nWild Horde Zone: Reserves\nPlundering Guild Zone: Hand\nAugur Order Zone: Deck",
	Shift:
		"The act of moving a card or creature from one location or zone to another without triggering other abilities.",
	Restless:
		"A Combatant with Restless does not become Exhausted after attacking.",
	Mobilize:
		"Summons 1 random creature from a player's Reserves within a mana cost range of X targeting the highest mana costs first.",
	Plunder:
		"A player chooses one card to add to their hand from 3 randomly generated cards from any faction.",
	Activate:
		"Performs described ability and becomes exhausted when slammed on the head / selected and Activated.",
	Aftermath: "Performs described ability at the end of its controller's turn.",
	Deathblow:
		"Performs described ability after killing another creature in combat.",
	Devotion:
		"As long as your Deck, Hand, Graveyard, or Reserves never contained an Innate non-Primary Faction, non-Neutral card, the described ability is active.",
	Enhance: "Improve or add the described ability in exchange for Coins.",
	Enrage: "Performs described ability when a friendly creature dies.",
	Entrance: "Performs described ability after the creature is summoned.",
	Wounded: "Performs described ability when it takes damage from any source.",
	LastWord: "Performs described ability when the creature dies.",
	Prepare: "Performs described ability at the start of its controller's turn.",
	Attacking: "Performs described ability when it attacks.",
	Banished: "Performs described ability when the card enters the Banish Zone.",
	Blocked:
		"Performs described ability when blocked by another creature in combat.",
	Blocking:
		"Performs described ability when blocking another creature in combat.",
	Condition:
		"Contracts become active when this Condition is met, and are ended and sent to the Graveyard once this Condition is no longer met.",
	Wounded: "Performs described ability when it takes damage from any source.",
	Reserved:
		"Performs described ability after it is placed in Reserves through the Wild Horde Faction Mechanic.",
	Sacrificed: "Performs described ability when it is Sacrificed.",
	Discarded:
		"Performs described ability when this card is discarded for any reason.",
};
// ***************************************************************************

// debounce search
const Debounce = (value, delay) => {
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebouncedValue(value);
		}, delay);
		return () => {
			clearTimeout(handler);
		};
	}, [value, delay]);
	return debouncedValue;
};

// bold ability description text
// const BoldedText = ({ text }) => {
// 	// Regex to match words before ":"
// 	const regex = /(\b\w+(?:\s\w+)?)(:)/g;

// 	// split the text while retaining the matches
// 	const parts = [];
// 	let lastIndex = 0;
// 	text.replace(regex, (match, p1, p2, index) => {
// 		// push the text before the match
// 		if (index > lastIndex) {
// 			parts.push(text.slice(lastIndex, index));
// 		}
// 		// push the bolded word and colon
// 		parts.push(<strong key={index}>{p1}</strong>, p2);
// 		// update the last index
// 		lastIndex = index + match.length;
// 	});

// 	// push any remaining text after the last match
// 	if (lastIndex < text.length) {
// 		parts.push(text.slice(lastIndex));
// 	}
// 	return <span>{parts}</span>;
// };

// filter search terms w/debounce
const filterCards = (cards, debouncedSearchTerm = "", filter, manCostAndFactionOnly = false) => {
	return cards.filter((card) => {
		const matchesSearch =
			card.Name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
			card.Description.toLowerCase().includes(
				debouncedSearchTerm.toLowerCase()
			);

		const matchesManaCost = (() => {
			if (!filter.manaCost) {
				return true;
			} else if (filter.manaCost === "7+") {
				return card.ManaCost >= 7;
			} else {
				return card.ManaCost === Number(filter.manaCost);
			}
		})();

		const matchesFaction = filter.faction
			? card.FactionType === Number(filter.faction)
			: true;

		if (manCostAndFactionOnly) {
			return matchesManaCost && matchesFaction;
		}
		const matchesCardType = filter.cardType
			? card.CardType === Number(filter.cardType)
			: true;

		const matchesPackType = filter.packType.length
			? filter.packType.includes(card.CardPackType.toString())
			: true;

		const matchesSubtype = (() => {
			if (!filter.subType) {
				return true;
			}
			if (card.CardType === 0 && card.CreatureType !== undefined) {
				return card.CreatureType === Number(filter.subType);
			}
			if (card.CardType === 1 && card.SpellType !== undefined) {
				return card.SpellType === Number(filter.subType);
			}
			return true;
		})();

		return (
			matchesSearch &&
			matchesManaCost &&
			matchesFaction &&
			matchesCardType &&
			matchesSubtype &&
			matchesPackType
		);
	});
};

// returns all valid cards sorted by faction + ascending manaCost
const sortCards = (cards) => {
	const validCards = cards.AllCardDatas.filter((card) => card.Id);

	const factionOrder = [2, 3, 4, 1, 0];

	const sortedCards = [...validCards].sort((a, b) => {
		// sort by faction order
		const factionAIndex = factionOrder.indexOf(a.FactionType);
		const factionBIndex = factionOrder.indexOf(b.FactionType);
		if (factionAIndex !== factionBIndex) {
			return factionAIndex - factionBIndex;
		}

		// sort by ascending manaCost
		return a.ManaCost - b.ManaCost;
	});

	return sortedCards;
};

// **description parsing**
const parseDescription = (description) => {
	// List of possible keywords
	const keywords = Object.values(CardKeyword);

	// Split CamelCase into individual words
	const splitCamelCase = (str) => {
		return str.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
	};

	// Check if keyword is multi-word (CamelCased)
	const isMultiWord = (keyword) => /[A-Z].*[A-Z]/.test(keyword);

	// Separate multi-word (CamelCased) keywords for processing
	const multiWordKeywords = keywords.filter(isMultiWord).map((keyword) => ({
		original: keyword,
		words: splitCamelCase(keyword),
	}));

	// Split Description into an array of separate words
	const descriptionWords = description.match(/\b[\w]+(?:[:.])?\b/g) || [];

	// Clean trailing punctuation from words
	const cleanedDescriptionWords = descriptionWords.map((word) =>
		word.replace(/[.:]$/, "")
	);

	// Manual override for specific keywords
	const manualOverrides = {
		Mobilized: "Mobilize",
		Mark: "Marked",
	};

	// Apply manual overrides to cleanedDescriptionWords
	const adjustedDescriptionWords = cleanedDescriptionWords.map((word) => {
		// Apply manual override to matching words
		if (manualOverrides[word]) {
			return manualOverrides[word];
		}
		// If no override, return original word
		return word;
	});

	// Debug: description words after override
	// console.log(
	// 	"Adjusted Description after Override:",
	// 	adjustedDescriptionWords
	// );

	// Check if a keyword's words exist sequentially in the description
	const containsKeyword = (descriptionWords, keywordWords) => {
		for (let i = 0; i <= descriptionWords.length - keywordWords.length; i++) {
			let match = true;
			for (let j = 0; j < keywordWords.length; j++) {
				if (descriptionWords[i + j] !== keywordWords[j]) {
					match = false;
					break;
				}
			}
			if (match) return true;
		}
		return false;
	};

	// Check for multi-word matches
	const matchingMultiWordKeywords = multiWordKeywords.filter(({ words }) =>
		containsKeyword(adjustedDescriptionWords, words)
	);

	// Check for single-word matches in adjusted description words
	const matchingSingleWordKeywords = keywords.filter(
		(keyword) =>
			!isMultiWord(keyword) && adjustedDescriptionWords.includes(keyword)
	);

	// Combine results
	const matchingKeywords = [
		...matchingMultiWordKeywords.map(({ original }) => original),
		...matchingSingleWordKeywords,
	];

	// Debug: final list of matching keywords
	// console.log("Final Matching Keywords:", matchingKeywords);

	return matchingKeywords;
};

// const parseDescription = (description) => {
// 	const keywords = Object.values(CardKeyword);

// 	// Split CamelCase into individual words
// 	const splitCamelCase = (str) => {
// 		return str.replace(/([a-z])([A-Z])/g, "$1 $2").split(" ");
// 	};

// 	// Check if keyword is multi-word (CamelCased)
// 	const isMultiWord = (keyword) => /[A-Z].*[A-Z]/.test(keyword);

// 	// Separate multi-word (CamelCased) keywords
// 	const multiWordKeywords = keywords.filter(isMultiWord).map((keyword) => ({
// 		original: keyword,
// 		words: splitCamelCase(keyword),
// 	}));

// 	// Split Description into an array of separate words
// 	const descriptionWords = description.match(/\b[\w]+(?:[:.])?\b/g) || [];

// 	// Clean trailing punctuation from words
// 	const cleanedDescriptionWords = descriptionWords.map((word) =>
// 		word.replace(/[.:]$/, "")
// 	);

// 	console.log(cleanedDescriptionWords); // Debugging

// 	// Check if a keyword's words exist sequentially in the description
// 	const containsKeyword = (descriptionWords, keywordWords) => {
// 		for (let i = 0; i <= descriptionWords.length - keywordWords.length; i++) {
// 			let match = true;
// 			for (let j = 0; j < keywordWords.length; j++) {
// 				if (descriptionWords[i + j] !== keywordWords[j]) {
// 					match = false;
// 					break;
// 				}
// 			}
// 			if (match) return true;
// 		}
// 		return false;
// 	};

// 	// Check for multi-word matches
// 	const matchingMultiWordKeywords = multiWordKeywords.filter(({ words }) =>
// 		containsKeyword(cleanedDescriptionWords, words)
// 	);

// 	console.log("multi word:", matchingMultiWordKeywords); // Debugging

// 	// Check for single-word matches
// 	const matchingSingleWordKeywords = keywords.filter(
// 		(keyword) =>
// 			!isMultiWord(keyword) && cleanedDescriptionWords.includes(keyword)
// 	);

// 	// Combine results and return them
// 	const matchingKeywords = [
// 		...matchingMultiWordKeywords.map(({ original }) => original),
// 		...matchingSingleWordKeywords,
// 	];

// 	return matchingKeywords;
// };

// *******ENCODER / DECODER*******

// encoder base64
// const encode = (data) => {

// 	// group ID's by occurrences and convert 1,2,3 -> a,b,c
// 	const groups = { a: [], b: [], c: [] };

// 	for (let id in data) {
// 		const occurrence = data[id];
// 		if (occurrence === 1) {
// 			groups.a.push(id);
// 		} else if (occurrence === 2) {
// 			groups.b.push(id);
// 		} else if (occurrence === 3) {
// 			groups.c.push(id);
// 		}
// 	};

// 	// convert ID's to string with no spaces and leading group letter
// 	const aGroup = groups.a.join(",");
// 	const bGroup = groups.b.join(",");
// 	const cGroup = groups.c.join(",");

// 	// join groups with +
// 	const finalString = `a${aGroup}+b${bGroup}+c${cGroup}`;

// 	// convert to base64
// 	console.log(finalString)
// 	return btoa(finalString);
// };

export {
	Debounce,
	filterCards,
	sortCards,
	parseDescription,
	FactionType,
	CardType,
	CreatureType,
	SpellType,
	AbilityKeyword,
	CardKeyword,
	KeywordDescription,
	CardPackType,
};
