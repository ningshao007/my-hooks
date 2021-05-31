import { useState, useEffect, useRef } from 'react';

const usePersistedState = (name, defaultValue) => {
	const [value, setValue] = useState(defaultValue);
	const nameRef = useRef(name);

	useEffect(() => {
		try {
			const storedValue = localStorage.getItem(name);
			if (storedValue !== null) {
				setValue(storedValue);
			} else {
				localStorage.setItem(name, defaultValue);
			}
		} catch {
			setValue(defaultValue);
		}
	}, []);

	useEffect(() => {
		try {
			localStorage.setItem(nameRef.current, value);
		} catch {}
	}, [value]);

	useEffect(() => {
		const lastName = nameRef.current;
		if (name !== lastName) {
			try {
				localStorage.setItem(name, value);
				nameRef.current = name;
			} catch {}
		}
	}, [name]);

	return [value, setValue];
};

const MyComponent = ({ name }) => {
	const [val, setVal] = usePersistedState(name, 10);
	return (
		<input
			value={val}
			onChange={(e) => {
				setVal(e.target.value);
			}}
		/>
	);
};

const MyApp = () => {
	const [name, setName] = useState('my-value');
	return (
		<>
			<MyComponent name={name} />
			<input
				value={name}
				onChange={(e) => {
					setName(e.target.vaue);
				}}
			/>
		</>
	);
};
