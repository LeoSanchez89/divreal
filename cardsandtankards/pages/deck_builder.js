import { useState } from "react";
import Layout from "../components/layout";
import ManaCostIcon from "../components/manaCostIcon";
import FactionIcon from "../components/factionIcon";
import cardData from "../public/cardData/Cards.json";
import Card from "../components/card";
import { filterCards, sortCards } from "../helpers/helperFunctions";

const DeckBuilder = () => {
	const title = "Cards & Tankards - Deck Builder";

	// array of all collectible cards sorted by mana cost + faction order
	const sortedCardCollection = sortCards(cardData).filter(
			(card) => card.Collectible
		);


	// filter state
	const initialState = { manaCost: "", faction: "" };
	const [filter, setFilter] = useState(initialState);
	
	// deck state
	const [deck, setDeck] = useState([]);

	// filter cards for search results
	const filteredCards = filterCards(sortedCardCollection, "", filter, true);
	
	// handle pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 8;
	const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
	const currentCards = filteredCards.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// handle filter
	const handleFilterChange = (e) => {
		const { name, value } = e.target;
		if (name === "manaCost" && filter[name] === value) {
			setFilter({ ...filter, [name]: initialState[name] });
		} else {
			setFilter({ ...filter, [name]: value });
		}
		setCurrentPage(1);
	};

	// handle mana select
	const manaRangeArray = [...Array(7).keys()]
		.map((num) => num.toString())
		.concat("7+");
	const handleManaClick = (number) => {
		const e = {
			target: {
				name: "manaCost",
				value: number,
			},
		};
		handleFilterChange(e);
	};

	// handle faction select
	const factionArray = ["2", "3", "4", "1", "0"];
	const handleFactionClick = (number) => {
		const e = {
			target: {
				name: "faction",
				value: number,
			},
		};
		handleFilterChange(e);
	};

	// ****** CREATE FILTER HELPER FUNCTION TO MANAGE DECK ONLY 2 FACTIONS + NEUTRAL *******
	// handle deck creation
	const addCard = (cardData) => {
		setDeck((prevDeck) => {
			const cardIndex = prevDeck.findIndex((c) => c.Id === cardData.Id);
			let updatedDeck;

			// return if count is already at 3
			if (cardIndex !== -1 && prevDeck[cardIndex].count >= 3) {
				return prevDeck; 
			}
			// if less than 3, increase the count
			else if (cardIndex !== -1) {
				updatedDeck = [...prevDeck];
				updatedDeck[cardIndex] = {
					...updatedDeck[cardIndex],
					count: updatedDeck[cardIndex].count + 1,
				};
				return updatedDeck;
			}
			// add card to deck with count = 1
			else {
				updatedDeck = [
					...prevDeck, 
					{ ...cardData, count: 1 }, 
				];
				// Sort by ManaCost, lowest -> highest
				updatedDeck.sort((a, b) => a.ManaCost - b.ManaCost);
				return updatedDeck; 
			}
		});
	};

	const removeCard = (cardData) => {
		setDeck((prevDeck) => {
			const cardIndex = prevDeck.findIndex((c) => c.Id === cardData.Id);

			if (cardIndex !== -1) {
				// if count is 1, remove from deck
				if (prevDeck[cardIndex].count === 1) {
					const updatedDeck = prevDeck.filter((c) => c.Id !== cardData.Id);
					return updatedDeck;
				}
				// otherwise, decrease count by 1
				else if (prevDeck[cardIndex].count > 1) {
					const updatedDeck = [...prevDeck];
					updatedDeck[cardIndex] = {
						...updatedDeck[cardIndex],
						count: updatedDeck[cardIndex].count - 1,
					};
					return updatedDeck;
				}
			}
			else {
				return prevDeck;
			}
		});
	};
	
	// styles
	const manaStyle = {
		icon: "w-28",
		text: "font-extrabold text-5xl",
	};

	const factionStyle = {
		plate: "w-20",
		icon: "w-14",
	};

	return (
		<Layout title={title}>
			<main className="pt-28">
				<header className="text-center text-5xl font-bold">
					<h1>Deck Builder</h1>
				</header>
				<div className="mx auto border max-w-screen-lg p-4 mx-auto ">
					<h2>Deck List:</h2>
					<ul className="flex flex-col gap-y-2 w-60">
						{deck && deck.map((card) => {
							return (<li className="border cursor-pointer text-center p-1" onClick={() => removeCard(card)} key={card.Id}>{card.ManaCost} {card.Name} {card.count}/3</li>)
						})}
					</ul>
				</div>
				<div className="book-bg max-w-screen-xl mx-auto">
					<div className="max-w-screen-xl mx-auto grid grid-cols-11 min-h-[660px] px-14 pt-16">
						
						{/* faction toggles */}
						<div className="col-span-1 flex flex-col  justify-self-center ">
							{factionArray.map((number, index) => {
								return (
									<div
										key={index}
										className="cursor-pointer w-fit"
										onClick={() => handleFactionClick(number)}
									>
										<FactionIcon
											faction={number}
											style={factionStyle}
											lit={filter.faction === number || false}
										/>
									</div>
								);
							})}
						</div>

						{/* card gird */}
						<div className="col-span-9">
							<div className="grid grid-cols-2 gap-x-16">
								{/* Left Column */}
								<div className="grid grid-cols-2 gap-y-20">
									{currentCards.slice(0, 4).map((cardData) => {
										return (
											<div
												key={cardData.Id}
												onClick={() => addCard(cardData)}
												className="cursor-pointer max-w-[300px] -mx-4"
											>
												<Card id={cardData.Id} name={cardData.Name} />
											</div>
										);
									})}
								</div>

								{/* Right Column */}
								<div className="grid grid-cols-2 gap-y-20">
									{currentCards.slice(4, 8).map((cardData) => {
										return (
											<div
												key={cardData.Id}
												onClick={() => addCard(cardData)}
												className="cursor-pointer max-w-[300px] -mx-4"
											>
												<Card id={cardData.Id} name={cardData.Name} />
											</div>
										);
									})}
								</div>
							</div>
						</div>

						{/* mana toggles */}
						<div className="col-span-1 flex flex-col justify-between pb-4">
							{manaRangeArray.map((number, index) => {
								return (
									<div
										key={index}
										className={`cursor-pointer -my-6  ${
											filter.manaCost === number ? "brightness-150" : ""
										}`}
										onClick={() => handleManaClick(number)}
									>
										<ManaCostIcon manaCost={number} style={manaStyle} />
									</div>
								);
							})}
						</div>
					</div>

					{/* pagination arrows */}
					<div className="max-w-screen-xl mx-auto flex justify-between py-8 px-20">
						<button
							onClick={() => setCurrentPage(currentPage - 1)}
							className={`w-[4rem] ${
								currentPage === 1 ? "brightness-50" : "brightness-100"
							}`}
							disabled={currentPage === 1}
						>
							<img
								src="/media/pictures/wooden_ui_arrow_L.png"
								alt="arrow left"
							/>
						</button>

						<button
							onClick={() => setCurrentPage(currentPage + 1)}
							className={`w-[4rem] ${
								currentPage === totalPages ? "brightness-50" : "brightness-100"
							}`}
							disabled={currentPage === totalPages}
						>
							<img
								src="/media/pictures/wooden_ui_arrow_R.png"
								alt="arrow right"
							/>
						</button>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default DeckBuilder;
