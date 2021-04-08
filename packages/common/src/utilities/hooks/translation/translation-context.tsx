import { createContext } from 'react';
import { Locale, Locales } from './locales';

export type Translations = { [key: string]: string };

type SiteSettings = unknown;

type SanityContent = unknown;

export interface TranslationContextState {
	translations: Translations;
	siteSettings: SiteSettings;
	sanityPageContent: SanityContent;
	locale: Locales;
	locales: Locale[];
}

export const TranslationContext = createContext<TranslationContextState>(
	{} as TranslationContextState,
);

/**
 * Translation Provider used in the _app.tsx. Providing the useTranslation()
 * hook with the translation keys and their content.
 */
export const TranslationProvider: React.FC<{
	content?: Translations;
	locale: Locales;
	locales: Locale[];
	siteSettings: SiteSettings;
	sanityPageContent?: SanityContent;
}> = ({
	children,
	locale,
	locales,
	content,
	siteSettings,
	sanityPageContent,
}) => (
	<TranslationContext.Provider
		value={{
			translations: content || {},
			locale,
			locales,
			siteSettings,
			sanityPageContent: sanityPageContent || {},
		}}
	>
		{children}
	</TranslationContext.Provider>
);
