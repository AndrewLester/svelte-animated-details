import type { ActionReturn } from 'svelte/action';

type AnimatedDetailsOptions = Pick<KeyframeAnimationOptions, 'duration' | 'easing'>;

type EventHandler = (e: CustomEvent<HTMLDetailsElement>) => void;

type Attributes = {
	'on:openstart'?: EventHandler;
	'on:openend'?: EventHandler;
	'on:closestart'?: EventHandler;
	'on:closeend'?: EventHandler;
};

const defaultOptions: AnimatedDetailsOptions = {
	duration: 400,
	easing: 'ease-out'
};

export default function animatedDetails(
	element: HTMLDetailsElement,
	options: Partial<AnimatedDetailsOptions> = defaultOptions
): ActionReturn<AnimatedDetailsOptions, Attributes> {
	const summary = element.querySelector('summary');
	if (!summary) return {};

	options = {
		...defaultOptions,
		...options
	};

	const { overflow } = getComputedStyle(element);

	if (overflow !== 'hidden' && overflow !== 'clip') {
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

		const heightKeyframes = [`${summary.clientHeight}px`, `${element.clientHeight}px`];

		if (!opening) {
			heightKeyframes.reverse();
		}

		const animation = element.animate(
			{
				height: heightKeyframes
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
					element.open = false;
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
		update(newOptions: Partial<AnimatedDetailsOptions> = defaultOptions) {
			options = {
				...options,
				...newOptions
			};
		}
	};
}
