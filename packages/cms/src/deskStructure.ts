import S from '@sanity/desk-tool/structure-builder';

import {
	GiHouse,
	GiTestTubes,
	GiCookie,
	GiSettingsKnobs,
	GiHelp,
	GiWorld,
	GiJumpingDog,
	GiClosedDoors,
	GiFlagObjective,
	GiCalendar,
	GiLightBulb,
	GiThumbDown,
	GiRadioactive,
	GiTrail,
	GiShieldReflect,
	GiShare,
} from 'react-icons/gi';
import { BiError, BiSitemap } from 'react-icons/bi';
import {
	FaRegCopyright,
	FaAccessibleIcon,
	FaHandsHelping,
	FaFeatherAlt,
} from 'react-icons/fa';
import { SiGnuprivacyguard, SiYourtraveldottv } from 'react-icons/si';
import { GrVulnerability } from 'react-icons/gr';
import { VscScreenFull, VscCopy } from 'react-icons/vsc';
import { IoDocumentOutline } from 'react-icons/io5';
import {
	RiQuestionLine,
	RiQuestionAnswerLine,
	RiPagesLine,
} from 'react-icons/ri';
import { MdOutlineTopic, MdLiveHelp } from 'react-icons/md';

import { getFolder } from './utilities/getFolder';
import { getPage } from './utilities/getSingleton';
import { getDocumentList, getPageList } from './utilities/getDocumentList';

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

const genericPagesConfig = [
	{
		schemaType: 'privacy-page',
		title: 'Privacy',
		icon: SiGnuprivacyguard,
	},
	{
		schemaType: 'cookies-page',
		title: 'Cookies',
		icon: GiCookie,
	},
	{
		schemaType: 'copyright-page',
		title: 'Copyright',
		icon: FaRegCopyright,
	},
	{
		schemaType: 'toegankelijkheid-page',
		title: 'Toegankelijkheid',
		icon: FaAccessibleIcon,
	},
	{
		schemaType: 'kwetsbaarheid-melden-page',
		title: 'Kwetsbaarheid Melden',
		icon: GrVulnerability,
	},
	{
		schemaType: 'error-404-page',
		title: '404',
		icon: BiError,
	},
];

const reizenPagesConfig = [
	{
		schemaType: 'landing-page',
		title: 'Landing',
		icon: GiHouse,
	},
	{
		schemaType: 'voorbereiding-page',
		title: 'Voorbereiding',
		icon: GiClosedDoors,
	},
	{
		schemaType: 'bestemming-page',
		title: 'Bestemming',
		icon: GiFlagObjective,
	},
	{
		schemaType: 'periode-page',
		title: 'Periode',
		icon: GiCalendar,
	},
	{
		schemaType: 'faq-page',
		title: 'FAQ',
		icon: GiLightBulb,
	},
];

const reizenMultiDocumentsConfig = [
	{
		schemaType: 'faq-document',
		title: 'FAQ',
		icon: GiHelp,
	},
	{
		schemaType: 'land-document',
		title: 'Land',
		icon: GiWorld,
	},
	{
		schemaType: 'risk-category-document',
		title: 'Risico Categorie',
		icon: GiRadioactive,
	},
	{
		schemaType: 'travel-fase-document',
		title: 'Reisfase',
		icon: GiTrail,
	},
	{
		schemaType: 'voorbereiding-document',
		title: 'Voorbereiding',
		icon: GiJumpingDog,
	},
	{
		schemaType: 'resultaat-page',
		title: 'Resultaat',
		icon: GiTestTubes,
	},
];

const checkPagesConfig = [
	{
		schemaType: 'check-landing-page',
		title: 'Landing',
		icon: GiHouse,
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
];

const checkSituationDocumentsConfig = [
	{
		schemaType: 'theme-document',
		title: `Thema`,
		icon: FaFeatherAlt,
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
];

const checkSituationOldDocumentsConfig = [
	{
		schemaType: 'situation-document',
		title: `Situatie`,
		icon: GiHelp,
	},
	{
		schemaType: 'check-ben-ik-uitgezonderd-page',
		title: 'Ben ik uitgezonderd',
		icon: GiShieldReflect,
	},
	{
		schemaType: 'wanneer-page',
		title: 'Wanneer',
		icon: GiCalendar,
	},
	{
		schemaType: 'geen-advies-page',
		title: 'Geen Advies',
		icon: GiThumbDown,
	},
];

const checkTopicDocumentsConfig = [
	{
		schemaType: 'topic-document',
		title: 'Onderwerp Flow',
		icon: MdOutlineTopic,
	},
	{
		schemaType: 'topic-question-document',
		title: `Onderwerp Vraag`,
		icon: RiQuestionLine,
	},
	{
		schemaType: 'topic-result-document',
		title: `Onderwerp Resultaat`,
		icon: RiQuestionAnswerLine,
	},
];

export default () =>
	S.list()
		.title('Content')
		.items([
			getFolder({
				title: 'Common',
				icon: BiSitemap,
				items: [
					...siteSettingsConfig.map((config) => getDocumentList(config)),
					S.divider(),
					getFolder({
						title: 'Pagina’s',
						icon: RiPagesLine,
						items: [...genericPagesConfig.map((config) => getPageList(config))],
					}),

					getFolder({
						title: 'Documenten',
						icon: IoDocumentOutline,
						items: [
							...multiDocumentsConfig.map((config) => getDocumentList(config)),
						],
					}),
				],
			}),

			getFolder({
				title: 'MijnVraagOverCorona',
				icon: MdLiveHelp,
				items: [
					getFolder({
						title: 'Pagina’s',
						icon: RiPagesLine,
						items: [...checkPagesConfig.map((config) => getPage(config))],
					}),

					getFolder({
						title: 'Situaties',
						icon: RiQuestionAnswerLine,
						items: [
							...checkSituationDocumentsConfig.map((config) =>
								getDocumentList(config),
							),
						],
					}),

					getFolder({
						title: 'Onderwerpen',
						icon: MdOutlineTopic,
						items: [
							...checkTopicDocumentsConfig.map((config) =>
								getDocumentList(config),
							),
						],
					}),

					getFolder({
						title: 'Situaties (Oud)',
						icon: GiHelp,
						items: [
							...checkSituationOldDocumentsConfig.map((config) =>
								getDocumentList(config),
							),
						],
					}),
				],
			}),

			getFolder({
				title: 'Reizen',
				icon: SiYourtraveldottv,
				items: [
					getFolder({
						title: 'Pagina’s',
						icon: RiPagesLine,
						items: [...reizenPagesConfig.map((config) => getPage(config))],
					}),
					getFolder({
						title: 'Documenten',
						icon: IoDocumentOutline,
						items: [
							...reizenMultiDocumentsConfig.map((config) =>
								getDocumentList(config),
							),
						],
					}),
				],
			}),
		]);
