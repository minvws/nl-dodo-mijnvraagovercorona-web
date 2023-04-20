import { GiSettingsKnobs, GiLightBulb, GiShare } from 'react-icons/gi';
import { BiSitemap } from 'react-icons/bi';
import { FaHandsHelping, FaFeatherAlt } from 'react-icons/fa';
import { VscScreenFull, VscCopy } from 'react-icons/vsc';
import { IoDocumentOutline } from 'react-icons/io5';
import { RiQuestionLine } from 'react-icons/ri';
import { MdOutlineTopic, MdLiveHelp } from 'react-icons/md';
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
} from 'react-icons/bs';

import { getFolder } from './utilities/getFolder';
import { getDocumentList, getPageList } from './utilities/getDocumentList';
import { getTranslatedSingleton } from './utilities/getTranslatedSingleton';
import { getTranslatedDocumentList } from './utilities/getTranslatedDocumentList';

/**
 * A list of all document types which should be rendered as a singleton.
 * Only one version of this type should be visible inside the CMS.
 */
const siteSettingsConfig = [
	{
		schemaType: 'site-settings-document',
		title: 'Site Settings',
		icon: GiSettingsKnobs,
	},
];

const mvocPagesDocumentsConfig = [
	{
		schemaType: 'tip-document',
		title: `Tips`,
		icon: GiLightBulb,
	},
	{
		schemaType: 'situation-question-document',
		title: `Situatie Vraag`,
		icon: RiQuestionLine,
	},
	{
		schemaType: 'situation-result-document',
		title: `Situatie Resultaat`,
		icon: MdOutlineTopic,
	},
	{
		schemaType: 'theme-document',
		title: `Thema`,
		icon: FaFeatherAlt,
	},
];

const multiDocumentsConfig = [
	{
		schemaType: 'modals-document',
		title: 'Modals',
		icon: VscScreenFull,
	},
	{
		schemaType: 'assistance-document',
		title: 'Hulp',
		icon: FaHandsHelping,
	},
	{
		schemaType: 'inform-contacts-document',
		title: 'Informeer contacten',
		icon: GiShare,
	},
	{
		schemaType: 'content-feed-document',
		title: 'Content feed',
		icon: VscCopy,
	},
	{
		schemaType: 'content-card-document',
		title: 'Content card',
		icon: VscCopy,
	},
	{
		schemaType: 'story-document',
		title: 'Verhaal',
		icon: VscCopy,
	},
];

export default (S) =>
	S.list()
		.title('Content')
		.items([
			getFolder(S, {
				title: 'Nieuwe structuur MVOC',
				icon: MdLiveHelp,
				items: [
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
				],
			}),

			S.divider(),

			getFolder(S, {
				title: 'Common',
				icon: BiSitemap,
				items: [
					...siteSettingsConfig.map((config) => getDocumentList(S, config)),
					S.divider(),
					getFolder(S, {
						title: 'Documenten',
						icon: IoDocumentOutline,
						items: [
							...multiDocumentsConfig.map((config) =>
								getDocumentList(S, config),
							),
						],
					}),
				],
			}),

			getFolder(S, {
				title: 'Oude structuur MVOC',
				icon: MdLiveHelp,
				items: [
					...mvocPagesDocumentsConfig.map((config) => getPageList(S, config)),
				],
			}),
		]);
