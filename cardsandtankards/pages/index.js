// import { useEffect, useState } from "react";
import Layout from "../components/layout";
import useUtmLinks from "../helpers/utmLinks";

export default function Home() {
	const title = "Cards & Tankards - Divergent Realities";
	const { addUtm } = useUtmLinks();
	return (
		<Layout title={title}>
			<header>
				<video
					autoPlay
					loop
					muted
					disablePictureInPicture
					disableRemotePlayback
					playsInline
					src="/media/video/trailer_recut.mp4"
					poster="/media/pictures/hero_backup_img.jpg"
					className="pointer-events-none w-full h-screen h-[100svh] object-cover relative"
				/>
				<div className="absolute inset-0 bg-black/[.2] flex flex-col gap-y-6 justify-center items-center">
					<img
						src="/media/pictures/cardsandtankardslogo.png"
						alt="Cards & Tankards logo"
						className="sm:max-w-2xl px-3 "
					/>
					<p className="text-white relative text-xl sm:text-3xl font-bold p-4 border-2 -skew-y-3 uppercase drop-shadow">
						Download for free
					</p>
					<div className="max-w-xl flex flex-col gap-y-2 sm:flex-row sm:gap-x-4 pt-6">
						<a
							className="font-bold uppercase bg-black/[.6] rounded-md text-white py-5 px-4 flex items-center justify-center gap-x-2 border border-black hover:ease duration-300  hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/50"
							href={addUtm(
								"https://www.meta.com/experiences/3073319699437112/"
							)}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/media/pictures/meta_logo.png"
								alt="Meta logo"
								className="w-6"
							/>
							Download for Quest
						</a>
						<a
							className="font-bold uppercase bg-black/[.6] rounded-md text-white py-5 px-4 flex items-center justify-center gap-x-2 border border-black hover:ease duration-300 hover:border hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/50"
							href={addUtm(
								"https://store.steampowered.com/app/1506850/Cards__Tankards/"
							)}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/media/pictures/steam_logo.png"
								alt="Steam logo"
								className="w-6"
							/>
							Download for Steam
						</a>
						<a
							className="font-bold uppercase bg-black/[.6] rounded-md text-white py-5 px-4 flex items-center justify-center gap-x-2 border border-black hover:ease duration-300 hover:border hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/50"
							href={addUtm(
								"https://play.google.com/store/apps/details?id=com.DivergentRealities.CardsTankards"
							)}
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/media/pictures/google_play_logo.png"
								alt="Google Play logo"
								className="w-6"
							/>
							Download for Google Play
						</a>
					</div>
				</div>

				<div className="relative w-full h-[65vh] md:h-[55vh] subheader-bg">
					<div className="absolute inset-0 w-full bg-black/[.8] backdrop-blur-xl flex items-center">
						<div className="text-center w-full border-y-2 border-gray-300 py-14 2xl:py-16 text-white flex flex-col gap-y-5 items-center">
							<h1 className="text-4xl px-6 sm:text-5xl 2xl:text-6xl font-bold">
								Welcome to Cards & Tankards
							</h1>
							<p className="max-w-prose px-6 sm:font-semibold 2xl:text-lg">
								Relax and play Virtual Reality’s first social Collectible Card
								Game (CCG) where long-term bonds can be forged through battle!
								Grab a starting deck and face off against other Adventurers, or
								challenge the AI, to earn powerful cards based on the rich
								history of a mysterious fantasy realm.
							</p>
						</div>
					</div>
				</div>
			</header>

			<main className="py-16 sm:py-28">
				<h2 className="pb-20 sm:pb-28 font-bold text-4xl text-center sm:text-5xl">
					Game Features
				</h2>
				<div className="pb-12 md:max-w-screen-2xl  flex flex-col mx-auto gap-y-20 px-8 md:px-10 justify-around lg:flex-row gap-x-10">
					<div className="flex flex-col gap-y-4 lg:max-w-fit">
						<div className="taverns shadow1 h-96" />
						<div className="mx-auto text-center">
							<h3 className="font-semibold text-2xl">Taverns</h3>
							<p className="max-w-sm p-2">
								Meet up with old friends, or make some new ones. Watch others
								battle, and open up packs - it’s like hanging out at your local
								card store!
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-y-4 lg:max-w-fit">
						<div className="crossplay shadow1 h-96" />
						<div className="mx-auto text-center">
							<h3 className="font-semibold text-2xl">Crossplay</h3>
							<p className="max-w-sm p-2">
								Cross-platform multiplayer, making it easy to connect with
								friends on Quest or SteamVR.
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-y-4 lg:max-w-fit">
						<div className="moderation shadow1 h-96" />
						<div className="mx-auto text-center">
							<h3 className="font-semibold text-2xl">Moderation</h3>
							<p className="max-w-sm p-2">
								Our dedicated team of moderators are always on call and ready to
								resolve any issues. They help keep the community strong and
								enjoyable for everyone!
							</p>
						</div>
					</div>
				</div>

				<div className="max-w-screen-lg mx-auto border-b-2 border-gray-300 mb-16" />

				<div className="pb-28 sm:pb-40 max-w-screen-2xl mx-auto grid grid-cols-1 gap-y-14 gap-x-6 justify-items-center px-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-y-24">
					<div className="max-w-md">
						<video
							autoPlay
							loop
							muted
							disablePictureInPicture
							disableRemotePlayback
							playsInline
							src="/media/video/battle_pov.mp4"
							poster="/media/pictures/battle_pov_Moment.jpg"
							className="pointer-events-none object-cover rounded-t-full"
						/>
						<div className="text-center p-4 shadow-lg rounded-b-md">
							<h3 className="font-semibold uppercase text-2xl">
								Battle your friends
							</h3>
							<p className="max-w-sm py-2 mx-auto">
								Forge new friendships through battle as you test yourself
								against other adventurers.
							</p>
						</div>
					</div>
					<div className="max-w-md">
						<video
							autoPlay
							loop
							muted
							disablePictureInPicture
							disableRemotePlayback
							playsInline
							src="/media/video/pack_opening.mp4"
							poster="/media/pictures/pack_opening_Moment.jpg"
							className="pointer-events-none object-cover rounded-t-full"
						/>
						<div className="text-center p-4 shadow-lg rounded-b-md">
							<h3 className="font-semibold uppercase text-2xl">
								Unlock New Cards
							</h3>
							<p className="max-w-sm py-2 mx-auto">
								Add to your collection with booster packs, daily wins, or buying
								the Barkeeper’s Daily Cards.
							</p>
						</div>
					</div>
					<div className="max-w-md">
						<video
							autoPlay
							loop
							muted
							disablePictureInPicture
							disableRemotePlayback
							playsInline
							src="media/video/deck_editing.mp4"
							poster="/media/pictures/deck_editing_Moment.jpg"
							className="pointer-events-none object-cover rounded-t-full"
						/>
						<div className="text-center p-4 shadow-lg rounded-b-md">
							<h3 className="font-semibold uppercase text-2xl">
								Build Custom Decks
							</h3>
							<p className="max-w-sm py-2 mx-auto">
								Use your card colletion to build custom decks that suit your
								unique play style.
							</p>
						</div>
					</div>
					<div className="max-w-md">
						<video
							autoPlay
							loop
							muted
							disablePictureInPicture
							disableRemotePlayback
							playsInline
							src="media/video/progression_rewards.mp4"
							poster="/media/pictures/progression_rewards_Moment.jpg"
							className="pointer-events-none object-cover rounded-t-full"
						/>
						<div className="text-center p-4 shadow-lg rounded-b-md">
							<h3 className="font-semibold uppercase text-2xl">
								Progression Rewards
							</h3>
							<p className="max-w-sm py-2 mx-auto">
								Level up and get rewards by completing Quests and receive
								exclusive items with the Season Pass!
							</p>
						</div>
					</div>
					<div className="max-w-md">
						<video
							autoPlay
							loop
							muted
							disablePictureInPicture
							disableRemotePlayback
							playsInline
							src="/media/video/clothes.mp4"
							poster="/media/pictures/clothes_Moment.jpg"
							className="pointer-events-none object-cover rounded-t-full"
						/>
						<div className="text-center p-4 shadow-lg rounded-b-md">
							<h3 className="font-semibold uppercase text-2xl">
								Customize your avatar
							</h3>
							<p className="max-w-sm py-2 mx-auto">
								Unlock new outfits, gear and accessories to express yourself the
								way you want.
							</p>
						</div>
					</div>
					<div className="max-w-md">
						<video
							autoPlay
							loop
							muted
							disablePictureInPicture
							disableRemotePlayback
							playsInline
							src="/media/video/pets.mp4"
							poster="/media/pictures/pets_Moment.jpg"
							className="pointer-events-none object-cover rounded-t-full"
						/>
						<div className="text-center p-4 shadow-lg rounded-b-md">
							<h3 className="font-semibold uppercase text-2xl">Collect Pets</h3>
							<p className="max-w-sm py-2 mx-auto">
								Show off your favorite companions as they accompany you on your
								adventures.
							</p>
						</div>
					</div>
				</div>
				<div className="relative w-full h-[65vh] md:h-[55vh] community-bg">
					<div className="absolute inset-0 w-full bg-black/[.7] backdrop-blur-xl flex flex-col justify-center items-center gap-y-5 text-white text-center px-6">
						<h2 className="text-4xl sm:text-5xl font-bold">Community</h2>
						<p className="max-w-prose sm:font-semibold 2xl:text-lg">
							Take part in the discussion - be the first to hear about new
							updates, vote on upcoming features, and give us your feedback! We
							have a strong community built on trust and our mutual love of the
							game. So whether you’re a beginner looking for deck building
							advice, or a seasoned veteran looking to join tournaments for
							exclusive prizes - our community welcomes you!
						</p>
						<a
							className="mt-4 max-w-fit font-bold uppercase bg-black/[.5] rounded-md text-white py-5 px-4 flex items-center justify-center gap-x-2 border hover:ease duration-300 hover:border hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/50"
							href="https://discord.gg/CardsAndTankards"
							target="_blank"
							rel="noopener noreferrer"
						>
							<img
								src="/media/pictures/discord_logo.png"
								alt="Discord logo"
								className="w-6"
							/>
							Join Our Discord Community
						</a>
					</div>
				</div>
				<div className="max-w-screen-2xl pt-28 sm:pt-36 pb-8 sm:pb-10 mx-auto">
					<div className="max-w-2xl mx-auto px-6">
						<div className="relative w-full h-0 pb-[56.25%]">
							<iframe
								loading="lazy"
								width="560"
								height="315"
								src="https://www.youtube-nocookie.com/embed/D4Jk7NgK8N4"
								title="Cards & Tankards Trailer"
								allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
								allowFullScreen
								className="absolute w-full h-full"
							></iframe>
						</div>
						<div className="pt-8 flex flex-col gap-y-2 sm:gap-x-4 sm:justify-center sm:flex-row sm:gap-x-4">
							<a
								className="mx-auto sm:mx-0 font-bold uppercase bg-black/[.9] rounded-md text-white py-5 px-4 flex items-center justify-center gap-x-2 border border-black hover:ease duration-300 hover:border hover:border-amber-500 hover:shadow-lg hover:shadow-amber-700/50"
								href={addUtm(
									"https://www.meta.com/experiences/3073319699437112/"
								)}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src="/media/pictures/meta_logo.png"
									alt="Meta logo"
									className="w-6"
								/>
								Download for Quest
							</a>
							<a
								className="mx-auto sm:mx-0 font-bold uppercase bg-black/[.9] rounded-md text-white py-5 px-4 flex items-center justify-center gap-x-2 border border-black hover:ease duration-300 hover:border hover:border-amber-500 hover:shadow-lg hover:shadow-amber-700/50"
								href={addUtm(
									"https://store.steampowered.com/app/1506850/Cards__Tankards"
								)}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src="/media/pictures/steam_logo.png"
									alt="Steam logo"
									className="w-6"
								/>
								Download for Steam
							</a>
							<a
								className="font-bold uppercase bg-black/[.9] rounded-md text-white py-5 px-4 flex items-center justify-center gap-x-2 border border-black hover:ease duration-300 hover:border hover:border-amber-500 hover:shadow-lg hover:shadow-amber-500/50"
								href={addUtm(
									"https://play.google.com/store/apps/details?id=com.DivergentRealities.CardsTankards"
								)}
								target="_blank"
								rel="noopener noreferrer"
							>
								<img
									src="/media/pictures/google_play_logo.png"
									alt="Google Play logo"
									className="w-6"
								/>
								Download for Google Play
							</a>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
}
