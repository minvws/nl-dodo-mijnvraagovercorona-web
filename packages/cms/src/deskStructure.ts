import S from '@sanity/desk-tool/structure-builder';

import {
	GiHouse,
	GiTestTubes,
	GiCookie,
	GiSettingsKnobs,
	GiHelp,
	GiCardRandom,
	GiJumpingDog,
	GiClosedDoors,
	GiFlagObjective,
	GiCalendar,
	GiCommercialAirplane,
	GiLightBulb,
} from 'react-icons/gi';
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
		schemaType: 'faq-page',
		title: 'Reizen FAQ Pagina',
		icon: GiLightBulb,
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
		schemaType: 'reis-schema-document',
		title: 'Reizen Reisschema Documenten',
		icon: GiCardRandom,
	},
	{
		schemaType: 'ggd-contact-document',
		title: 'Reizen GGD Contact Documenten',
		icon: GiTestTubes,
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
];

const checkMultiDocumentsConfig = [];

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
		]);
