import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
	const hasWindow = typeof window !== 'undefined';

	function getWindowDimensions() {
		const width = hasWindow ? window.innerWidth : null;
		const height = hasWindow ? window.innerHeight : null;
		return {
			width,
			height,
		};
	}

	const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

	useEffect(() => {
		if (!hasWindow) return;
		if (hasWindow) {
			const handleResize = () => {
				setWindowDimensions(getWindowDimensions());
			};

			window.addEventListener('resize', handleResize);
			// eslint-disable-next-line consistent-return
			return () => window.removeEventListener('resize', handleResize);
		}
	}, [hasWindow]);

	return windowDimensions;
}
