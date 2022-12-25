# svelte-animated-details

Add smooth animations to your `<details>` elements using one line of Svelte. Built on CSS variables, the animation is completely customizable with CSS transitions.

**Demo**: [https://andrewlester.net/svelte-animated-details/](https://andrewlester.net/svelte-animated-details/)

## Configuration

Things you must do:
- Give your `<details>` element `overflow: hidden` or `overflow: clip`.
- Use the `--summary-height` and `--full-height` CSS variables for the default and `open` states respectfully.
- Give the CSS variables defaults of `auto` so that everything works even if JS is disabled.
- Add a `transition` to the default state.

An example configuration is shown below:

```html
<details>
    <summary>Details</summary>
    <p>Content</p>
</details>

<style>
    details {
        height: var(--summary-height, auto);
        overflow: hidden;
        transition: height 400ms ease-out;
    }

    details[open] {
        height: var(--full-height, auto);
    }
</style>
```


