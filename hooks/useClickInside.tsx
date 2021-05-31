// Handles the event of clicking inside/outside the wrapped component

import { useState, useRef, useEffect } from 'react';

const useClickInside = (ref, callback) => {
	const handleClick = (e) => {
		if (ref.current && ref.current.contains(e.target)) {
			callback();
		}
		// !outside
		// if (ref.current && !ref.current.contains(e.target)) {
		// 	callback();
		// }
	};

	useEffect(() => {
		document.addEventListener('click', handleClick);
		return () => {
			document.removeEventListener('click', handleClick);
		};
	});
};

const ClickBox = () => {
	const clickRef = useRef();
	const onClickInside = () => {};
	useClickInside(clickRef, onClickInside);
	return (
		<div
			className='click-box'
			ref={clickRef}
			style={{
				border: '2px dashed orangered',
				height: 200,
				width: 400,
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
			}}>
			<p>Click inside this element</p>
		</div>
	);
};
