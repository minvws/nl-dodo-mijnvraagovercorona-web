import { Languages } from 'config/languages';
import { createContext } from 'react';

export type Translations = { [key: string]: string };

export interface TranslationContextState {
	translations: Translations;
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
}> = ({ children, locale, content }) => {
	return (
		<TranslationContext.Provider
			value={{ translations: content || {}, locale }}
		>
			{children}
		</TranslationContext.Provider>
	);
};
