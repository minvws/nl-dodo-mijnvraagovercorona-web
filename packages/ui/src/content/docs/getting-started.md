---
title: Getting Started
---

## Prerequisites

If you're installing DODO-UI with a package manager you'll need to have Node.js installed. DODO-UI is tested against the latest Long Term Support version of Node, currently at 20.
The components in DODO-UI are written in [Astro](https://astro.build) and the styling is taken care of by [Sass](https://sass-lang.com).

## Installation

DODO-UI is not distributed trough NPM so you have to install it directly via git:

```javascript
// package.json
{
	"name": "your-project",
	"private": true,
	"dependencies": {
		"@dodo/ui": "git+https://github.com/minvws/nl-dodo-ui.git#semver:^1.0.0",
	}
}
```

## Setup

### Configuring Astro

Our icons are rendered by [astro-icon](https://www.astroicon.dev) so you need to install the package and configure the plugin in your `astro.config` file.

```javascript
// astro.config.mjs
import icon from 'astro-icon';

export default defineConfig({
	integrations: [
		icon({
			iconDir: './node_modules/@dodo/ui/src/lib/elements/Icon/icons',
		}),
	],
});
```

### Configuring postcss

DODO-UI depends on [postcss-custom-media](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media) for breakpoints.

```javascript
// postcss.config.cjs
module.exports = {
	plugins: [require('postcss-custom-media')],
};
```

### Import `globals.scss` in your layout

`globals.scss` primes your project with a nice reset and makes all CSS custom properties(see [`Primitives`](/primitives)) available for you to use in your project.

```javascript
// Layout.astro
import '@dodo/ui/styles/globals.scss';
```

## Using `Elements` & `Components`

You can import any component from the [`Elements`](/elements) and [`Components`](/components) layer by importing them from their respective folders:

```javascript
// YourTemplate.astro
import '@dodo/ui/elements/Heading';

<Heading>Your content</Heading>;
```

```javascript
// YourTemplate.astro
import '@dodo/ui/components/Stack';

<Stack>Your content</Stack>;
```

## Styling & (S)CSS

DODO-UI is built using the [Sass module system](https://css-tricks.com/introducing-sass-modules/) and it is advised to structure your application the same way.
DODO-UI comes with a couple of handy (S)CSS mixins & functions which you can use in your own components.

### Responsive breakpoints

DODO-UI depends on [postcss-custom-media](https://github.com/csstools/postcss-plugins/tree/main/plugins/postcss-custom-media) for breakpoints.

```scss
// your-component.scss
@use '@dodo/ui/styles/primitives/responsive';

.your-selector {
	@media (--mq-large) {
		// styles applied to large screens
	}
}
```

**Note**: When you want to use a breakpoint in an isolated Astro component you'll always need to `@use` the `primitives/responsive` file like this:

```javascript
// YourComponent.Astro
<div class="your-astro-component">
	<slot />
</div>

<style lang="scss">
	@use '@dodo/ui/styles/primitives/responsive';

	.your-astro-component {
		@media (--mq-large) {
			// styles applied to large screens
		}
	}
</style>
```

This way the custom-media query will be picked up by postcss and be polyfilled by a normal media query.

### Convert pixels to REM

```scss
// your-component.scss
@use '@dodo/ui/styles/tools/rem';

.your-selector {
	// If you want to use a rem value in a custom property you'll need to interpolate:
	--your-custom-property: #{rem.convert(24px)};
	// In normal properties you don't:
	margin-block-end: rem.convert(120px);
}
```

### Accessibility helpers

DODO-UI cares a lot about their users so we also expose 2 handy accessibility helpers to use in your components.

Interactive elements such as links and buttons should have a consistent focus style which you can include in your project like this:

```scss
// your-component.scss
@use '@dodo/ui/styles/tools/a11y';

.your-selector {
	&:focus {
		@include a11y.focusring;
	}
}
```

Sometimes you want to hide an element visually but still communicate textual meaning to the user, eg. icon-only buttons/links.

```scss
// your-component.scss
@use '@dodo/ui/styles/tools/a11y';

.your-selector {
	// hide the span visually but maintain meaning for screenreader users
	span {
		@include a11y.visually-hidden;
	}
}
```

**Note**: we also provide a utility class for this purpose: `u-visually-hidden`.
