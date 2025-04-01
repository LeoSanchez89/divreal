import Layout from "../components/layout";
import Link from "next/link";

const Confirmation = () => {
	const title = "Cards & Tankards - Message Sent";
	return (
		<Layout title={title}>
			<section className="relative w-full h-screen confirmation-bg">
				<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black backdrop-blur-sm flex flex-col justify-center items-center text-center pb-28">
					<div>
						<h1 className="text-white text-4xl sm:text-5xl 2xl:text-6xl font-bold">
							Thank You!
						</h1>
						<p className="text-white sm:font-semibold 2xl:text-lg max-w-prose mx-auto px-8 py-2 pb-7 md:py-3 md:pb-8 md:p-x-0">
							Your message has been sent. Be sure to check your inbox and spam
							folders so you don&apos;t miss us. See you in the Taverns.
						</p>
						<Link
							href="/"
							className="uppercase text-white font-bold border py-2 px-4 rounded hover:ease duration-300 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-700/50"
						>
							Take me home
						</Link>
					</div>
				</div>
			</section>
		</Layout>
	);
};

export default Confirmation;
