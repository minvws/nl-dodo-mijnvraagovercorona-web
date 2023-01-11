import S from '@sanity/desk-tool/structure-builder';

export const getTranslatedDocumentList = ({
	title,
	schemaType,
	icon,
}: {
	title: string;
	schemaType: string;
	icon?: any;
}) =>
	S.listItem()
		.title(title)
		.icon(icon)
		.child(
			S.documentList()
				.title(title)
				.schemaType(schemaType)
				.filter(`_type == "${schemaType}" && __i18n_lang == $baseLanguage`)
				.params({ baseLanguage: `nl` })
				.canHandleIntent(S.documentTypeList(schemaType).getCanHandleIntent()),
		);
