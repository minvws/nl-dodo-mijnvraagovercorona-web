# DODO UI

## Prerequisites

If you're installing DODO-UI with a package manager you'll need to have Node.js installed. DODO-UI is tested against the latest Long Term Support version of Node, currently at 20.
The components in DODO-UI are written in [Astro](https://astro.build) and the styling is taken care of by [Sass](https://sass-lang.com).

## Installation

DODO-UI is not distributed trough NPM so you have to install it directly via git:

```javascript
// package.json
{
	"name": "your-astro-project",
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

## Contributing

### Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## Want to learn more?

[![Built with Starlight](https://astro.badg.es/v2/built-with-starlight/tiny.svg)](https://starlight.astro.build)

Check out [Starlight’s docs](https://starlight.astro.build/), or read [the Astro documentation](https://docs.astro.build).
