import Head from "next/head";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

const Layout = (props) => (
	<html lang="en">
		<Head key={props.title}>
			<title>{props.title || "Cards & Tankards - Divergent Realities"}</title>
			<meta
				name="description"
				content="Virtual Reality’s first Social Collectible Card Game! Face off against AI or other Adventurers. Unlock cards, create unique decks and forge new friendships through battle!"
			/>
			<meta
				name="author"
				content="Designed and Developed by: Leandro Sanchez, Jason Corchado"
			/>
			<meta name="viewport" content="width=device-width, initial-scale=1" />
			<link rel="shortcut icon" href="/favicon.ico" />
			<link rel="icon" sizes="16x16 32x32 64x64" href="/favicon.ico" />
			<link
				rel="icon"
				type="image/png"
				sizes="196x196"
				href="/favicon-192.png"
			/>
			<link
				rel="icon"
				type="image/png"
				sizes="160x160"
				href="/favicon-160.png"
			/>
			<link rel="icon" type="image/png" sizes="96x96" href="/favicon-96.png" />
			<link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
			<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
			<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16.png" />
			<link rel="apple-touch-icon" href="/favicon-57.png" />
			<link rel="apple-touch-icon" sizes="114x114" href="/favicon-114.png" />
			<link rel="apple-touch-icon" sizes="72x72" href="/favicon-72.png" />
			<link rel="apple-touch-icon" sizes="144x144" href="/favicon-144.png" />
			<link rel="apple-touch-icon" sizes="60x60" href="/favicon-60.png" />
			<link rel="apple-touch-icon" sizes="120x120" href="/favicon-120.png" />
			<link rel="apple-touch-icon" sizes="76x76" href="/favicon-76.png" />
			<link rel="apple-touch-icon" sizes="152x152" href="/favicon-152.png" />
			<link rel="apple-touch-icon" sizes="180x180" href="/favicon-180.png" />
			<link rel="preconnect" href="https://fonts.googleapis.com" />
			<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
			<link
				href="https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap"
				rel="stylesheet"
			/>
			<meta name="msapplication-TileColor" content="#FFFFFF" />
			<meta name="msapplication-TileImage" content="/favicon-144.png" />
			<meta name="msapplication-config" content="/browserconfig.xml" />
		</Head>
		<Navbar />
		<body className="overflow-x-hidden">{props.children}</body>
		<Footer />
	</html>
);

export default Layout;
