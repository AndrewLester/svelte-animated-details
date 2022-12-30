# svelte-animated-details

Add a smooth accordion animation to your `<details>` elements using one line of Svelte.

**Demo**: [https://andrewlester.net/svelte-animated-details/](https://andrewlester.net/svelte-animated-details/)

## Installation

    npm i -D svelte-animated-details

## Configuration

You must:
- Give your `<details>` element `overflow: hidden` or `overflow: clip`. You'll be warned in dev if you aren't.

An example configuration is shown below:

```html
<details use:animatedDetails>
    <summary>Summary</summary>
    <p>Content</p>
</details>

<style>
    details {
        overflow: hidden;
    }
</style>
```


