import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { visionTool } from '@sanity/vision';

import schemas from './src/schemas/schema';
import deskStructure from './src/deskStructure';

export default defineConfig({
	title: 'Prikken Zonder Afspraak',
	projectId: 'cc556vss',
	dataset: 'production',
	plugins: [
		deskTool({
			structure: deskStructure,
		}),
		visionTool(),
	],
	tools: (prev) => {
		// 👇 Uses environment variables set by Vite in development mode
		if (import.meta.env.DEV) {
			return prev;
		}

		return prev.filter((tool) => tool.name !== 'vision');
	},
	schema: {
		types: schemas,
	},
});
