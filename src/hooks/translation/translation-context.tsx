import { Languages } from 'config/languages';
import { SiteSettings } from 'content/siteSettings';
import { createContext } from 'react';

export type Translations = { [key: string]: string };

type SanityContent = unknown;

export interface TranslationContextState {
	translations: Translations;
	siteSettings: SiteSettings;
	sanityPageContent: SanityContent;
	locale: Languages;
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
	locale: Languages;
	siteSettings: SiteSettings;
	sanityPageContent?: SanityContent;
}> = ({ children, locale, content, siteSettings, sanityPageContent }) => {
	return (
		<TranslationContext.Provider
			value={{
				translations: content || {},
				locale,
				siteSettings,
				sanityPageContent: sanityPageContent || {},
			}}
		>
			{children}
		</TranslationContext.Provider>
	);
};
