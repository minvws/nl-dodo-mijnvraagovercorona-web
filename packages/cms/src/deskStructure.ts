import {
	GiCardRandom,
	GiHouse,
	GiSettingsKnobs,
	GiLightBulb,
	GiShare,
	GiAirplaneArrival,
} from 'react-icons/gi';
import { BiError, BiSitemap } from 'react-icons/bi';
import { FaHandsHelping, FaFeatherAlt } from 'react-icons/fa';
import { VscScreenFull, VscCopy } from 'react-icons/vsc';
import { IoDocumentOutline } from 'react-icons/io5';
import { RiQuestionLine, RiPagesLine } from 'react-icons/ri';
import { MdOutlineTopic, MdLiveHelp } from 'react-icons/md';

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

const mvocPagesConfig = [
	{
		schemaType: 'generic-page',
		title: 'Generic',
		icon: GiCardRandom,
	},
	{
		schemaType: 'error-page',
		title: 'Error',
		icon: BiError,
	},
	{
		schemaType: 'theme-page',
		title: 'Thema',
		icon: FaFeatherAlt,
	},
];

const mvocDocumentsConfig = [
	{
		schemaType: 'modals',
		title: 'Modals',
		icon: VscScreenFull,
	},
	{
		schemaType: 'assistance',
		title: 'Hulp',
		icon: FaHandsHelping,
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
		schemaType: 'landing-situations-document',
		title: `Landingpagina situaties`,
		icon: GiAirplaneArrival,
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
						icon: GiSettingsKnobs,
					}),

					S.divider(),

					getFolder(S, {
						title: 'Documenten',
						icon: IoDocumentOutline,
						items: [
							...mvocDocumentsConfig.map((config) =>
								getTranslatedDocumentList(S, config),
							),
						],
					}),

					S.divider(),

					getFolder(S, {
						title: 'Pagina’s',
						icon: RiPagesLine,
						items: [
							getTranslatedSingleton(S, {
								title: 'Homepage',
								type: 'homepage',
								icon: GiHouse,
							}),
							...mvocPagesConfig.map((config) =>
								getTranslatedDocumentList(S, config),
							),
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
