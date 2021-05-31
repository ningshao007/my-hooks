import { useState, useCallback } from 'react';

const useToggler = (initialValue) => {
	const [value, setValue] = useState(initialValue);
	const toggleValue = useCallback(() => setValue((prev) => !prev), []);

	return [value, toggleValue];
};
