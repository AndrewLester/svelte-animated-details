import type { ActionReturn } from 'svelte/action';
import { DEV } from 'esm-env';

type EventHandler = (e: CustomEvent<HTMLDetailsElement>) => void;

type Attributes = {
	'on:openstart'?: EventHandler;
	'on:openend'?: EventHandler;
	'on:closestart'?: EventHandler;
	'on:closeend'?: EventHandler;
};

const defaultOptions: KeyframeAnimationOptions = {
	duration: 400,
	easing: 'ease-out'
};

export default function animatedDetails(
	element: HTMLDetailsElement,
	options: KeyframeAnimationOptions = defaultOptions
): ActionReturn<KeyframeAnimationOptions, Attributes> {
	const summary = element.querySelector('summary');
	if (!summary) return {};

	options = {
		...defaultOptions,
		...options
	};

	const { overflow, writingMode } = getComputedStyle(element);

	if (overflow !== 'hidden' && overflow !== 'clip' && DEV) {
		console.warn(
			'Using animated details on a details element which does not use overflow hidden or clip.'
		);
	}

	let transitioning = false;

	const animatePanel = (opening: boolean) => {
		transitioning = true;

		if (opening) {
			element.open = true;
		}

		element.dispatchEvent(
			new CustomEvent(opening ? 'openstart' : 'closestart', { detail: element })
		);

		const blockSizeProperty = writingMode.startsWith('vertical') || writingMode.startsWith('tb') ? 'clientWidth' : 'clientHeight';

		const blockSizeKeyframes = [`${summary[blockSizeProperty]}px`, `${element[blockSizeProperty]}px`];

		if (!opening) {
			blockSizeKeyframes.reverse();
		}

		const animation = element.animate(
			{
				blockSize: blockSizeKeyframes
			},
			options
		);

		animation.oncancel =
			animation.onfinish =
			animation.onremove =
				() => {
					element.dispatchEvent(
						new CustomEvent(opening ? 'openend' : 'closeend', { detail: element })
					);

					if (!opening) {
						element.open = false;
					}

					transitioning = false;
				};
	};

	const onClick = (e: Event) => {
		e.preventDefault();

		if (transitioning) return;

		animatePanel(!element.open);
	};

	const onMutate: MutationCallback = (mutationList) => {
		for (const mutation of mutationList) {
			if (mutation.type === 'attributes' && mutation.attributeName === 'open') {
				if (transitioning) return;

				if (element.open) {
					animatePanel(true);
				}
			}
		}
	};

	const observer = new MutationObserver(onMutate);
	observer.observe(element, { attributes: true });
	summary.addEventListener('click', onClick);

	return {
		destroy() {
			observer.disconnect();
			summary.removeEventListener('click', onClick);
		},
		update(newOptions: KeyframeAnimationOptions = defaultOptions) {
			options = {
				...options,
				...newOptions
			};
		}
	};
}
