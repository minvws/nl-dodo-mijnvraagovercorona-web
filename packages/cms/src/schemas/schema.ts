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

// Pages
import genericPage from './pages/generic';
import locationsPage from './pages/pza/locations';
import pzaLandingPage from './pages/pza/landing';
import themePage from './pages/theme';
import errorPage from './pages/error';
import homePage from './pages/homepage';
import advicePage from './pages/advice';
import questionPage from './pages/question';

// objects
import {
	customBlockObject,
	customBlockWithoutModalObject,
} from './objects/customBlock';
import metaDataObject from './objects/metaData';
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

export default [
	/**
	 * Translated
	 */
	// pages
	genericPage,
	locationsPage,
	pzaLandingPage,
	themePage,
	errorPage,
	homePage,
	advicePage,
	questionPage,

	// documents
	siteSettingsDocument,
	modalsDocument,
	taleDocument,
	assistanceDocument,
	cardDocument,
	duoColumnContentDocument,
	ctaButtonDocument,

	// objects
	customBlockObject,
	customBlockWithoutModalObject,
	metaDataObject,
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
];
