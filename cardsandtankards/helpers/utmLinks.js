import { useState, useEffect } from "react";

const useUtmLinks = (defaultSource = "website") => {
	const [utm, setUtm] = useState("");

	useEffect(() => {
		const url = window.location.href;

		if (url.includes("?utm_")) {
			const params = url.slice(url.indexOf("?") + 1); // remove leading "?"
			setUtm(params);
		} else {
			setUtm(`utm_source=${defaultSource}`);
		}
	}, [defaultSource]);

	const addUtm = (baseUrl) => {
		if (!utm) return baseUrl;
		const sep = baseUrl.includes("?") ? "&" : "?";
		return `${baseUrl}${sep}${utm}`;
	};

	return { utm, addUtm };
};

export default useUtmLinks;
