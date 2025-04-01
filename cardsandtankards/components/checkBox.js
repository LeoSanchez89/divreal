const Checkbox = ({ name, label, value, checked, onChange }) => {
	// const handleChange = (e) => {
	// 	onChange({
	// 		name, 
	// 		value, 
	// 		checked: e.target.checked, 
	// 	});
	// };

	return (
		<div className="flex items-center space-x-2">
			<input
				type="checkbox"
				id={value}
				name={name}
				value={value}
				checked={checked}
				onChange={onChange} 
				className="h-4 w-4 form-checkbox rounded accent-amber-600 focus:ring-amber-600 cursor-pointer"
			/>
			<label htmlFor={value} className="text-sm truncate">
				{label}
			</label>
		</div>
	);
};

export default Checkbox;