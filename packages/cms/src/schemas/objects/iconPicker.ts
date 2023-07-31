import { defineType } from 'sanity';

export default defineType({
	title: 'Icoon kiezer',
	name: 'iconPicker',
	type: 'string',
	options: {
		list: [
			{ title: 'Home', value: 'home' },
			{ title: 'Refresh', value: 'refresh' },
			{ title: 'Plus', value: 'plus' },
			{ title: 'Minus', value: 'minus' },
			{ title: 'Cross', value: 'cross' },
			{ title: 'External', value: 'external' },
			{ title: 'Tooltip', value: 'tooltip' },
			{ title: 'Chevron-large-left', value: 'chevron-large-left' },
			{ title: 'Chevron-large-right', value: 'chevron-large-right' },
			{ title: 'Chevron-small-left', value: 'chevron-small-left' },
			{ title: 'Chevron-small-right', value: 'chevron-small-right' },
			{ title: 'Chevron-small-down', value: 'chevron-small-down' },
			{ title: 'Arrow right', value: 'arrow-right' },
			{ title: 'World', value: 'world' },
			{ title: 'Phone', value: 'phone' },
			{ title: 'Chat', value: 'chat' },
			{ title: 'Video', value: 'video' },
			{ title: 'Burger', value: 'burger' },
			{ title: 'Looking glass', value: 'looking-glass' },
			{ title: 'Copy', value: 'copy' },
			{ title: 'Mondmasker', value: 'facemask' },
			{ title: 'Hart', value: 'heart' },
			{ title: 'Paspoort', value: 'passport' },
			{ title: 'Auto', value: 'car' },
			{ title: 'Vaccin prik', value: 'vaccin-shot' },
			{ title: 'Marker', value: 'marker' },
			{ title: 'Post-covid', value: 'post-covid' },
			{ title: 'Reizen', value: 'reizen' },
			{ title: 'Vaccineren', value: 'vaccineren' },
			{ title: 'Kwetsbare gezondheid', value: 'kwetsbare-gezondheid' },
			{ title: 'Zelftest en Klachten', value: 'zelftest-en-klachten' },
			{ title: 'Cookie', value: 'cookie' },
			{ title: 'Info', value: 'info' },
		],
	},
});
