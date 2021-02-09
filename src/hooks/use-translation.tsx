import React, { useContext, useMemo, createContext, useEffect } from 'react';
// @TODO: Not really happy with processing HTML, who knows what we will be injecting...
import parse from 'html-react-parser';

type TranslationVariables = { [key: string]: string | number | undefined };

export type TranslationFunction = (
	contentKey: string,
	variables?: TranslationVariables,
) => string | JSX.Element | JSX.Element[];

export type TranslationFunctionToString = (
	contentKey: string,
	variables?: TranslationVariables,
) => string;

/**
 * General info about setting up translations on your page:
 *
 * 1. Add a property 'content' in your page's staticProps. Returning
 * an object with translation keys and their corresponding values.
 * 2. They will automatically be picked up by _app.tsx, putting them into
 * the translation context.
 * 3. Use useTranslation() everywhere in your page (or nested components).
 * 4. If a component or page uses useTranslation without content being provided
 * via the staticProps, it will throw an error.
 */

interface UseTranslation {
	t: TranslationFunction;
	t_s: TranslationFunctionToString;
}

// Regex used for interpolating variables.
const curlyBracketRegex = /\{\{(.+?)\}\}/g;

/**
 * Translation hook to get specific content based on
 * translation keys. Replaces HTML with React components,
 * and interpolates any variables between two curly brackets
 * with the corresponding value; {{ variableName }}
 *
 * This hook returns two methods. Both accepting 2 arguments:
 * 1. The translation key (string).
 * 2. An optional object with variables that should be interpolated.
 *
 * t: Being the translation method that returns
 * your content, while also parsing any HTML in there (converting
 * things like <strong> to React components).
 *
 * t_s: Using the t() method, but after that rendering everything
 * to a string. This is useful for things like attributes or places
 * where you need to have a string. By mindful when using this, if there is a
 * <strong> tag in the translation, it will simply convert to object to a string,
 * resulting in a bad user experience.
 */
export const useTranslation = (): UseTranslation => {
	const content = useContext(TranslationContext);

	// Throw an error if hook is used without content.
	useEffect(() => {
		if (!content || Object.keys(content).length === 0)
			throw new Error(
				`Using useTranslation hook while no content is supplied.`,
			);
	}, [content]);

	const translate: TranslationFunctionToString = useMemo(() => {
		return (contentKey, variables) => {
			const lookedupContent = content[contentKey];

			// Throw an error if content key is not found.
			if (!lookedupContent)
				throw new Error(`Content with key "${contentKey}" not found."`);

			// Interpolate all variables.
			const contentWithVariables = lookedupContent.replace(
				curlyBracketRegex,
				(_string, variableName) => {
					if (!variables) return '';

					const trimmedName = variableName.trim();
					if (trimmedName in variables) {
						return (variables[trimmedName] ?? '').toString();
					}

					return '';
				},
			);

			return contentWithVariables;
		};
	}, [content]);

	return {
		t: (contentKey, variables) => parse(translate(contentKey, variables)),
		// The t_s method used the t() method, and converts it to a string.
		// Be carefull with putting any HTML into these strings. It will
		// turn it into an unreadable string.
		t_s: (contentKey, variables) => translate(contentKey, variables),
	};
};

export interface TranslationObject {
	[key: string]: string;
}

export const TranslationContext = createContext<TranslationObject>({});
/**
 * Translation Provider used in the _app.tsx. Providing the useTranslation()
 * hook with the translation keys and their content.
 */
export const TranslationProvider: React.FC<{ content?: TranslationObject }> = ({
	children,
	content,
}) => {
	return (
		<TranslationContext.Provider value={content || {}}>
			{children}
		</TranslationContext.Provider>
	);
};
