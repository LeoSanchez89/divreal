import Card from "./card";
import { useState, useEffect } from "react";
import {
	parseDescription,
	CardKeyword,
	KeywordDescription,
	AbilityKeyword,
} from "../helpers/helperFunctions";

const CardModal = ({ closeModal, selectedCard }) => {
	const [displayKeywords, setDisplayKeywords] = useState([]);
	const [showAnimation, setShowAnimation] = useState(false);

	// Handle keyword parsing
	useEffect(() => {
		if (!selectedCard) return;

		// Create a Set to store unique terms
		const uniqueKeywords = new Set();

		// Match and add terms from AbilityKeywords
		if (selectedCard.AbilityKeywords.length > 0) {
			selectedCard.AbilityKeywords.forEach((idx) => {
				const ability = AbilityKeyword[idx]; // Get ability from AbilityKeyword array by index
				if (ability) uniqueKeywords.add(ability); // Add to the set
			});
		}

		// Match and add terms from Description
		if (selectedCard.Description) {
			const matchedKeywords = parseDescription(selectedCard.Description);
			matchedKeywords.forEach((keyword) => uniqueKeywords.add(keyword)); // Add matched keywords to the set
		}

		// Check for overrides (add & remove keywords)
		if (selectedCard.Keywords?.length) {
			selectedCard.Keywords.forEach(({ Keyword, Show }) => {
				const keyword = CardKeyword[Keyword];
				if (keyword && keyword !== "Mobilized") {
					if (Show) {
						uniqueKeywords.add(keyword);
					} else {
						uniqueKeywords.delete(keyword);
					}
				}
			});
		}

		// Convert the Set back to an array and set the state
		setDisplayKeywords(Array.from(uniqueKeywords));
	}, [selectedCard]);

	// Animate modal
	useEffect(() => {
		if (selectedCard) {
			setShowAnimation(true);
		}
	}, [selectedCard]);

	// Esc closes modal
	useEffect(() => {
		const handleEsc = (e) => {
			if (e.key === "Escape") handleClose();
		};
		window.addEventListener("keydown", handleEsc);
		return () => window.removeEventListener("keydown", handleEsc);
	}, [selectedCard]);

	const handleClose = () => {
		setShowAnimation(false);
		setTimeout(() => {
			closeModal();
		}, 300); // match transition duration
	};

	if (!selectedCard) return null;

	return (
		<div
			onClick={handleClose}
			className="fixed inset-0 bg-black/[.85] backdrop-blur-sm z-50 flex items-start py-28 sm:py-0 sm:items-center overflow-y-auto overflow-x-hidden"
		>
			<div
				onClick={(e) => e.stopPropagation()}
				className={`relative mx-auto sm:bg-neutral-100 sm:rounded-sm transition-all duration-300 ease-in-out
          ${showAnimation ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
			>
				{/* Close button */}
				<button
					onClick={handleClose}
					className="absolute -top-20 inset-x-0 sm:inset-x-auto sm:-top-14 sm:-right-10 text-amber-600 text-4xl sm:text-5xl hover:cursor-pointer"
				>
					&times;
				</button>
				{/* Modal content */}
				<div className="flex flex-col sm:flex-row sm:items-start gap-y-6 sm:max-w-screen-md sm:max-h-[32rem] overflow-y-auto sm:pr-12 sm:pl-4 sm:py-14 sm:-ml-4 scrollbar">
					<Card
						id={selectedCard.Id}
						name={selectedCard.Name}
						style="sm:max-w-sm xxl:max-w-md sm:ml-2"
					/>
					{/* Parsed keywords */}
					<div className="text-white px-14 tracking-tight sm:px-0 sm:tracking-normal sm:max-w-xs xxl:max-w-sm sm:-ml-4">
						{selectedCard.Rarity === 3 && (
							<div className="bg-black py-2 px-3 rounded-lg mb-1.5 border border-neutral-700">
								<h2 className="text-2xl sm:text-3xl font-bold">Legendary</h2>
								<p>{KeywordDescription.Legendary}</p>
							</div>
						)}

						{displayKeywords.length > 0 &&
							displayKeywords.map((kw) => {
								const formattedKw = kw.replace(/([a-z])([A-Z])/g, "$1 $2");
								const formattedDescription = KeywordDescription[kw]
									?.split("\n")
									.map((line, index) => <p key={index}>{line}</p>);
								const showIcon =
									kw !== "Mastery" &&
									Object.values(AbilityKeyword).includes(kw);

								return (
									<div
										className="bg-black py-2 px-3 rounded-lg mb-1.5 border border-neutral-700"
										key={kw}
									>
										<h2 className="text-2xl sm:text-3xl font-bold flex items-center gap-x-2">
											{showIcon && (
												<img
													className="w-6 sm:w-8"
													src={`./media/pictures/${kw}.png`}
													onError={(e) => (e.target.style.display = "none")}
												/>
											)}
											{formattedKw || "Description not available"}
										</h2>
										<div>
											{formattedDescription || "Description not available"}
										</div>
									</div>
								);
							})}

						{selectedCard.CreatesTokens &&
							selectedCard.CreatesTokens.map((id) => (
								<div
									className="bg-black py-2 px-3 rounded-lg mb-1.5 border border-neutral-700"
									key={id}
								>
									<Card id={id} style="h-68" />
								</div>
							))}

						{selectedCard.Quote && (
							<div className="bg-black py-2 px-3 rounded-lg border border-neutral-700">
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
