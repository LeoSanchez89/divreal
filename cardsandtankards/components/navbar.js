'use client'
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const buttonRef = useRef(null);

	const toggleMenu = () => {
		setIsMenuOpen((prev) => !prev);
	};

	// close if click is outside the menu
	const handleClickOutside = (event) => {
		if (
			menuRef.current &&
			!menuRef.current.contains(event.target) &&
			buttonRef.current &&
			!buttonRef.current.contains(event.target)
		) {
			setIsMenuOpen(false);
		}
	};

	// Add event listener only when menu is open
	useEffect(() => {
		if (isMenuOpen) {
			document.addEventListener("click", handleClickOutside);
			document.body.style.overflowY = "hidden";
			// Cleanup event listener when the menu is closed or component unmounts
			return () => {
				document.removeEventListener("click", handleClickOutside);
				document.body.style.overflowY = "unset";
			};
		}
	}, [isMenuOpen]);

	return (
		<nav className="fixed top-0 left-0 right-0 z-50 bg-black/[.8] backdrop-blur-lg py-2 px-2 flex">
			<div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center lg:px-8">
				<Link href="/">
					<img
						src="/media/pictures/cardsandtankardslogo_no_outline.png"
						alt="logo"
						className="w-32"
					/>
				</Link>

				{/* Desktop Menu */}
				<div className="hidden md:flex gap-x-3 md:gap-x-5 items-center text-white">
					<Link href="/" className=" hover:underline focus:underline">
						Home
					</Link>
					<Link
						href="/card_collection"
						className=" hover:underline focus:underline"
					>
						Card Collection
					</Link>
					<Link
						href="/contact"
						className=" mr-2 md:mr-4 hover:underline focus:underline"
					>
						Contact Us
					</Link>
					<div className="flex items-center gap-x-4">
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href="https://twitter.com/DivergentR_VR"
						>
							<img
								src="/media/pictures/twitter_logo.png"
								alt="Twitter logo"
								className="w-5"
							/>
						</Link>
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.youtube.com/channel/UCQXfqASVCwbmvvBbFIYB-vA"
						>
							<img
								src="/media/pictures/youtube_logo.png"
								alt="YouTube logo"
								className="w-7"
							/>
						</Link>
						<Link target="_blank" rel="noopener noreferrer" href="/discord">
							<img
								src="/media/pictures/discord_logo.png"
								alt="Discord logo"
								className="w-7"
							/>
						</Link>
					</div>
				</div>

				{/* Mobile burger icon */}
				<button
					className="md:hidden flex z-50 flex-col justify-between items-center w-12 h-5 text-white relative"
					onClick={toggleMenu}
					ref={buttonRef}
				>
					<div
						className={`w-7 h-1  rounded-sm transition-all duration-200 ease-in-out ${
							isMenuOpen
								? "rotate-45 absolute top-2 bg-amber-600"
								: "top-0 bg-white"
						}`}
					></div>
					<div
						className={`w-7 h-1 bg-white rounded-sm transition-all duration-200 ease-linear ${
							isMenuOpen ? "opacity-0" : "top-2"
						}`}
					></div>
					<div
						className={`w-7 h-1 rounded-sm transition-all duration-200 ease-in-out ${
							isMenuOpen
								? "-rotate-45 absolute bottom-2 bg-amber-600"
								: "bottom-0 bg-white"
						}`}
					></div>
				</button>
			</div>

			{/* Mobile Menu (hidden by default, shown when menu is opened) */}
			<div
				ref={menuRef}
				className={`md:hidden fixed top-0 right-0 w-3/4 dvh-menu pt-28 bg-neutral-800 transform transition-transform ease-in-out duration-300 z-40 ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				<div className="text-white flex flex-col items-center justify-between py-6 h-full ">
					<div className="flex flex-col items-center space-y-4 ">
						<Link href="/" className=" hover:underline focus:underline">
							Home
						</Link>
						<Link
							href="/card_collection"
							className=" hover:underline focus:underline"
						>
							Card Collection
						</Link>
						<Link href="/contact" className=" hover:underline focus:underline">
							Contact Us
						</Link>
					</div>
					<div className="flex items-center space-x-6">
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href="https://twitter.com/DivergentR_VR"
						>
							<img
								src="/media/pictures/twitter_logo.png"
								alt="Twitter logo"
								className="w-5"
							/>
						</Link>
						<Link
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.youtube.com/channel/UCQXfqASVCwbmvvBbFIYB-vA"
						>
							<img
								src="/media/pictures/youtube_logo.png"
								alt="YouTube logo"
								className="w-7"
							/>
						</Link>
						<Link target="_blank" rel="noopener noreferrer" href="/discord">
							<img
								src="/media/pictures/discord_logo.png"
								alt="Discord logo"
								className="w-7"
							/>
						</Link>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
