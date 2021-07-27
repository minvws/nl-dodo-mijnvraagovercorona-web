import S from '@sanity/desk-tool/structure-builder';

import {
	GiHouse,
	GiTestTubes,
	GiJumpAcross,
	GiCookie,
	GiSettingsKnobs,
	GiHelp,
	GiWorld,
	GiJumpingDog,
	GiClosedDoors,
	GiFlagObjective,
	GiCalendar,
	GiCommercialAirplane,
	GiLightBulb,
	GiPeriscope,
	GiThumbDown,
	GiThumbUp,
	GiRadioactive,
	GiTrail,
	GiCarWheel,
	GiShieldReflect,
} from 'react-icons/gi';
import { BiError } from 'react-icons/bi';
import { FaRegCopyright, FaAccessibleIcon } from 'react-icons/fa';
import { SiGnuprivacyguard } from 'react-icons/si';
import { GrVulnerability } from 'react-icons/gr';

import { getPage } from './utilities/getSingleton';
import { getDocumentList, getPageList } from './utilities/getDocumentList';

const genericPagesConfig = [
	{
		schemaType: 'privacy-page',
		title: 'Common Privacy Pagina',
		icon: SiGnuprivacyguard,
	},
	{
		schemaType: 'cookies-page',
		title: 'Common Cookies Pagina',
		icon: GiCookie,
	},
	{
		schemaType: 'copyright-page',
		title: 'Common Copyright Pagina',
		icon: FaRegCopyright,
	},
	{
		schemaType: 'toegankelijkheid-page',
		title: 'Common Toegankelijkheid Pagina',
		icon: FaAccessibleIcon,
	},
	{
		schemaType: 'kwetsbaarheid-melden-page',
		title: 'Common Kwetsbaarheid Melden Pagina',
		icon: GrVulnerability,
	},
	{
		schemaType: 'error-404-page',
		title: 'Common 404 Pagina',
		icon: BiError,
	},
];

/**
 * A list of all pages editable inside the CMS.
 * Only one of these documents will be visible.
 */
const reizenPagesConfig = [
	{
		schemaType: 'landing-page',
		title: 'Reizen Landing Pagina',
		icon: GiHouse,
	},
	{
		schemaType: 'voorbereiding-page',
		title: 'Reizen Voorbereiding Pagina',
		icon: GiClosedDoors,
	},
	{
		schemaType: 'bestemming-page',
		title: 'Reizen Bestemming Pagina',
		icon: GiFlagObjective,
	},
	{
		schemaType: 'periode-page',
		title: 'Reizen Periode Pagina',
		icon: GiCalendar,
	},
	{
		schemaType: 'vervoersmiddel-page',
		title: 'Reizen Vervoersmiddel Pagina',
		icon: GiCommercialAirplane,
	},
	{
		schemaType: 'tussenstop-page',
		title: 'Reizen Tussenstop Pagina',
		icon: GiJumpAcross,
	},
	{
		schemaType: 'faq-page',
		title: 'Reizen FAQ Pagina',
		icon: GiLightBulb,
	},
	{
		schemaType: 'resultaat-page',
		title: 'Reizen Resultaat Pagina',
		icon: GiTestTubes,
	},
	{
		schemaType: 'geen-resultaat-page',
		title: 'Reizen Geen Resultaat Pagina',
		icon: GiTestTubes,
	},
];

/**
 * A list of all document types which should be rendered as a singleton.
 * Only one version of this type should be visible inside the CMS.
 */
const siteSettingsConfig = [
	{
		schemaType: 'site-settings-document',
		title: 'Site Settings Document',
		icon: GiSettingsKnobs,
	},
];

/**
 * A list of all document types which can contain multiple versions.
 * These will be rendered as a list inside the CMS.
 */
const reizenMultiDocumentsConfig = [
	{
		schemaType: 'faq-document',
		title: 'Reizen FAQ Documenten',
		icon: GiHelp,
	},
	{
		schemaType: 'land-document',
		title: 'Reizen Land Documenten',
		icon: GiWorld,
	},
	{
		schemaType: 'risk-category-document',
		title: 'Reizen Risico Categorie Documenten',
		icon: GiRadioactive,
	},
	{
		schemaType: 'travel-fase-document',
		title: 'Reizen Reisfase Documenten',
		icon: GiTrail,
	},
	{
		schemaType: 'means-of-transport-document',
		title: 'Reizen Ververvoersmethode Documenten',
		icon: GiCarWheel,
	},
	{
		schemaType: 'voorbereiding-document',
		title: 'Reizen Voorbereiding Documenten',
		icon: GiJumpingDog,
	},
];

const checkPagesConfig = [
	{
		schemaType: 'check-landing-page',
		title: 'Check Landing Pagina',
		icon: GiHouse,
	},
	{
		schemaType: 'jouw-situatie-page',
		title: 'Check Jouw Situatie Pagina',
		icon: GiPeriscope,
	},
	{
		schemaType: 'check-ben-ik-beschermd-page',
		title: 'Check Ben ik beschermd Pagina',
		icon: GiShieldReflect,
	},
	{
		schemaType: 'check-ik-ben-beschermd-page',
		title: 'Check Ik ben beschermd Pagina',
		icon: GiShieldReflect,
	},
	{
		schemaType: 'wanneer-page',
		title: 'Check Wanneer Pagina',
		icon: GiCalendar,
	},
	{
		schemaType: 'situatie-zelf-klachten-page',
		title: 'Check Situatie Zelf Klachten Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-buurt-page',
		title: 'Check Situatie Buurt Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-coronamelder-page',
		title: 'Check Situatie Coronamelder Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-reis-page',
		title: 'Check Situatie Reis Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-corona-zonder-klachten-page',
		title: 'Check Situatie Corona Zonder Klachten Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-corona-met-klachten-page',
		title: 'Check Situatie Corona Met Klachten Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-huisgenoot-met-klachten-page',
		title: 'Check Situatie Huisgenoot Met Klachten Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-huisgenoot-corona-geen-afstand-geen-klachten-page',
		title: 'Check Situatie Huisgenoot Corona Geen Afstand Geen Klachten Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-huisgenoot-corona-geen-afstand-wel-klachten-page',
		title: 'Check Situatie Huisgenoot Corona Geen Afstand Wel Klachten Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'situatie-huisgenoot-corona-wel-afstand-page',
		title: 'Check Situatie Huisgenoot Corona Wel Afstand Pagina',
		icon: GiThumbUp,
	},
	{
		schemaType: 'geen-advies-page',
		title: 'Geen Advies Pagina',
		icon: GiThumbDown,
	},
];

const checkMultiDocumentsConfig = [
	{
		schemaType: 'situation-document',
		title: `Situatiepagina's`,
		icon: GiHelp,
	},
];

export default () =>
	S.list()
		.title('Content')
		.items([
			/** Primary Documents */
			...siteSettingsConfig.map((config) => getDocumentList(config)),
			S.divider(),

			/** Generic Pages */
			...genericPagesConfig.map((config) => getPageList(config)),
			S.divider(),

			/** Reizen Pages */
			...reizenPagesConfig.map((config) => getPage(config)),
			S.divider(),

			/** Reizen Multiple Documents */
			...reizenMultiDocumentsConfig.map((config) => getDocumentList(config)),
			S.divider(),

			/** Check Pages */
			...checkPagesConfig.map((config) => getPage(config)),
			S.divider(),

			/** Check Multiple Documents */
			...checkMultiDocumentsConfig.map((config) => getDocumentList(config)),
			S.divider(),
		]);
