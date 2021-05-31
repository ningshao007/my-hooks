import { useState, useRef, useEffect } from 'react';

const useComponentWillUnmount = (onUnmountHandler) => {
	useEffect(() => {
		return () => onUnmountHandler();
	}, []);
};
