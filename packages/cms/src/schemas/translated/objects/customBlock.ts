import { FiLink } from 'react-icons/fi';
import { VscScreenFull } from 'react-icons/vsc';

const generate = (
	name: string = 'customBlock',
	includeModalSelector: boolean = true,
) => ({
	title: 'Content',
	name,
	type: 'array',
	of: [
		{
			type: 'block',
			styles: [
				{
					title: 'Heading 2',
					value: 'h2',
				},
				{
					title: 'Heading 3',
					value: 'h3',
				},
				{
					title: 'Span',
					value: 'span',
				},
				{
					title: 'Small',
					value: 'small',
				},
			],
			marks: {
				annotations: [
					// Link
					{
						name: 'link',
						type: 'object',
						title: 'Link',
						blockEditor: {
							icon: FiLink,
						},
						fields: [
							{
								name: 'href',
								type: 'string',
								validation: (Rule) => Rule.required(),
							},
							{ name: 'button', type: 'boolean' },
						],
					},
					...(includeModalSelector
						? [
								{
									name: 'dialog',
									type: 'object',
									title: 'Dialog',
									blockEditor: {
										icon: VscScreenFull,
									},
									fields: [
										{
											title: 'Selecteer modal',
											name: 'modal_ref',
											type: 'reference',
											to: [{ type: 'modals' }],
										},
									],
								},
						  ]
						: []),
				],
			},
		},
	],
});

export const customBlockObject = generate();
export const customBlockWithoutModalObject = generate(
	'customBlockWithoutModal',
	false,
);
