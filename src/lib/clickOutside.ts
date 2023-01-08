const clickOutside = (node: HTMLElement) => {
	const handleClick = (event: { target: any }) => {
		if (!node.contains(event.target)) {
			node.dispatchEvent(
				new CustomEvent<{ target: HTMLElement }>('outclick', { detail: { target: node } })
			);
		}
	};

	document.addEventListener('click', handleClick, true);

	return {
		destroy() {
			document.removeEventListener('click', handleClick, true);
		}
	};
};

export default clickOutside;
