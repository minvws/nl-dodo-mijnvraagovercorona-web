import createSchema from "part:@sanity/base/schema-creator";
import schemaTypes from "all:part:@sanity/base/schema-type";

import ggdContactDocument from "./documents/ggdContact";
import siteSettingsDocument from "./documents/siteSettings";
import faqDocument from "./documents/faq";
import voorbereidingDocument from "./documents/voorbereiding";
import reisSchemaDocument from "./documents/reisSchema";

import landingPage from "./pages/landing";
import privacyPage from "./pages/privacy";
import cookiesPage from "./pages/cookies";
import copyrightPage from "./pages/copyright";
import kwetsbaarheidMeldenPage from "./pages/kwetsbaarheidMelden";
import toegankelijkheidPage from "./pages/toegankelijkheid";
import voorbereidingPage from "./pages/voorbereiding";
import bestemmingPage from "./pages/bestemming";
import periodePage from "./pages/periode";
import vervoersmiddelPage from "./pages/vervoersmiddel";
import faqPage from "./pages/faq";

import localeStringObject from "./objects/localeString";
import localeBlockObject from "./objects/localeBlock";
import localeUrlObject from "./objects/localeUrl";
import localeTextObject from "./objects/localeText";
import pageMetaDataObject from "./objects/pageMetaData";
import headerObject from "./objects/header";

export default createSchema({
  name: "default",
  types: schemaTypes.concat([
    /**
     * Pages
     * Pages are single pages within our applications which need internationalization and configuration.
     */
    landingPage,
    privacyPage,
    cookiesPage,
    copyrightPage,
    kwetsbaarheidMeldenPage,
    toegankelijkheidPage,
    voorbereidingPage,
    bestemmingPage,
    periodePage,
    vervoersmiddelPage,
    faqPage,

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
    ,
  ]),
});
