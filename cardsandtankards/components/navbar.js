"use client";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const menuRef = useRef(null);
	const buttonRef = useRef(null);

	const toggleMenu = () => setIsMenuOpen((prev) => !prev);

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

	const closeMenu = () => {
		setIsMenuOpen(false);
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
		<nav>
			{/* Navbar */}
			<div className="fixed top-0 left-0 right-0 z-40 bg-black/[.8] backdrop-blur-lg py-2 px-2 flex">
				<div className="w-full max-w-screen-2xl mx-auto flex justify-between items-center lg:px-8">
					<Link href="/">
						<img
							src="/media/pictures/cardsandtankardslogo_no_outline.png"
							alt="logo"
							className="w-32"
						/>
					</Link>

					{/* Desktop Menu */}
					<div className="hidden md:flex gap-x-5 items-center text-white">
						<Link href="/" className="hover:underline">
							Home
						</Link>
						<Link href="/card_collection" className="hover:underline">
							Card Collection
						</Link>
						<Link href="/contact" className="hover:underline">
							Contact Us
						</Link>
						<div className="flex items-center space-x-4 pl-4">
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
			</div>
			{/* Burger Button */}
			<div className="fixed top-6 right-2 z-50">
				<button
					className="md:hidden flex flex-col justify-between items-center w-12 h-5 text-white relative"
					onClick={toggleMenu}
					ref={buttonRef}
					aria-controls="mobile-menu"
					aria-expanded={isMenuOpen}
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
				>
					<div
						className={`w-7 h-1 rounded-sm transition-all duration-200 ${
							isMenuOpen ? "rotate-45 absolute top-2 bg-amber-600" : "bg-white"
						}`}
					></div>
					<div
						className={`w-7 h-1 bg-white rounded-sm transition-all duration-200 ${
							isMenuOpen ? "opacity-0 bg-amber-600" : "bg-white"
						}`}
					></div>
					<div
						className={`w-7 h-1 rounded-sm transition-all duration-200 ${
							isMenuOpen
								? "-rotate-45 absolute bottom-2 bg-amber-600"
								: "bg-white"
						}`}
					></div>
				</button>
			</div>

			{/* Slide-out Mobile Menu (outside navbar to escape backdrop context) */}
			<div
				id="mobile-menu"
				ref={menuRef}
				className={`md:hidden fixed top-0 right-0 w-3/4 h-screen pt-28 transform transition-transform duration-300 ease-in-out z-40 ${
					isMenuOpen ? "translate-x-0" : "translate-x-full"
				}`}
			>
				{/* Blur + semi-transparent backdrop */}
				<div className="absolute inset-0 bg-black/[.8] backdrop-blur-lg pointer-events-none"></div>

				{/* Menu Content */}
				<div className="relative z-10 text-white flex flex-col items-center justify-between py-6 h-full">
					<div className="flex flex-col items-center space-y-4">
						<Link href="/" onClick={closeMenu} className="hover:underline">
							Home
						</Link>
						<Link
							href="/card_collection"
							onClick={closeMenu}
							className="hover:underline"
						>
							Card Collection
						</Link>
						<Link
							href="/contact"
							onClick={closeMenu}
							className="hover:underline"
						>
							Contact Us
						</Link>
					</div>
					<div className="flex items-center space-x-6">
						<Link
							onClick={closeMenu}
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
							onClick={closeMenu}
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
						<Link
							onClick={closeMenu}
							target="_blank"
							rel="noopener noreferrer"
							href="/discord"
						>
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
