import { useState, useRef, useEffect } from 'react';

const useUnload = (fn) => {
	const cb = useRef(fn);

	useEffect(() => {
		const onUnload = cb.current;
		window.addEventListener('beforeunload', onUnload);
		return () => {
			window.removeEventListener('beforeunload', onUnload);
		};
	}, [cb]);
};

const App = () => {
	useUnload((e) => {
		e.preventDefault();
		const exit = confirm('Are you sure you want to leave?');
		if (exit) window.close();
	});
	return <div>Try closing the window.</div>;
};
