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
	BsFileText,
	BsArrowRightSquare,
	BsMegaphone,
	BsShuffle,
} from 'react-icons/bs';

import { getFolder } from './utilities/getFolder';
import { getTranslatedSingleton } from './utilities/getTranslatedSingleton';
import { getTranslatedDocumentList } from './utilities/getTranslatedDocumentList';

export default (S) =>
	S.list()
		.title('Content')
		.items([
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
						title: 'Content',
						icon: BsFileText,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'theme-page',
						title: 'Thema',
						icon: BsBrush,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'campaign-page',
						title: 'Campagne pagina',
						icon: BsMegaphone,
					}),
					S.divider(),
					getTranslatedDocumentList(S, {
						schemaType: 'question-page',
						title: 'Vraag',
						icon: BsPatchQuestion,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'question-landing-page',
						title: 'Vraag landing pagina',
						icon: BsAirplane,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'advice-page',
						title: 'Advies',
						icon: BsClipboardCheck,
					}),
					S.divider(),
					getTranslatedSingleton(S, {
						title: 'Prikken Zonder Afspraak',
						type: 'pza-landing-page',
						icon: BsBandaid,
					}),
					S.divider(),
					getTranslatedDocumentList(S, {
						schemaType: 'error-page',
						title: 'Error',
						icon: BsExclamationCircle,
					}),
				],
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
						schemaType: 'assistance-new',
						title: 'Hulp',
						icon: BsChatLeftDots,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'duo-column-content',
						title: 'Duo column content',
						icon: BsColumnsGap,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'support',
						title: 'Hulpblokken',
						icon: BsClipboardCheck,
					}),
					getTranslatedDocumentList(S, {
						schemaType: 'carousel',
						title: 'Carousel items',
						icon: BsShuffle,
					}),
				],
			}),

			S.divider(),

			getTranslatedSingleton(S, {
				title: 'Site Settings',
				type: 'siteSettings',
				icon: BsGear,
			}),
		]);
