export const getTranslatedSingleton = (S, {
	title,
	type,
	icon,
}: {
	title: string;
	type: string;
	icon?: any;
}) =>
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
						.title('Edit')
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
				.title(title)
				.filter('_id == $id && _type == $type')
				.params({
					id: type,
					type: type,
				}),
		);
