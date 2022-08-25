import S from '@sanity/desk-tool/structure-builder';
import { MapPreview } from './MapPreview';
import { DocumentJsonPreview } from './views/DocumentJsonPreview';
import { WebPreview } from './views/WebPreview';

export const getViews = (type: 'page' | 'document', schemaType: string) => {
	const views = [
		S.view.form(),
		S.view.component(DocumentJsonPreview).title('JSON'),
	];

	if (type === 'page')
		views.push(S.view.component(WebPreview).title('Preview'));
	if (schemaType === 'land-document')
		views.push(S.view.component(MapPreview).title('Risicokaart'));

	return views;
};
