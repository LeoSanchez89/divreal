// import { useState, useRef, useEffect } from "react";

// const Dropdown = ({ options, onSelect, name, disabled, resetSub }) => {
// 	const [isOpen, setIsOpen] = useState(false);
// 	const initialOption = options[0]?.label || "Select Option";
// 	const [selectedOption, setSelectedOption] = useState(initialOption);
// 	const dropdownRef = useRef(null);

// 	useEffect(() => {
// 		if (resetSub) {
// 			setSelectedOption(options[0]?.label || "Select Option");
// 		}
// 	}, [resetSub, options]);

// 	const toggleDropdown = () => setIsOpen((prev) => !prev);

// 	const handleOptionClick = (value, label) => {
// 		setSelectedOption(label);
// 		onSelect({ target: { name, value } });
// 		setIsOpen(false);
// 	};

// 	// close dropdown when click is outside of dropdown area
// 	const handleBlur = (event) => {
// 		if (!dropdownRef.current.contains(event.relatedTarget)) {
// 			setIsOpen(false);
// 		}
// 	};

// 	return (
// 		<div
// 			ref={dropdownRef}
// 			onBlur={handleBlur}
// 			tabIndex={0}
// 			className="relative inline-block w-full"
// 		>
// 			<button
// 				disabled={disabled}
// 				onClick={toggleDropdown}
// 				aria-expanded={isOpen}
// 				aria-haspopup="listbox"
// 				className={`flex justify-between items-center w-full min-w-[150px] py-2 px-4 shadow border rounded ${
// 					disabled
// 						? "text-neutral-500 border-neutral-500"
// 						: "hover:ease-in-out duration-300 hover:border-amber-500 hover:shadow-sm hover:shadow-amber-500/50 focus:border-amber-500 focus:shadow-sm focus:shadow-amber-500"
// 				}`}
// 			>
// 				<span className="truncate flex-grow">{selectedOption}</span>
// 				<span
// 					className={`ml-2 text-xs ease-in-out duration-300 ${
// 						isOpen ? "rotate-180" : ""
// 					}`}
// 				>
// 					▼
// 				</span>
// 			</button>

// 			{isOpen && (
// 				<ul
// 					role="listbox"
// 					className="z-10 absolute min-w-[150px] w-full max-w-48 left-0 bg-neutral-800 rounded-b-md shadow-lg"
// 				>
// 					{options.map((option, index) => (
// 						<li
// 							key={index}
// 							role="option"
// 							aria-selected={option.label === selectedOption}
// 							// className="px-4 py-2 hover:bg-neutral-500 cursor-pointer truncate"
// 							className={`px-4 py-2 cursor-pointer truncate focus:bg-neutral-500 ${
// 								option.label === selectedOption
// 									? "bg-amber-600"
// 									: "hover:bg-neutral-500"
// 							}`}
// 							onClick={() => handleOptionClick(option.value, option.label)}
// 						>
// 							{option.label}
// 						</li>
// 					))}
// 				</ul>
// 			)}
// 		</div>
// 	);
// };

// export default Dropdown;
import { useState, useRef, useEffect } from "react";

const Dropdown = ({
	options,
	onSelect,
	name,
	disabled,
	resetSub,
	selectedValue,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef(null);

	// Find the label that corresponds to the selected value, or use the default label if none is selected
	const initialOption = options[0]?.label || "Select Option";

	// Initialize the selected option based on selectedValue (match value to label)
	const [selectedOption, setSelectedOption] = useState(
		options.find((option) => option.value === selectedValue)?.label ||
			initialOption
	);

	// Effect to reset the dropdown when resetSub or selectedValue changes
	useEffect(() => {
		if (resetSub) {
			setSelectedOption(options[0]?.label || "Select Option");
		} else if (selectedValue !== undefined && selectedValue !== null) {
			// Find the corresponding label based on selectedValue
			setSelectedOption(
				options.find((option) => option.value === selectedValue)?.label ||
					initialOption
			);
		}
	}, [selectedValue, options, resetSub]);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleOptionClick = (value, label) => {
		setSelectedOption(label); // Update selectedOption when an option is clicked
		onSelect({ target: { name, value } }); // Notify parent component
		setIsOpen(false); // Close the dropdown after selection
	};

	// Close dropdown when click is outside of the dropdown area
	const handleBlur = (event) => {
		if (!dropdownRef.current.contains(event.relatedTarget)) {
			setIsOpen(false);
		}
	};

	return (
		<div
			ref={dropdownRef}
			onBlur={handleBlur}
			tabIndex={0}
			className="relative inline-block"
		>
			<button
				disabled={disabled}
				onClick={toggleDropdown}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				className={`flex justify-between items-center w-full min-w-[150px] sm:min-w-48 max-w-52 py-2 px-4 shadow border rounded ${
					disabled
						? "text-neutral-500 border-neutral-500 cursor-default"
						: "cursor-pointer hover:ease-in-out duration-300 hover:border-amber-500 hover:shadow-sm hover:shadow-amber-500/50 focus:border-amber-500 focus:shadow-sm focus:shadow-amber-500"
				}`}
			>
				<span className="truncate flex-grow">{selectedOption}</span>
				<span
					className={`ml-2 text-xs ease-in-out duration-300 ${
						isOpen ? "rotate-180" : ""
					}`}
				>
					▼
				</span>
			</button>

			<ul
				role="listbox"
				className={`absolute z-10 w-full min-w-[150px] sm:min-w-48 max-w-52 left-0 bg-neutral-800 rounded-b-md  overflow-hidden transition-all duration-150 ease-in-out ${
					isOpen ? "max-h-96" : "max-h-0"
				}`}
			>
				{options.map((option, index) => (
					<li
						key={index}
						role="option"
						aria-selected={option.label === selectedOption}
						className={`px-4 py-2 cursor-pointer truncate focus:bg-neutral-500 ${
							option.label === selectedOption
								? "bg-amber-600"
								: "hover:bg-neutral-500"
						}`}
						onClick={() => handleOptionClick(option.value, option.label)}
					>
						{option.label}
					</li>
				))}
			</ul>
		</div>
	);
};

export default Dropdown;
