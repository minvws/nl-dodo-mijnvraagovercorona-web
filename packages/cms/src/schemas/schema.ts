import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import siteSettingsDocument from './documents/siteSettings';
import faqDocument from './documents/faq';
import voorbereidingDocument from './documents/voorbereiding';
import countryDocument from './documents/country';
import riskCategoryDocument from './documents/riskCategory';
import travelFaseDocument from './documents/travelFase';
import meansOfTransportDocument from './documents/meansOfTransport';
import situationDocument from './documents/situation';

import privacyPage from './pages/common/privacy';
import cookiesPage from './pages/common/cookies';
import copyrightPage from './pages/common/copyright';
import kwetsbaarheidMeldenPage from './pages/common/kwetsbaarheidMelden';
import toegankelijkheidPage from './pages/common/toegankelijkheid';
import error404Page from './pages/common/404page';

import landingPage from './pages/reizen/landing';
import voorbereidingPage from './pages/reizen/voorbereiding';
import bestemmingPage from './pages/reizen/bestemming';
import periodePage from './pages/reizen/periode';
import vervoersmiddelPage from './pages/reizen/vervoersmiddel';
import faqPage from './pages/reizen/faq';
import tussenstopPage from './pages/reizen/tussenstop';
import resultaatPage from './pages/reizen/resultaat';

import checkLandingPage from './pages/check/check-landing';
import jouwSituatiePage from './pages/check/jouw-situatie';
import benIkUitgezonderdPage from './pages/check/ben-ik-uitgezonderd';
import wanneerPage from './pages/check/wanneer';
import geenAdviesPage from './pages/check/geen-advies';

import localeStringObject from './objects/localeString';
import localeBlockObject from './objects/localeBlock';
import localeUrlObject from './objects/localeUrl';
import localeTextObject from './objects/localeText';
import pageMetaDataObject from './objects/pageMetaData';
import headerObject from './objects/header';
import quarantinePlanObject from './objects/quarantinePlan';
import situatiePageObject from './objects/situatiePage';
import conditionsObject from './objects/conditions';
import travelCardObject from './objects/travelCard';

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
		error404Page,

		/**
		 * Reizen pages
		 */
		landingPage,
		voorbereidingPage,
		bestemmingPage,
		periodePage,
		vervoersmiddelPage,
		faqPage,
		tussenstopPage,
		resultaatPage,

		/**
		 * Check pages
		 */
		checkLandingPage,
		jouwSituatiePage,
		benIkUitgezonderdPage,
		wanneerPage,
		geenAdviesPage,

		/**
		 * Site settings
		 * Site settings is a single document with config for all pages
		 */
		siteSettingsDocument,

		/**
		 * Documents
		 * Documents are types which need to be created to have multiple versions.
		 */
		faqDocument,
		voorbereidingDocument,
		countryDocument,
		riskCategoryDocument,
		travelFaseDocument,
		meansOfTransportDocument,
		situationDocument,

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
		quarantinePlanObject,
		situatiePageObject,
		conditionsObject,
		travelCardObject,
	]),
});
