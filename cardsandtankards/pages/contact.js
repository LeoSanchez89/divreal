import Layout from "../components/layout";
import { useState, useEffect } from "react";

const Contact = () => {
	const title = "Cards & Tankards - Contact Us";
	const [userName, setUserName] = useState();
	const [url, setUrl] = useState("");
	const handleChange = (e) => {
		e.preventDefault();
		setUserName(e.target.value);
	};
	useEffect(() => {
		const currentUrl = window.location.origin;
		setUrl(currentUrl);
	}, []);

	return (
		<Layout title={title}>
			<section className="pb-16 sm:pb-40 bg-slate-100 overflow-x-hidden">
				<header className="relative w-full h-[40vh] md:h-[50vh] subheader-bg">
					<div className="absolute inset-0 bg-gradient-to-b from-transparent to-black flex flex-col justify-end pb-28 md:pb-0">
						<h1 className="text-white text-center text-4xl sm:text-5xl 2xl:text-6xl font-bold md:pb-8 ">
							Contact Us
						</h1>
					</div>
					<div className="absolute inset-x-0 bottom-0 md:-bottom-8 md:pb-2 lg:pb-0">
						<p className="text-white sm:font-semibold 2xl:text-lg text-center max-w-prose mx-auto px-6 pb-6 md:p-0 ">
							We&apos;re here for you! Our dedicated team is committed to
							resolving any issues or inquiries you may have. Send us a message
							below.
						</p>
					</div>
				</header>
				<div className="hidden md:block border-l-transparent border-r-transparent border-t-black border-t-[8vw] border-l-[50vw] border-r-[50vw]" />
				<div className="mt-10 md:mt-20 mx-6 px-6 py-8 md:p-14 max-w-screen-md md:mx-auto border border-gray-200 bg-white shadow-md rounded">
					<form
						action="https://formsubmit.co/support@divergent-realities.com"
						method="POST"
					>
						<div className="md:flex md:justify-between md:gap-x-8 md:mb-4 ">
							<div className="flex flex-col mb-4 w-full ">
								<label
									className="text-gray-700 text-sm font-bold mb-2 ml-2"
									htmlFor="username"
								>
									Username
								</label>
								<input
									onChange={handleChange}
									id="username"
									label="Username"
									type="text"
									name="username"
									placeholder="Username*"
									autoComplete="off"
									required
									className="shadow appearance-none border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-orange-200 focus:shadow-outline"
								/>
							</div>
							<div className="flex flex-col mb-4 w-full">
								<label
									className="text-gray-700 text-sm font-bold mb-2 ml-2"
									htmlFor="email"
								>
									{" "}
									Email Address
								</label>
								<input
									id="email"
									label="Email Address*"
									type="email"
									name="email"
									placeholder="Email Address*"
									autoComplete="off"
									required
									className="shadow appearance-none border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-orange-200 focus:shadow-outline"
								/>
							</div>
						</div>
						<div className="flex flex-col mb-6 md:mb-10">
							<label
								className="text-gray-700 text-sm font-bold mb-2 ml-2"
								htmlFor="message"
							>
								Your Message
							</label>
							<textarea
								id="message"
								multiline="true"
								label="Your Message"
								placeholder="Your Message*"
								name="message"
								rows="7"
								autoComplete="off"
								required
								className="shadow appearance-none border border-gray-200 rounded py-2 px-3 text-gray-700 leading-tight focus:outline-orange-200 focus:shadow-outline"
							/>
						</div>
						<div className="md:flex md:justify-center">
							<input
								type="hidden"
								name="_autoresponse"
								value="The Divergent Realities Support Team has received your request. Please allow 24-48 hours for our team to review and respond."
							/>
							<input
								type="hidden"
								name="_subject"
								value={`New Support Message from ${userName}`}
							/>
							<input type="hidden" name="_next" value={`${url}/confirmation`} />
							<button
								type="submit"
								className="cursor-pointer w-full md:w-2/5 bg-amber-800 text-white font-bold py-2 px-4 rounded hover:ease-in-out duration-300 border hover:border hover:border-amber-500 hover:shadow-lg hover:shadow-amber-700/50 hover:bg-amber-700"
							>
								Send Message
							</button>
						</div>
					</form>
				</div>
			</section>
		</Layout>
	);
};

export default Contact;
