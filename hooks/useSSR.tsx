import { useState, useRef, useEffect } from 'react';

const isBrowser = !!(
	typeof window !== 'undefined' &&
	window.document &&
	window.document.createElement
);

const useSSR = () => {
	const [inBrowser, setInBrowser] = useState(isBrowser);

	useEffect(() => {
		setInBrowser(isBrowser);
		return () => {
			setInBrowser(false);
		};
	}, []);

	return [inBrowser, !inBrowser];
};
