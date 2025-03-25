const FactionIcon = ({ faction, style, lit }) => {
	return (
		<div className="relative w-fit flex justify-center items-center">
			<img
				src={`/media/pictures/faction_plate${faction}.png`}
				className={`${style.plate} ${lit?"brightness-150" : ""}`}
			/>
			<img
				src={`/media/pictures/faction_icon${faction}.png`}
				className={`absolute ${style.icon}`}
			/>
		</div>
	);
};

export default FactionIcon;