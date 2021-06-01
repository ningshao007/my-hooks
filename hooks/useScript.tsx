import { useState, useEffect } from 'react';

function useScript(src) {
	const [status, setStatus] = useState(src ? 'loading' : 'idle');

	useEffect(() => {
		if (!src) {
			setStatus('idle');
			return;
		}

		let script = document.querySelector(`script[src="${src}"]`);

		if (!script) {
			script = document.createElement('script');
			script.src = src;
			script.async = true;
			script.setAttribute('data-status', 'loading');
			document.body.appendChild(script);

			const setAttributeFromEvent = (event) => {
				script.setAttribute(
					'data-status',
					event.type === 'load' ? 'ready' : 'error',
				);
			};

			script.addEventListener('load', setAttributeFromEvent);
			script.addEventListener('error', setAttributeFromEvent);
		} else {
			setStatus(script.getAttribute('data-status'));
		}

		const setStatusFromEvent = (event) => {
			setStatus(event.type === 'load' ? 'ready' : 'error');
		};

		script.addEventListener('load', setStatusFromEvent);
		script.addEventListener('error', setStatusFromEvent);

		return () => {
			if (script) {
				script.removeEventListener('load', setStatusFromEvent);
				script.removeEventListener('error', setStatusFromEvent);
			}
		};
	}, []);
}
