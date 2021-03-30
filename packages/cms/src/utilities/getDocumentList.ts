import S from '@sanity/desk-tool/structure-builder';
import { IconType } from 'react-icons';

import { getViews } from './getViews';

interface DocumentListProps {
	title: string;
	schemaType: string;
	icon: IconType;
}

interface GenericListProps extends DocumentListProps {
	type: 'document' | 'page';
}

/**
 * Generic function to render a list of documents
 */
const getGenericList = ({ schemaType, title, icon, type }: GenericListProps) =>
	S.listItem()
		.title(title)
		.icon(icon)
		.schemaType(schemaType)
		.child(
			S.documentTypeList(schemaType).child((documentId: string) =>
				S.document()
					.documentId(documentId)
					.schemaType(schemaType)
					.views(getViews(type)),
			),
		);

/**
 * This will render a list of documents inside the CMS.
 */
export const getDocumentList = (config: DocumentListProps) =>
	getGenericList({ ...config, type: 'document' });

/**
 * This will render a list of pages inside the CMS.
 */
export const getPageList = (config: DocumentListProps) =>
	getGenericList({ ...config, type: 'page' });
