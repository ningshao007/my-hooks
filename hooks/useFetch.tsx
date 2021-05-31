import { useState, useRef, useEffect } from 'react';

const useFetch = (url, options) => {
	const [response, setResponse] = useState(null);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const res = await fetch(url, options);
				const json = await res.json();
				setResponse(json);
			} catch (error) {
				setError(error);
			}
		};
	}, []);

	return { response, error };
};

const ImageFetch = (props) => {
	const res = useFetch('https://dog.ceo/api/breeds/image/random', {});
	if (!res.response) {
		return <div>Loading...</div>;
	}
	const imageUrl = res.response.message;
	return (
		<div>
			<img src={imageUrl} alt='avatar' width={400} height='auto' />
		</div>
	);
};
