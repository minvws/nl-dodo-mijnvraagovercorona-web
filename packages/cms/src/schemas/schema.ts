import createSchema from 'part:@sanity/base/schema-creator';
import schemaTypes from 'all:part:@sanity/base/schema-type';

import siteSettingsTranslatedDocument from './documents/translated/siteSettings';
import siteSettingsDocument from './documents/siteSettings';
import faqDocument from './documents/faq';
import countryDocument from './documents/country';
import riskCategoryDocument from './documents/riskCategory';
import travelFaseDocument from './documents/travelFase';
import modalsDocument from './documents/modals';
import themeDocument from './documents/theme';
import assistanceDocument from './documents/assistance';
import informContactsDocument from './documents/inform-contacts';
import situationQuestionDocument from './documents/situation-question';
import situationResultDocument from './documents/situation-result';
import contentFeedDocument from './documents/content-feed';
import contentCardDocument from './documents/content-card';
import landingSituationsDocument from './documents/landing-situations';
import tipDocument from './documents/tip';
import storyDocument from './documents/story';

import privacyPage from './pages/common/privacy';
import cookiesPage from './pages/common/cookies';
import copyrightPage from './pages/common/copyright';
import kwetsbaarheidMeldenPage from './pages/common/kwetsbaarheidMelden';
import toegankelijkheidPage from './pages/common/toegankelijkheid';
import error404Page from './pages/common/404page';

import landingPage from './pages/reizen/landing';
import resultaatPage from './pages/reizen/resultaat';

import checkLandingPage from './pages/mvoc/check-landing';

import localeStringObject from './objects/localeString';
import {
	localeBlockObject,
	localeBlockWithoutModalObject,
} from './objects/localeBlock';
import customBlockObject from './objects/customBlock';
import localeUrlObject from './objects/localeUrl';
import localeTextObject from './objects/localeText';
import videoObject from './objects/video';
import thisOrThatLocaleStringObject from './objects/thisOrThatLocaleString';
import disclosureObject from './objects/disclosure';
import pageMetaDataObject from './objects/pageMetaData';
import headerObject from './objects/header';
import quarantinePlanObject from './objects/quarantinePlan';
import situatiePageObject from './objects/situatiePage';
import conditionsObject from './objects/conditions';
import travelCardObject from './objects/travelCard';
import situationContentBlocksObject from './objects/situationContentBlocks';
import caseObject from './objects/case';
import folderObject from './objects/folder';
import aidObject from './objects/aid';
import stepsObject from './objects/steps';
import buttonObject from './objects/button';
import storyObject from './objects/story';
import storyExtendedObject from './objects/storyExtended';
import questionContentObject from './objects/questionContent';
import questionSelectorObject from './objects/questionSelector';
import themeSelectorObject from './objects/themeSelector';
import tipSelectorObject from './objects/tipSelector';
import moreTipsObject from './objects/moreTips';

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
		resultaatPage,

		/**
		 * Mvoc pages
		 */
		checkLandingPage,

		/**
		 * Site settings
		 * Site settings is a single document with config for all pages
		 */
		siteSettingsDocument,
		siteSettingsTranslatedDocument,

		/**
		 * Documents
		 * Documents are types which need to be created to have multiple versions.
		 */
		faqDocument,
		countryDocument,
		riskCategoryDocument,
		travelFaseDocument,
		modalsDocument,
		themeDocument,
		contentCardDocument,
		storyDocument,
		assistanceDocument,
		informContactsDocument,
		situationQuestionDocument,
		situationResultDocument,
		contentFeedDocument,
		landingSituationsDocument,
		tipDocument,

		/**
		 * Objects
		 * Objects are schemas which can be used as a custom input type within the CMS.
		 */
		localeStringObject,
		localeBlockObject,
		localeBlockWithoutModalObject,
		customBlockObject,
		localeUrlObject,
		localeTextObject,
		videoObject,
		thisOrThatLocaleStringObject,
		disclosureObject,
		pageMetaDataObject,
		headerObject,
		quarantinePlanObject,
		situatiePageObject,
		conditionsObject,
		travelCardObject,
		situationContentBlocksObject,
		caseObject,
		folderObject,
		aidObject,
		stepsObject,
		buttonObject,
		storyObject,
		storyExtendedObject,
		questionContentObject,
		questionSelectorObject,
		themeSelectorObject,
		tipSelectorObject,
		moreTipsObject,
	]),
});
