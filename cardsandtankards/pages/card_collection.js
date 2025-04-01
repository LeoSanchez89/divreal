import Layout from "../components/layout";
import { useState, useEffect } from "react";
import CardModal from "../components/cardModal";
import {
	Debounce,
	filterCards,
	sortCards,
	CardType,
	FactionType,
	CreatureType,
	SpellType,
	CardPackType,
} from "../helpers/helperFunctions";
import cardData from "../public/cardData/Cards.json";
import Card from "../components/card";
import Dropdown from "../components/dropdownMenu";
import Checkbox from "../components/checkBox";
import Pagination from "../components/pagination";

const CardCollection = () => {
	const title = "Cards & Tankards - Card Collection";

	// const sortedCardCollection = sortCards(cardData);
	const sortedCardCollection = sortCards(cardData).filter(
		(card) => !card.Name.includes("_")
	);

	// search state
	const [searchTerm, setSearchTerm] = useState("");
	const initialSubType = [{ label: "Sub Type", value: "" }];
	const [subTypeOptions, setSubTypeOptions] = useState(initialSubType);
	const [resetSub, setResetSub] = useState(false);
	const initialFilter = {
		manaCost: "",
		faction: "",
		cardType: "",
		subType: "",
		packType: [],
	};
	const [filter, setFilter] = useState(initialFilter);

	// debounce search
	const debouncedSearchTerm = Debounce(searchTerm, 300);

	// filter cards for search results
	const filteredCards = filterCards(
		sortedCardCollection,
		debouncedSearchTerm,
		filter
	);

	// handle search
	const handleSearch = (e) => {
		setSearchTerm(e.target.value);
		setCurrentPage(1);
	};
	// const handleFilterChange = (e) => {
	// 	const { name, value, checked } = e.target;
	// 	// setFilter({ ...filter, [e.target.name]: e.target.value });
	// 	setFilter((prevFilter) => ({
	// 		...prevFilter,
	// 		[name]: value,
	// 	}));
	// 	// reset subtype when type changes
	// 	if (name === "cardType") {
	// 		setFilter((prevFilter) => ({
	// 			...prevFilter,
	// 			subType: "",
	// 		}));
	// 		setResetSub(true);
	// 	}
	// 	setCurrentPage(1);
	// };
	const handleFilterChange = (e) => {
		const { name, value, checked } = e.target;

		if (name === "packType") {
			// Handle multiple checkbox values for `packType`
			setFilter((prevFilter) => {
				const updatedPackTypes = checked
					? [...prevFilter.packType, value] // Add to packType array if checked
					: prevFilter.packType.filter((type) => type !== value); // Remove if unchecked

				return {
					...prevFilter,
					packType: updatedPackTypes, // Update the packType array in the filter state
				};
			});
		} else {
			// Handle single-value filters (cardType, subType, etc.)
			setFilter((prevFilter) => ({
				...prevFilter,
				[name]: value, // Update the specific filter value
			}));
		}

		// Reset subType when cardType changes
		if (name === "cardType") {
			setFilter((prevFilter) => ({
				...prevFilter,
				subType: "", // Reset subType value
			}));
			setResetSub(true); // Optional state to reset subType dropdown if needed
		}

		// Reset the current page when filter changes
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
		if (window.innerWidth > 640) {
			document.body.style.paddingRight = "15px";
		}
		console.log(cardData);
	};

	const closeModal = () => {
		setShowModal(false);
		setSelectedCard(null);
		document.body.style.overflow = "unset";
		if (window.innerWidth > 768) {
			document.body.style.paddingRight = "unset";
		}
	};

	// dropdown menu
	const manaCost = [
		{ label: "Mana Cost", value: "" },
		...Array.from({ length: 7 }, (_, i) => ({ label: `${i}`, value: `${i}` })),
		{ label: "7+", value: "7+" },
	];

	const factionOrder = [2, 3, 4, 1, 0];
	const faction = [
		{ label: "Faction", value: "" },
		...factionOrder.map((idx) => ({
			label: FactionType[idx],
			value: idx.toString(),
		})),
	];

	const cardType = [
		{ label: "Card Type", value: "" },
		...Object.entries(CardType).map(([idx, name]) => ({
			label: name,
			value: idx.toString(),
		})),
	];

	useEffect(() => {
		let options = initialSubType;

		if (filter.cardType === "0") {
			// If cardType is "creature" (0), populate with CreatureType options
			options = [
				...options,
				...Object.entries(CreatureType).map(([idx, name]) => ({
					label: name,
					value: idx.toString(),
				})),
			];
		} else if (filter.cardType === "1") {
			// If cardType is "spell" (1), populate with SpellType options
			options = [
				...options,
				...Object.entries(SpellType).map(([idx, name]) => ({
					label: name,
					value: idx.toString(),
				})),
			];
		}

		setSubTypeOptions(options);

		if (filter.cardType !== "0" && filter.cardType !== "1") {
			setFilter((prevFilter) => ({
				...prevFilter,
				subType: "", // Reset subType if cardType is not 'creature' or 'spell'
			}));
		}
		setResetSub(false);
	}, [filter.cardType]); // Runs whenever filter.cardType changes

	// Reset Filters function
	const resetFilters = () => {
		setSearchTerm(""); // Clear search term
		setFilter(initialFilter); // Reset filter values
		setCurrentPage(1); // Reset pagination
	};

	return (
		<Layout title={title}>
			<main className="pb-28">
				<header className="relative w-full h-[35vh] md:h-[40vh] search-bg">
					<div className="absolute inset-0 bg-gradient-to-b from-black/[.5] to-black backdrop-blur-sm flex flex-col justify-center sm:justify-end items-center text-center text-white pt-28 sm:pt-0 gap-y-2 md:gap-y-4">
						<h1 className="font-bold text-4xl sm:text-5xl">Card Collection</h1>
						<p className="sm:font-semibold 2xl:text-lg max-w-prose px-8">
							Browse the entire catalogue of cards. Search for cards by Name,
							Ability, Type and more!
						</p>
					</div>
				</header>
				<section
					role="search"
					className="bg-gradient-to-b from-black via-black to-amber-900/[.75] mx-auto px-6 sm:px-0 pt-6 sm:pt-14 sm:pb-10 "
				>
					<div className="grid grid-rows-3 items-center justify-center mx-auto md:max-w-screen-md ">
						<div className="relative pb-2 grid grid-cols-3 gap-x-2">
							<input
								type="text"
								id="search"
								name="searchText"
								value={searchTerm}
								onChange={handleSearch}
								className="peer col-span-2 block px-2.5 py-2 w-full text-black bg-white border  rounded focus:outline-0 focus:outline-amber-500 focus:shadow-sm focus:border-amber-500 focus:shadow-amber-500"
								placeholder=" " // Ensures placeholder is visible when empty
							/>
							<label
								htmlFor="search"
								className={`absolute text-sm ${searchTerm? 'text-amber-500 font-semibold':'text-neutral-700'} duration-200 transform -translate-y-4 scale-75 -top-2 z-10 origin-[0] px-2 peer-focus:px-2 peer-focus:text-amber-500 peer-focus:font-semibold peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-5 peer-focus:-top-2 peer-focus:scale-75 peer-focus:-translate-y-4 `}
							>
								Search Card Text
							</label>
							<button
								onClick={resetFilters}
								className="cursor-pointer bg-amber-600  text-white py-2 px-4 rounded hover:bg-amber-700"
							>
								Reset All
							</button>
						</div>
						<div className="text-white grid grid-cols-2 gap-1 md:gap-2 md:mx-auto">
							<Dropdown
								name="manaCost"
								options={manaCost}
								onSelect={handleFilterChange}
								selectedValue={filter.manaCost || ""}
							/>
							<Dropdown
								name="faction"
								options={faction}
								onSelect={handleFilterChange}
								selectedValue={filter.faction || ""}
							/>
							<Dropdown
								name="cardType"
								options={cardType}
								onSelect={handleFilterChange}
								selectedValue={filter.cardType || ""}
							/>
							<Dropdown
								name="subType"
								options={subTypeOptions}
								onSelect={handleFilterChange}
								selectedValue={filter.subType || ""}
								disabled={!filter.cardType || filter.cardType > 1}
								resetSub={resetSub}
							/>
						</div>
						<div className="grid grid-cols-2 gap-x-4 text-white md:flex md:justify-around">
							{Object.entries(CardPackType).map(([key, value]) => {
								return (
									<Checkbox
										key={key}
										name="packType"
										label={value}
										value={key}
										checked={filter.packType.includes(key)}
										onChange={handleFilterChange}
									/>
								);
							})}
						</div>
					</div>
				</section>
				<div className="max-w-screen-xl mx-auto sm:min-h-[50svh]">
					{/* card grid */}
					{currentCards.length > 0 ? (
						<div className="grid grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-12 overflow-clip py-14 md:py-28">
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
				<Pagination
					currentPage={currentPage}
					setCurrentPage={setCurrentPage}
					totalPages={totalPages}
				/>
			</main>
		</Layout>
	);
};

export default CardCollection;
