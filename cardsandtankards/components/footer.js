import Link from "next/link";
const Footer = () => {
	return (
		<footer>
			<div className="max-w-screen-xl px-6 text-sm mx-auto py-6 border-t-2 border-gray-200 flex flex-col gap-y-2 text-center items-center sm:flex-row sm:text-left sm:justify-between">
				<p>© Divergent Realities, LLC 2021-2022.</p>
				<div className="flex gap-x-2">
					<Link
						href="/privacy_policy"
						className="text-blue-600 underline hover:no-underline"
					>
						Privacy Policy
					</Link>
					<Link
						href="/contact"
						className="text-blue-600 underline hover:no-underline"
					>
						Contact Us
					</Link>
				</div>
				<p>
					Website Credits:{" "}
					<a
						href="https://leandro-sanchez.com"
						target="_blank"
						rel="noreferrer noopener"
						className="text-blue-600 underline hover:no-underline"
					>
						Leandro Sanchez
					</a>{" "}
					&{" "}
					<a
						href="https://github.com/JasonCorchado"
						target="_blank"
						rel="noreferrer noopener"
						className="text-blue-600 underline hover:no-underline"
					>
						Jason Corchado
					</a>
				</p>
			</div>
		</footer>
	);
};

export default Footer;
