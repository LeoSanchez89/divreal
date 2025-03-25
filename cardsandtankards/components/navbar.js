import Link from "next/link";


const Navbar = () => {
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
				<div className="flex gap-x-3 md:gap-x-5 items-center">
					<div className="flex items-center gap-x-4">
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://twitter.com/DivergentR_VR"
						>
							<img
								src="/media/pictures/twitter_logo.png"
								alt="X logo"
								className="w-5"
							/>
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.youtube.com/channel/UCQXfqASVCwbmvvBbFIYB-vA"
						>
							<img
								src="/media/pictures/youtube_logo.png"
								alt="Youtube logo"
								className="w-7"
							/>
						</a>
						<a
							target="_blank"
							rel="noopener noreferrer"
							href="https://www.discord.gg/cardsandtankards"
						>
							<img
								src="/media/pictures/discord_logo.png"
								alt="Discord logo"
								className="w-7"
							/>
						</a>
					</div>
					<a
						href="/contact"
						className="text-white mr-2 md:mr-4  hover:underline"
					>
						Contact Us
					</a>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
