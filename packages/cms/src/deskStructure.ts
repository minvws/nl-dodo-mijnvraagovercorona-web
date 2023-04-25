import {
	BsClipboardCheck,
	BsPatchQuestion,
	BsColumnsGap,
	BsBook,
	BsCardList,
	BsChatLeftDots,
	BsWindow,
	BsFileEarmark,
	BsFileRichtext,
	BsGear,
	BsHouse,
	BsBrush,
	BsBandaid,
	BsExclamationCircle,
	BsAirplane,
	BsGlobe,
	BsFileText,
	BsArrowRightSquare,
} from 'react-icons/bs';

import { getFolder } from './utilities/getFolder';
import { getTranslatedSingleton } from './utilities/getTranslatedSingleton';
import { getTranslatedDocumentList } from './utilities/getTranslatedDocumentList';

export default (S) =>
	S.list()
		.title('Content')
		.items([
			getTranslatedSingleton(S, {
				title: 'Site Settings',
				type: 'siteSettings',
				icon: BsGear,
			}),

			S.divider(),

			getFolder(S, {
				title: 'Documenten',
				icon: BsFileEarmark,
				items: [
					getTranslatedDocumentList(S, {
						schemaType: 'cta-button-document',
						title: 'CTA knop',
						icon: BsArrowRightSquare,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'modals',
						title: 'Modals',
						icon: BsWindow,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'card',
						title: 'Cards',
						icon: BsCardList,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'tale',
						title: 'Verhaal',
						icon: BsBook,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'assistance',
						title: 'Hulp',
						icon: BsChatLeftDots,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'duo-column-content',
						title: 'Duo column content',
						icon: BsColumnsGap,
					}),
				],
			}),

			S.divider(),

			getFolder(S, {
				title: 'Pagina’s',
				icon: BsFileRichtext,
				items: [
					getTranslatedSingleton(S, {
						title: 'Homepage',
						type: 'homepage',
						icon: BsHouse,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'generic-page',
						title: 'Generic',
						icon: BsFileText,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'theme-page',
						title: 'Thema',
						icon: BsBrush,
					}),
					S.divider(),
					getTranslatedDocumentList(S, {
						schemaType: 'question-page',
						title: 'Vraag',
						icon: BsPatchQuestion,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'advice-page',
						title: 'Advies',
						icon: BsClipboardCheck,
					}),
					S.divider(),
					getFolder(S, {
						title: 'Prikken zonder afspraak',
						icon: BsBandaid,
						items: [
							getTranslatedSingleton(S, {
								title: 'Landing pagina',
								type: 'pza-landing-page',
								icon: BsAirplane,
							}),
							getTranslatedSingleton(S, {
								title: 'Locaties pagina',
								type: 'locations-page',
								icon: BsGlobe,
							}),
						],
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'error-page',
						title: 'Error',
						icon: BsExclamationCircle,
					}),
				],
			}),
		]);
