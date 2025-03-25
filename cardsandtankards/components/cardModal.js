import Card from "./card";
import { useState, useEffect } from "react";
import { parseDescription, CardKeyword, KeywordDescription, AbilityKeyword } from "../helpers/helperFunctions";

const CardModal = ({ closeModal, selectedCard }) => {
	const [displayKeywords, setDisplayKeywords] = useState([]);

	useEffect(() => {
		// Only proceed if selectedCard is not null
		if (!selectedCard) return;

		// Create an array to store the terms
		const allKeywords = [];

		// 2. Match and add terms from AbilityKeywords
		if (selectedCard.AbilityKeywords.length > 0) {
			selectedCard.AbilityKeywords.forEach((idx) => {
				const ability = AbilityKeyword[idx]; // Get ability from AbilityKeyword array by index
				allKeywords.push(ability); // Add to the array
			});
		}
		// 1. Match and add terms from the Description
		if (selectedCard.Description) {
			const matchedKeywords = parseDescription(
				selectedCard.Description,
				CardKeyword
			);
			allKeywords.push(...matchedKeywords); // Add to the array
		}

		// 3. Match and add terms from the Keywords field (with Show: true)
		if (selectedCard.Keywords && selectedCard.Keywords.length > 0) {
			selectedCard.Keywords.forEach(({ Keyword, Show }) => {
				if (Show) {
					const keyword = CardKeyword[Keyword];
					if (keyword) {
						allKeywords.push(keyword); // Add to the array
					}
				}
			});
		}

		const uniqueKeywords = new Set(allKeywords);

		// 4. Loop through Keywords again and remove Show: false keywords from the Set
		if (selectedCard.Keywords && selectedCard.Keywords.length > 0) {
			selectedCard.Keywords.forEach(({ Keyword, Show }) => {
				if (!Show) {
					const keyword = KeywordDescription[Keyword];
					if (keyword && uniqueKeywords.has(keyword)) {
						uniqueKeywords.delete(keyword); // Remove from the Set if Show is false
					}
				}
			});
		}

		// 5. Convert the Set back to an array and set the state
		setDisplayKeywords(Array.from(uniqueKeywords));
	}, []);
	// console.log(displayKeywords)
	// if (selectedCard.Keywords.length > 0) {
	// 	selectedCard.Keywords.map(({Keyword, Show}) => {
	// 		console.log(CardKeyword[Keyword], Show)
	// 	});
	// } else {console.log("no keywords")}
	// const cardType = CardType[selectedCard.CardType];
	// let cardSubType;
	// if (selectedCard.CardType === 0) {
	// 	cardSubType = CreatureType[selectedCard.CreatureType];
	// }
	// else if (selectedCard.CardType === 1) {
	// 	cardSubType = SpellType[selectedCard.SpellType];
	// }
	// else {
	// 	cardSubType = null;
	// }

	return (
		<div
			onClick={closeModal}
			className="fixed inset-0 bg-black/[.9] backdrop-blur-sm z-50 flex items-start py-28 sm:py-0 sm:items-center overflow-y-auto overflow-x-hidden"
		>
			<div className="relative mx-auto">
				<button
					onClick={closeModal}
					className="absolute cursor-pointer -top-20 inset-x-0 sm:inset-x-auto sm:-top-12 sm:-right-10 text-amber-500 text-4xl sm:text-5xl"
				>
					&times;
				</button>
				<div
					onClick={(e) => e.stopPropagation()}
					className="flex flex-col sm:flex-row sm:items-start gap-y-6 sm:max-w-screen-md sm:h-[60svh] overflow-y-auto sm:px-2 scrollbar"
				>
					<Card
						id={selectedCard.Id}
						name={selectedCard.Name}
						style="sm:max-w-sm xxl:max-w-md"
					/>

					<div className="text-white px-14 tracking-tight sm:px-0 sm:tracking-normal sm:max-w-xs xxl:max-w-sm">
						{selectedCard.Rarity === 3 && (
							<div className="border border-gray-600 py-2 px-3 rounded-lg mb-1.5">
								<h2 className="text-2xl sm:text-3xl font-bold">Legendary</h2>
								<p>{KeywordDescription.Legendary}</p>
							</div>
						)}
						{/* 
						{selectedCard.AbilityKeywords &&
							selectedCard.AbilityKeywords.map((idx) => {
								const ability = AbilityKeyword[idx];
								return (
									<div
										className="border border-gray-600 py-2 px-3 rounded-lg mb-1.5"
										key={idx}
									>
										<h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-x-2">
											<img
												className="w-8"
												src={`./media/pictures/${ability}.png`}
												onError={(e) => (e.target.style.display = "none")}
											/>
											{ability}
										</h2>
										<p>
											{KeywordDescription[ability]
												? KeywordDescription[ability]
												: "Description not available"}
										</p>
									</div>
								);
							})} */}

						{/* {selectedCard.Keywords &&
							selectedCard.Keywords.map(({ Keyword, Show }) => {
								if (!Show) return null;
								const ability = CardKeyword[Keyword];
								const formattedAbility = ability.replace(
									/([a-z])([A-Z])/g,
									"$1 $2"
								);
								const formattedDescription = KeywordDescription[ability]
									?.split("\n")
									.map((line, index) => <p key={index}>{line}</p>);
								return (
									<div
										className="border border-gray-600 py-2 px-3 rounded-lg mb-1.5"
										key={Keyword}
									>
										<h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-x-2">
											<img
												className="w-8"
												src={`./media/pictures/${ability}.png`}
												onError={(e) => (e.target.style.display = "none")}
											/>
											{formattedAbility}
										</h2>
										<div>
											{formattedDescription
												? formattedDescription
												: "Description not available"}
										</div>
									</div>
								);
							})} */}
						{displayKeywords.length > 0 &&
							displayKeywords.map((kw) => {
								const formattedKw = kw.replace(/([a-z])([A-Z])/g, "$1 $2");
								const formattedDescription = KeywordDescription[kw]
									?.split("\n")
									.map((line, index) => <p key={index}>{line}</p>);
								return (
									<div
										className="border border-gray-600 py-2 px-3 rounded-lg mb-1.5"
										key={kw}
									>
										<h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-x-2">
											<img
												className="w-8"
												src={`./media/pictures/${kw}.png`}
												onError={(e) => (e.target.style.display = "none")}
											/>
											{formattedKw}
										</h2>
										<div>
											{formattedDescription
												? formattedDescription
												: "Description not available"}
										</div>
									</div>
								);
							})}

						{selectedCard.CreatesTokens &&
							selectedCard.CreatesTokens.map((id) => {
								return (
									<div
										className="border border-gray-600 py-2 px-3 rounded-lg mb-1.5"
										key={id}
									>
										<Card id={id} style="h-68" />
									</div>
								);
							})}

						{selectedCard.Quote && (
							<div className="border border-gray-600 py-2 px-3 rounded-lg">
								<p className="italic">{selectedCard.Quote}</p>
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CardModal;
