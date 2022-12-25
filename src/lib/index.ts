export default function animatedDetails(element: HTMLDetailsElement) {
	const summary = element.querySelector('summary');
	if (!summary) return;

	element.style.setProperty('--summary-height', summary.clientHeight + 'px');
	element.open = true;
	element.style.setProperty('--full-height', element.clientHeight + 'px');
	element.open = false;

	const onClick = async (e: MouseEvent) => {
		if (!element.open) return;

		e.preventDefault();

		element.style.height = summary.clientHeight + 'px';

		await transitionsFinished(element);

		element.open = false;
		element.style.height = '';
	};

	summary.addEventListener('click', onClick);

	return {
		destroy() {
			summary.removeEventListener('click', onClick);
		}
	};
}

async function transitionsFinished(element: HTMLElement) {
	return new Promise<void>((resolve) => {
		element.addEventListener(
			'transitionend',
			(e: TransitionEvent) => {
				if (e.propertyName === 'height') {
					resolve();
				}
			},
			{ once: true }
		);
	});
}
