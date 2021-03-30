import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import ggdContactDocument from './documents/ggdContact';
import siteSettingsDocument from './documents/siteSettings';
import faqDocument from './documents/faq';
import voorbereidingDocument from './documents/voorbereiding';
import reisSchemaDocument from './documents/reisSchema';

import privacyPage from './pages/common/privacy';
import cookiesPage from './pages/common/cookies';
import copyrightPage from './pages/common/copyright';
import kwetsbaarheidMeldenPage from './pages/common/kwetsbaarheidMelden';
import toegankelijkheidPage from './pages/common/toegankelijkheid';

import landingPage from './pages/reizen/landing';
import voorbereidingPage from './pages/reizen/voorbereiding';
import bestemmingPage from './pages/reizen/bestemming';
import periodePage from './pages/reizen/periode';
import vervoersmiddelPage from './pages/reizen/vervoersmiddel';
import faqPage from './pages/reizen/faq';

import checkLandingPage from './pages/check/check-landing';

import localeStringObject from './objects/localeString';
import localeBlockObject from './objects/localeBlock';
import localeUrlObject from './objects/localeUrl';
import localeTextObject from './objects/localeText';
import pageMetaDataObject from './objects/pageMetaData';
import headerObject from './objects/header';

export default createSchema({
	name: 'default',
	types: schemaTypes.concat([
		/**
		 * Pages
		 * Pages are single pages within our applications which need internationalization and configuration.
		 * Common pages
		 */
		privacyPage,
		cookiesPage,
		copyrightPage,
		kwetsbaarheidMeldenPage,
		toegankelijkheidPage,

		/**
		 * Reizen pages
		 */
		landingPage,
		voorbereidingPage,
		bestemmingPage,
		periodePage,
		vervoersmiddelPage,
		faqPage,

		/**
		 * Check pages
		 */
		checkLandingPage,

		/**
		 * Site settings
		 * Site settings is a single document with config for all pages
		 */
		siteSettingsDocument,

		/**
		 * Documents
		 * Documents are types which need to be created to have multiple versions.
		 */
		ggdContactDocument,
		faqDocument,
		reisSchemaDocument,
		voorbereidingDocument,

		/**
		 * Objects
		 * Objects are schemas which can be used as a custom input type within the CMS.
		 */
		localeStringObject,
		localeBlockObject,
		localeUrlObject,
		localeTextObject,
		pageMetaDataObject,
		headerObject,
	]),
});
