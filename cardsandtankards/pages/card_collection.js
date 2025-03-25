import Layout from "../components/layout";
import { useState } from "react";
import CardModal from "../components/cardModal";
import { Debounce, filterCards, sortCards } from "../helpers/helperFunctions";
import cardData from "../public/cardData/Cards.json";
import Card from "../components/card";
import Dropdown from "../components/dropdownMenu";
import Pagination from "../components/pagination";

const CardCollection = () => {
	const title = "Cards & Tankards - Card Collection";

	// array of all cards that have an ID
	// const allCards = cardData.AllCardDatas.filter((card) => card.Id).sort(
	// 	(a, b) => a.ManaCost - b.ManaCost
	// );

	const sortedCardCollection = sortCards(cardData);
	
	// search state
	const [searchTerm, setSearchTerm] = useState("");
	const [filter, setFilter] = useState({
		manaCost: "",
		faction: "",
		cardType: "",
	});

	// debounce search
	const debouncedSearchTerm = Debounce(searchTerm, 300);

	// filter cards for search results
	// const filteredCards = filterCards(allCards, debouncedSearchTerm, filter);
	const filteredCards = filterCards(sortedCardCollection, debouncedSearchTerm, filter);

	// handle search
	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};
	const handleFilterChange = (e) => {
		setFilter({ ...filter, [e.target.name]: e.target.value });
		setCurrentPage(1);
	};

	// handle pagination
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 20;
	const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
	const currentCards = filteredCards.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	);

	// handle modal
	const [showModal, setShowModal] = useState(false);
	const [selectedCard, setSelectedCard] = useState(null);
	const openModal = (cardData) => {
		setShowModal(true);
		setSelectedCard(cardData);
		document.body.style.overflow = "hidden";
		console.log(cardData);
	};
	const closeModal = () => {
		setShowModal(false);
		setSelectedCard(null);
		document.body.style.overflow = "unset";
	};

	// dropdown menu
	const manaCost = [
		{ label: "Filter by Mana Cost", value: "" },
		{ label: "0", value: "0" },
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
		{ label: "4", value: "4" },
		{ label: "5", value: "5" },
		{ label: "6", value: "6" },
		{ label: "7+", value: "7+" },
	];
	const faction = [
		{ label: "Filter by Faction", value: "" },
		{ label: "Dungeon Master", value: "2" },
		{ label: "Wild Horde", value: "3" },
		{ label: "Plundering Guild", value: "4" },
		{ label: "Auger Order", value: "1" },
		{ label: "Neutral", value: "0" },
	];
	const cardType = [
		{ label: "Filter by Card Type", value: "" },
		{ label: "Bane", value: "3" },
		{ label: "Boon", value: "4" },
		{ label: "Creature", value: "0" },
		{ label: "Spell", value: "1" },
	];
	return (
		<Layout title={title}>
			<main className="pb-28">
				<header className="relative w-full h-[35vh] md:h-[40vh] search-bg">
					<div className="absolute inset-0 bg-gradient-to-b from-black/[.5] to-black backdrop-blur-sm flex flex-col justify-center items-center text-center text-white pt-14 gap-y-2 md:gap-y-4">
						<h1 className="font-bold text-4xl sm:text-5xl">Card Collection</h1>
						<p className="sm:font-semibold 2xl:text-lg max-w-prose px-6">
							Browse the entire catalogue of cards. Search for cards by Name,
							Ability, Type and more!
						</p>
					</div>
				</header>
				<section className="flex mx-auto pt-14 justify-center flex-wrap">
					<div className="relative">
						<input
							type="text"
							id="search"
							name="searchText"
							value={searchTerm}
							onChange={handleSearch}
							className="peer w-48 py-2 px-4 border shadow rounded focus:outline-0 focus:outline-amber-400 focus:shadow-sm focus:border-amber-500 focus:shadow-amber-500/50"
						/>
						<label
							htmlFor="search"
							className={`absolute z-10 cursor-text text-gray-700 left-3 top-1/2 transform -translate-y-1/2 transition-all duration-200 ease-in-out
      							${searchTerm ? "top-0 text-xs" : ""} 
      							peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-0 peer-focus:text-xs peer-focus:duration-200`}
						>
							Search Card Text
						</label>
						<div
							className={`absolute top-0 left-2 w-24 h-2 bg-white opacity-0 
							${searchTerm ? "opacity-100" : ""} 
							peer-focus:opacity-100 peer-focus:transition-opacity peer-focus:duration-200 ease-in-out`}
						/>
					</div>
					<Dropdown
						name="manaCost"
						options={manaCost}
						onSelect={handleFilterChange}
					/>
					<Dropdown
						name="faction"
						options={faction}
						onSelect={handleFilterChange}
					/>
					<Dropdown
						name="cardType"
						options={cardType}
						onSelect={handleFilterChange}
					/>
				</section>
				<div className="max-w-screen-xl mx-auto sm:min-h-[45svh]">
					{/* card grid */}
					{currentCards.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-12 overflow-clip py-16 md:py-26">
							{currentCards.map((cardData) => {
								return (
									<div
										key={cardData.Id}
										onClick={() => openModal(cardData)}
										className="sm:cursor-pointer sm:transition sm:ease-in-out sm:hover:-translate-y-1 sm:hover:scale-105 sm:duration-200"
									>
										<Card id={cardData.Id} name={cardData.Name} />
									</div>
								);
							})}
						</div>
					) : (
						<div className="text-center py-28 font-semibold text-lg">
							<p>No matches found...</p>
						</div>
					)}

					{showModal && (
						<CardModal closeModal={closeModal} selectedCard={selectedCard} />
					)}
				</div>
				{/* pagination */}
				<Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} totalPages={totalPages}/>
			</main>
		</Layout>
	);
};

export default CardCollection;
