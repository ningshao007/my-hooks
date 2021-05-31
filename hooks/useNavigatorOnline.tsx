import { useState, useEffect, useRef } from 'react';

const getOnLineStatus = () => {
	typeof navigator !== 'undefined' && typeof navigator.onLine === 'boolean'
		? navigator.onLine
		: true;
};

const useNavigatorOnLine = () => {
	const [status, setStatus] = useState(getOnLineStatus);
	const setOnline = () => setStatus(true);
	const setOffLine = () => setStatus(false);

	useEffect(() => {
		window.addEventListener('online', setOnline);
		window.addEventListener('offline', setOffLine);

		return () => {
			window.removeEventListener('online', setOnline);
			window.removeEventListener('offline', setOffLine);
		};
	}, []);

	return status;
};
