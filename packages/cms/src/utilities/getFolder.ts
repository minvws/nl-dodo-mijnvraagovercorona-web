import S from '@sanity/desk-tool/structure-builder';

export const getFolder = ({
	title,
	items,
	icon,
}: {
	title: string;
	items: any;
	icon?: any;
}) =>
	S.listItem()
		.title(title)
		.icon(icon)
		.child(S.list().title(title).items(items));
