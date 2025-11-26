const Card = ({ id, name, style }) => {
	// const handleError = (e) => {
	// 	e.target.src = "https://cardsandtankards.com/cards/297.png";
	// };

	// update source to "./cards/${id}.png on hosting"
	return (
		<img
			loading="lazy"
			src={`https://cardsandtankards.com/cards/${id}.png`}
			alt={`Card art for ${name}`}
			className={style}
			// onError={handleError}
		/>
	);
};

export default Card;
