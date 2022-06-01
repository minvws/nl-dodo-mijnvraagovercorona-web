import S from '@sanity/desk-tool/structure-builder';

export const getFolder = ({ title, items }: { title: string; items: any }) =>
	S.listItem().title(title).child(S.list().title(title).items(items));
