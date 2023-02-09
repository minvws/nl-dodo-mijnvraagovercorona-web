/**
 * New document structure
 */
// Documents
import siteSettingsDocument from './translated/documents/siteSettings';
import modalsDocument from './translated/documents/modals';

// Pages
import genericPage from './translated/pages/generic';
import errorPage from './translated/pages/error';

// objects
import {
	customBlockObject,
	customBlockWithoutModalObject,
} from './translated/objects/customBlock';
import metaDataObject from './translated/objects/metaData';
import iconPickerObject from './translated/objects/iconPicker';
import buttonObject from './translated/objects/button';
import heroObject from './translated/objects/hero';
import internalPageSelectorObject from './objects/internalPageSelector';

/**
 * Old document structure
 */
// Documents
import siteSettingsDocumentOld from './documents/siteSettings';
import modalsDocumentOld from './documents/modals';
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

// pages
import privacyPage from './pages/common/privacy';
import cookiesPage from './pages/common/cookies';
import copyrightPage from './pages/common/copyright';
import kwetsbaarheidMeldenPage from './pages/common/kwetsbaarheidMelden';
import toegankelijkheidPage from './pages/common/toegankelijkheid';
import error404Page from './pages/common/404page';

// MVOC
import checkLandingPage from './pages/mvoc/check-landing';

// Objects
import localeStringObject from './objects/localeString';
import {
	localeBlockObject,
	localeBlockWithoutModalObject,
} from './objects/localeBlock';
import localeUrlObject from './objects/localeUrl';
import videoObject from './objects/video';
import thisOrThatLocaleStringObject from './objects/thisOrThatLocaleString';
import disclosureObject from './objects/disclosure';
import pageMetaDataObject from './objects/pageMetaData';
import headerObject from './objects/header';
import quarantinePlanObject from './objects/quarantinePlan';
import situationContentBlocksObject from './objects/situationContentBlocks';
import stepsObject from './objects/steps';
import buttonObjectOld from './objects/button';
import questionContentObject from './objects/questionContent';
import questionSelectorObject from './objects/questionSelector';

import themeSelectorObject from './objects/themeSelector';
import tipSelectorObject from './objects/tipSelector';
import moreTipsObject from './objects/moreTips';

export default [
	/**
	 * Translated
	 */
	// pages
	genericPage,
	errorPage,

	// documents
	siteSettingsDocument,
	modalsDocument,

	// objects
	customBlockObject,
	customBlockWithoutModalObject,
	metaDataObject,
	iconPickerObject,
	heroObject,
	buttonObject,
	internalPageSelectorObject,

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
	 * Mvoc pages
	 */
	checkLandingPage,

	/**
	 * Site settings
	 * Site settings is a single document with config for all pages
	 */
	siteSettingsDocumentOld,

	/**
	 * Documents
	 * Documents are types which need to be created to have multiple versions.
	 */
	modalsDocumentOld,
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
	localeUrlObject,
	videoObject,
	thisOrThatLocaleStringObject,
	disclosureObject,
	pageMetaDataObject,
	headerObject,
	quarantinePlanObject,
	situationContentBlocksObject,
	stepsObject,
	buttonObjectOld,
	questionContentObject,
	questionSelectorObject,
	themeSelectorObject,
	tipSelectorObject,
	moreTipsObject,
];
