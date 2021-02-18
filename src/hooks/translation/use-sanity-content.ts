import { useContext } from 'react';
import { TranslationContext } from './translation-context';

export const useSanityPageContent = <ContentInterface>() =>
	useContext(TranslationContext).sanityPageContent as ContentInterface;
export const useSanitySiteSettings = () =>
	useContext(TranslationContext).siteSettings;
