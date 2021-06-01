import { useState, useEffect, useRef, memo } from 'react';

const Counter = memo((props) => {
	useWhyDidYouUpdate('Counter', props);
	return <div style={props.style}>{props.count}</div>;
});

function App() {
	const [count, setCount] = useState(0);
	const [userId, setUserId] = useState(0);

	const counterStyle = {
		fontSize: '3rem',
		color: 'red',
	};

	return (
		<div>
			<Counter count={count} style={counterStyle} />
			<button onClick={() => setCount(count + 1)}>+</button>
			<button onClick={() => setUserId(userId + 1)}>switch user</button>
		</div>
	);
}

function useWhyDidYouUpdate(name, props) {
	const previousProps = useRef();

	useEffect(() => {
		if (previousProps.current) {
			const allKeys = Object.keys({ ...previousProps.current, ...props });
			const changesObj = {};
			allKeys.forEach((key) => {
				if (previousProps.current[key] !== props[key]) {
					changesObj[key] = {
						from: previousProps.current[key],
						to: props[key],
					};
				}
			});

			if (Object.keys(changesObj).length) {
				console.log('[why-did-you-update]', name, changesObj);
			}
		}

		previousProps.current = props;
	});
}
