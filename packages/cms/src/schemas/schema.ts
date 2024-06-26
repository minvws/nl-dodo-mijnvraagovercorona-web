/**
 * New document structure
 */
// Documents
import siteSettingsDocument from './documents/siteSettings';
import modalsDocument from './documents/modals';
import taleDocument from './documents/tale';
import assistanceDocument from './documents/assistance';
import cardDocument from './documents/card';
import duoColumnContentDocument from './documents/duoColumnContent';
import ctaButtonDocument from './documents/ctaButton';
import supportDocument from './documents/support';
import carouselDocument from './documents/carousel';

// Pages
import genericPage from './pages/generic';
import pzaLandingPage from './pages/pza/landing';
import themePage from './pages/theme';
import errorPage from './pages/error';
import homePage from './pages/homepage';
import advicePage from './pages/advice';
import questionPage from './pages/question';
import questionLandingPage from './pages/question-landing';
import campaignPage from './pages/campaign';

// objects
import {
	customBlockObject,
	customBlockWithoutModalObject,
} from './objects/customBlock';
import metaDataObject from './objects/metaData';
import overviewObject from './objects/overview';
import iconPickerObject from './objects/iconPicker';
import adviceObject from './objects/adviceBlock';
import buttonObject from './objects/button';
import pictureObject from './objects/picture';
import videoObject from './objects/video';
import heroObject from './objects/hero';
import multiContentBlocksObject from './objects/multiContentBlocks';
import internalPageSelectorObject from './objects/internalPageSelector';
import taleSelectorObject from './objects/taleSelector';
import thisOrThatStringObject from './objects/thisOrThatString';
import pageSourceSelectorObject from './objects/pageSourceSelector';
import moreInfoObject from './objects/moreInfo';
import ctaButtonSelectorObject from './objects/ctaButtonSelector';
import ctaButtonSelectorWithCategoriesObject from './objects/ctaButtonSelectorWithCategories';
import taleDeeplinkObject from './objects/taleDeeplink';
import cardsObject from './objects/cards';
import supportBlocksObject from './objects/supportBlocks';

export default [
	/**
	 * Translated
	 */
	// pages
	genericPage,
	pzaLandingPage,
	themePage,
	errorPage,
	homePage,
	advicePage,
	questionPage,
	questionLandingPage,
	campaignPage,

	// documents
	siteSettingsDocument,
	modalsDocument,
	taleDocument,
	assistanceDocument,
	cardDocument,
	duoColumnContentDocument,
	ctaButtonDocument,
	supportDocument,
	carouselDocument,

	// objects
	customBlockObject,
	customBlockWithoutModalObject,
	metaDataObject,
	overviewObject,
	iconPickerObject,
	adviceObject,
	heroObject,
	buttonObject,
	pictureObject,
	videoObject,
	multiContentBlocksObject,
	internalPageSelectorObject,
	taleSelectorObject,
	thisOrThatStringObject,
	pageSourceSelectorObject,
	moreInfoObject,
	ctaButtonSelectorObject,
	ctaButtonSelectorWithCategoriesObject,
	taleDeeplinkObject,
	cardsObject,
	supportBlocksObject,
];
