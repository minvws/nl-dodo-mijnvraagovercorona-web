import { defineType } from 'sanity';
import { icons } from '@mvoc/ui/types';

export default defineType({
	title: 'Icoon kiezer',
	name: 'iconPicker',
	type: 'string',
	options: {
		list: icons,
	},
});
