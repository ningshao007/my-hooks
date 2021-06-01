import { useState, useEffect, useRef } from 'react';

function useHover() {
	const [value, setValue] = useState(false);
	const ref = useRef(null);

	const handleMouseOver = () => setValue(true);
	const handleMouseOut = () => setValue(false);

	useEffect(() => {
		const node = ref.current;
		if (node) {
			node.addEventListener('mouseover', handleMouseOut);
			node.addEventListener('mouseout', handleMouseOut);

			return () => {
				node.removeEventListener('mouseover', handleMouseOver);
				node.removeEventListener('mouseout', handleMouseOver);
			};
		}
	}, [ref.current]);
}
