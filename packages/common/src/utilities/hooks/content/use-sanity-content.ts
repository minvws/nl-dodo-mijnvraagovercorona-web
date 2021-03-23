import { useContext } from 'react';

import { CommonSiteSettings } from './common-site-settings';
import { TranslationContext } from '@quarantaine/common';

export const useSanityPageContent = <ContentInterface>() =>
	useContext(TranslationContext).sanityPageContent as ContentInterface;
export const useSanitySiteSettings = <SiteSettings = CommonSiteSettings>() =>
	useContext(TranslationContext).siteSettings as SiteSettings;
