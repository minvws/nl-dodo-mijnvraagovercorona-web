import S from "@sanity/desk-tool/structure-builder";

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
} from "react-icons/gi";
import { FaRegCopyright, FaAccessibleIcon } from "react-icons/fa";
import { SiGnuprivacyguard } from "react-icons/si";
import { GrVulnerability } from "react-icons/gr";

import { getSingletonDocument, getPage } from "./utilities/getSingleton";
import { getDocumentList } from "./utilities/getDocumentList";

/**
 * A list of all pages editable inside the CMS.
 * Only one of these documents will be visible.
 */
const pagesConfig = [
  {
    schemaType: "landing-page",
    title: "Landing Pagina",
    icon: GiHouse,
  },
  {
    schemaType: "privacy-page",
    title: "Privacy Pagina",
    icon: SiGnuprivacyguard,
  },
  {
    schemaType: "cookies-page",
    title: "Cookies Pagina",
    icon: GiCookie,
  },
  {
    schemaType: "copyright-page",
    title: "Copyright Pagina",
    icon: FaRegCopyright,
  },
  {
    schemaType: "toegankelijkheid-page",
    title: "Toegankelijkheid Pagina",
    icon: FaAccessibleIcon,
  },
  {
    schemaType: "kwetsbaarheid-melden-page",
    title: "Kwetsbaarheid Melden Pagina",
    icon: GrVulnerability,
  },
  {
    schemaType: "voorbereiding-page",
    title: "Voorbereiding Pagina",
    icon: GiClosedDoors,
  },
  {
    schemaType: "bestemming-page",
    title: "Bestemming Pagina",
    icon: GiFlagObjective,
  },
  {
    schemaType: "periode-page",
    title: "Periode Pagina",
    icon: GiCalendar,
  },
  {
    schemaType: "vervoersmiddel-page",
    title: "Vervoersmiddel Pagina",
    icon: GiCommercialAirplane,
  },
  {
    schemaType: "faq-page",
    title: "FAQ Pagina",
    icon: GiLightBulb,
  },
];

/**
 * A list of all document types which should be rendered as a singleton.
 * Only one version of this type should be visible inside the CMS.
 */
const singleDocumentsConfig = [
  {
    schemaType: "site-settings-document",
    title: "Site Settings Document",
    icon: GiSettingsKnobs,
  },
];

/**
 * A list of all document types which can contain multiple versions.
 * These will be rendered as a list inside the CMS.
 */
const multiDocumentsConfig = [
  {
    schemaType: "faq-document",
    title: "FAQ Documenten",
    icon: GiHelp,
  },
  {
    schemaType: "reis-schema-document",
    title: "Reisschema Documenten",
    icon: GiCardRandom,
  },
  {
    schemaType: "ggd-contact-document",
    title: "GGD Contact Documenten",
    icon: GiTestTubes,
  },
  {
    schemaType: "voorbereiding-document",
    title: "Voorbereiding Documenten",
    icon: GiJumpingDog,
  },
];

export default () =>
  S.list()
    .title("Content")
    .items([
      /** Single Documents */
      ...singleDocumentsConfig.map((config) => getSingletonDocument(config)),
      S.divider(),

      /** Pages */
      ...pagesConfig.map((config) => getPage(config)),
      S.divider(),

      /** Multiple Documents */
      ...multiDocumentsConfig.map((config) => getDocumentList(config)),
    ]);
