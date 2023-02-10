import { defineType, defineField } from 'sanity';

export default defineType({
	title: 'Icon picker',
	name: 'iconPicker',
	type: 'object',      
    fields: [
        defineField({
            title: 'Icon list',
            name: 'iconList',
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
                    { title: 'World', value: 'world' },
                    { title: 'Phone', value: 'phone' },
                    { title: 'Chat', value: 'chat' },
                    { title: 'Video', value: 'video' },
                    { title: 'Burger', value: 'burger' },
                ],
            }
        }),
    ],
});
