// import Card from "./card";
// import cardData from "../public/cardData/cardData.json";
// import { filterCards } from "../helpers/helperFunctions";

// const CardGrid = ({
// 	openModal = () => {},
// 	style,
// 	filter,
// 	debouncedSearchTerm = "",
// 	itemsPerPage,
// 	currentPage,
// 	setCurrentPage,
// 	showPagination,
// }) => {
// 	// array of all cards
// 	const allCards = cardData.AllCardDatas.filter((card) => card.Id);

// 	// filter cards for search
// 	const filteredCards = filterCards(allCards, debouncedSearchTerm, filter);

// 	// handle pagination
// 	const totalPages = Math.ceil(filteredCards.length / itemsPerPage);
// 	const currentCards = filteredCards.slice(
// 		(currentPage - 1) * itemsPerPage,
// 		currentPage * itemsPerPage
// 	);
// 	return (
// 		<section>
// 			{currentCards.length > 0 ? (
// 				<div className={style.cardGrid}>
// 					{currentCards.map((cardData) => {
// 						return (
// 							<div
// 								key={cardData.Id}
// 								onClick={() => openModal(cardData)}
// 								className={`sm:cursor-pointer ${
// 									showPagination
// 										? "sm:transition sm:ease-in-out sm:hover:-translate-y-1 sm:hover:scale-105 sm:duration-200"
// 										: ""
// 								}`}
// 							>
// 								<Card id={cardData.Id} name={cardData.Name} />
// 							</div>
// 						);
// 					})}
// 				</div>
// 			) : (
// 				<div className="text-center pt-28 font-semibold text-lg min-h-[50svh]">
// 					<p>No matches found...</p>
// 				</div>
// 			)}
// 			<div className={style.pagination}>
// 				{currentCards.length > 0? <button
// 					onClick={() => setCurrentPage(currentPage - 1)}
// 					disabled={currentPage === 1}
// 					className={`mr-1.5 ${style.arrow}`}
// 				>
// 					<img
// 						src="/media/pictures/wooden_ui_arrow_L.png"
// 						alt="arrow left"
// 						className={currentPage === 1 ? "brightness-50" : ""}
// 					/>
// 				</button>:null}

// 				{showPagination &&
// 					Array.from({ length: totalPages }, (_, index) => (
// 						<button
// 							key={index + 1}
// 							onClick={() => setCurrentPage(index + 1)}
// 							className={`mx-1 ${
// 								index === currentPage - 1
// 									? "text-amber-600 font-semibold text-lg"
// 									: "text-black"
// 							}`}
// 						>
// 							{index + 1}
// 						</button>
// 					))}

// 				{currentCards.length > 0? <button
// 					onClick={() => setCurrentPage(currentPage + 1)}
// 					disabled={currentPage === totalPages}
// 					className={`ml-1.5 ${style.arrow}`}
// 				>
// 					<img
// 						src="/media/pictures/wooden_ui_arrow_R.png"
// 						alt="arrow right"
// 						className={currentPage === totalPages ? "brightness-50" : ""}
// 					/>
// 				</button>:null}
// 			</div>
// 		</section>
// 	);
// };

// export default CardGrid;
