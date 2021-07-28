import S from '@sanity/desk-tool/structure-builder';
import { MapPreview } from './MapPreview';
import { DocumentJsonPreview } from './views/DocumentJsonPreview';
import { WebPreview } from './views/WebPreview';

export const getViews = (type: 'page' | 'document', schemaType: string) => [
	S.view.form(),
	S.view.component(DocumentJsonPreview).title('JSON'),
	type === 'page' && S.view.component(WebPreview).title('Web'),
	schemaType === 'land-document' &&
		S.view.component(MapPreview).title('Risicokaart'),
];
