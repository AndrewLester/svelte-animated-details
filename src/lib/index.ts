const dangerousAttributes = new Set(['class', 'style', 'id', 'hidden', 'height', 'width']);
const summaryHeightVar = '--summary-height';
const fullHeightVar = '--full-height';

export default function animatedDetails(element: HTMLDetailsElement) {
	const summary = element.querySelector('summary');
	if (!summary) return;

	const measureHeights = () => {
		const summaryHeight = summary.clientHeight + 'px';

		if (element.style.getPropertyValue(summaryHeightVar) !== summaryHeight) {
			element.style.setProperty(summaryHeightVar, summaryHeight);
		}

		const wasOpen = element.open;

		if (!wasOpen) {
			element.open = true;
		} else {
			element.style.setProperty(fullHeightVar, '');
		}

		const fullHeight = element.scrollHeight + 'px';

		element.style.setProperty(fullHeightVar, fullHeight);

		if (!wasOpen) {
			element.open = false;
		}
	};

	const onClick = async (e: MouseEvent) => {
		if (!element.open) return;

		e.preventDefault();

		element.style.height = summary.clientHeight + 'px';

		await transitionsFinished(element);

		element.style.height = '';
		element.open = false;
	};

	const onMutate: MutationCallback = (mutations) => {
		for (const mutation of mutations) {
			if (mutation.type !== 'childList' && mutation.type !== 'attributes') {
				continue;
			}

			if (mutation.type === 'attributes' && mutation.target === element) continue;

			if (
				mutation.type === 'attributes' &&
				!dangerousAttributes.has(mutation.attributeName ?? '')
			) {
				continue;
			}

			measureHeights();
		}
	};

	const observer = new MutationObserver(onMutate);

	measureHeights();

	summary.addEventListener('click', onClick);
	observer.observe(element, {
		attributes: true,
		subtree: true,
		childList: true
	});

	return {
		destroy() {
			summary.removeEventListener('click', onClick);
			observer.disconnect();
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
