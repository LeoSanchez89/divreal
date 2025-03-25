import { useState, useRef } from "react";

const Dropdown = ({ options, onSelect, name }) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectedOption, setSelectedOption] = useState(
		options[0]?.label || "Select Option"
	);
	const dropdownRef = useRef(null);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	const handleOptionClick = (value, label) => {
		setSelectedOption(label);
		onSelect({ target: { name, value } });
		setIsOpen(false);
	};

	// close dropdown when click is outside of dropdown area
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
				onClick={toggleDropdown}
				aria-expanded={isOpen}
				aria-haspopup="listbox"
				className="w-48 shadow border rounded py-2 px-4 hover:ease-in-out duration-300 hover:border-amber-500 hover:shadow-sm hover:shadow-amber-500/50 focus:border-amber-500 focus:shadow-sm focus:shadow-amber-500/50 flex justify-between items-center"
			>
				{selectedOption}
				<span
					className={`ml-2 text-xs ease-in-out duration-300 ${isOpen ? "rotate-180" : ""}`}
				>
					▼
				</span>
			</button>

			{isOpen && (
				<ul
					role="listbox"
					className="z-50 absolute w-48 left-0 bg-white border border-gray-300 rounded-md shadow-lg"
				>
					{options.map((option, index) => (
						<li
							key={index}
							role="option"
							aria-selected={option.label === selectedOption}
							className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
							onClick={() => handleOptionClick(option.value, option.label)}
						>
							{option.label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default Dropdown;
