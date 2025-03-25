const ManaCostIcon = ({manaCost, style}) => {
    return (
        <div className="relative w-fit flex justify-center items-center">
            <img src="/media/pictures/mana.png" className={style.icon} />
            <p className={`absolute text-white text-outline ${style.text}`}>{manaCost}</p>
        </div>
    );
};

export default ManaCostIcon;