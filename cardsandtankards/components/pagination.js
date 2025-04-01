import { useEffect } from "react";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
	// generate page chunk range
	const generatePageChunks = () => {
		const chunk = 6;
		let startPage;
		let endPage;

		if (totalPages <= chunk) {
			startPage = 1;
			endPage = totalPages;
		} else if (currentPage <= chunk) {
			startPage = 1;
			endPage = chunk;
		} else if (currentPage > totalPages - chunk) {
			startPage = totalPages - chunk + 1;
			endPage = totalPages;
		} else {
			startPage = currentPage - 2;
			endPage = currentPage + 3;

			// ensure that start and end do not exceed limits
			if (startPage < 1) {
				startPage = 1;
				endPage = chunk;
			}
			if (endPage > totalPages) {
				startPage = totalPages - 5;
				endPage = totalPages;
			}
		}
		return { startPage, endPage };
	};

	const { startPage, endPage } = generatePageChunks();

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber);
	};

	useEffect(() => {
		window.scrollTo({ top: 0 });
	}, [currentPage]);

	return (
		totalPages > 1 && (
			<div className="max-w-screen-xl mx-auto flex justify-center items-center sm:justify-end sm:pr-10 ">
				{/* left arrow  */}
				<button
					onClick={() => {
						if (currentPage > 1) handlePageChange(currentPage - 1);
					}}
					disabled={currentPage === 1}
					className={`mr-1.5 w-10 sm:w-[1.5rem] ${
						currentPage === 1
							? "brightness-50"
							: "brightness-100 cursor-pointer"
					}`}
				>
					<img src="/media/pictures/wooden_ui_arrow_L.png" alt="arrow left" />
				</button>

				{/* page 1 & ellipses */}
				{startPage > 1 && (
					<>
						<button
							onClick={() => setCurrentPage(1)}
							className="mx-0.5 text-black hover:underline cursor-pointer"
						>
							1
						</button>
						<span className=" text-black">...</span>
					</>
				)}

				{/* chunk of page numbers */}
				{Array.from({ length: endPage - startPage + 1 }, (_, index) => {
					const page = startPage + index;
					return (
						<button
							key={page}
							onClick={() => handlePageChange(page)}
							className={`mx-0.5  ${
								page === currentPage
									? "text-amber-600 font-bold"
									: "text-black hover:underline cursor-pointer"
							}`}
						>
							{page}
						</button>
					);
				})}

				{/* last page & ellipses */}
				{endPage < totalPages && (
					<>
						<span className="text-black">...</span>
						<button
							onClick={() => setCurrentPage(totalPages)}
							className="mx-0.5 text-black hover:underline cursor-pointer"
						>
							{totalPages}
						</button>
					</>
				)}
				{/* right arrow */}
				<button
					onClick={() => {
						if (currentPage < totalPages) handlePageChange(currentPage + 1);
					}}
					disabled={currentPage === totalPages}
					className={`ml-1.5 w-10 sm:w-[1.5rem] ${
						currentPage === totalPages
							? "brightness-50"
							: "brightness-100 cursor-pointer"
					}`}
				>
					<img src="/media/pictures/wooden_ui_arrow_R.png" alt="arrow right" />
				</button>
			</div>
		)
	);
};

export default Pagination;
