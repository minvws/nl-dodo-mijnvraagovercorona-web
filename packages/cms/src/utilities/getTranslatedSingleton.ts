export const getTranslatedSingleton = (
	S,
	{
		title,
		type,
		icon,
	}: {
		title: string;
		type: string;
		icon?: any;
	},
) =>
	S.listItem()
		.id(type)
		.title(title)
		.icon(icon)
		.schemaType(type)
		.child(
			S.documentTypeList(type)
				.initialValueTemplates([])
				.menuItems([
					S.menuItem()
						.title('Make')
						.intent({
							type: 'create',
							params: {
								type: type,
								id: type,
								template: type,
							},
						})
						.showAsAction(true),
				])
				.defaultOrdering([{ field: '_createdAt', direction: 'desc' }])
				.title(title)
				.filter(`_type == $type && (_id == $id || _id == 'drafts.'+$id)`)
				.params({
					id: type,
					type: type,
				}),
		);
