/**
 * New document structure
 */
// Documents
import siteSettingsDocument from './translated/documents/siteSettings';
import modalsDocument from './translated/documents/modals';
import taleDocument from './translated/documents/tale';
import assistanceDocument from './translated/documents/assistance';
import cardDocument from './translated/documents/card';
import duoColumnContentDocument from './translated/documents/duoColumnContent';
import ctaButtonDocument from './translated/documents/ctaButton';

// Pages
import genericPage from './translated/pages/generic';
import locationsPage from './translated/pages/pza/locations';
import pzaLandingPage from './translated/pages/pza/landing';
import themePage from './translated/pages/theme';
import errorPage from './translated/pages/error';
import homePage from './translated/pages/homepage';
import advicePage from './translated/pages/advice';
import questionPage from './translated/pages/question';

// objects
import {
	customBlockObject,
	customBlockWithoutModalObject,
} from './translated/objects/customBlock';
import metaDataObject from './translated/objects/metaData';
import iconPickerObject from './translated/objects/iconPicker';
import adviceObject from './translated/objects/adviceBlock';
import buttonObject from './translated/objects/button';
import pictureObject from './translated/objects/picture';
import videoObject from './translated/objects/video';
import heroObject from './translated/objects/hero';
import multiContentBlocksObject from './translated/objects/multiContentBlocks';
import pageReferenceObject from './translated/objects/pageReference';
import internalPageSelectorObject from './translated/objects/internalPageSelector';
import taleSelectorObject from './translated/objects/taleSelector';
import thisOrThatStringObject from './translated/objects/thisOrThatString';
import pageSourceSelectorObject from './translated/objects/pageSourceSelector';
import moreInfoObject from './translated/objects/moreInfo';
import ctaButtonSelectorObject from './translated/objects/ctaButtonSelector';

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
	pageReferenceObject,
	internalPageSelectorObject,
	taleSelectorObject,
	thisOrThatStringObject,
	pageSourceSelectorObject,
	moreInfoObject,
	ctaButtonSelectorObject,
];
