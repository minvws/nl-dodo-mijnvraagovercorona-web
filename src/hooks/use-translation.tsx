import { useContext, useMemo, createContext, useState } from 'react';
// @TODO: Not really happy with processing HTML, who knows what we will be injecting...
import parse from 'html-react-parser';

type TranslationVariables = { [key: string]: string | number | undefined };

export type TranslationFunction = (
	contentKey: string,
	variables?: TranslationVariables,
) => {};

export type TranslationFunctionToString = (
	contentKey: string,
	variables?: TranslationVariables,
) => string;

interface UseTranslation {
	t: TranslationFunction;
	t_s: TranslationFunctionToString;
}

const curlyBracketRegex = /\{\{(.+?)\}\}/g;

export const useTranslation = (): UseTranslation => {
	const content = useContext(TranslationContext);
	const t: TranslationFunction = useMemo(() => {
		return (contentKey, variables) => {
			if (!content)
				throw new Error(
					`Using useTranslation hook while no content is supplied.`,
				);

			const lookedupContent = content[contentKey];

			if (!lookedupContent)
				throw new Error(`Content with key "${contentKey}" not found."`);

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

			return parse(contentWithVariables);
		};
	}, []);

	return {
		t,
		t_s: (contentKey, variables) => {
			const translatedText = t(contentKey, variables);
			if (translatedText === null) return translatedText;
			return `${translatedText}`;
		},
	};
};

export interface TranslationObject {
	[key: string]: string;
}

export const TranslationContext = createContext<TranslationObject>({});

export const TranslationProvider: React.FC<{ content?: TranslationObject }> = ({
	children,
	content,
}) => {
	const [pageContent] = useState<TranslationObject>(content || {});

	return (
		<TranslationContext.Provider value={pageContent}>
			{children}
		</TranslationContext.Provider>
	);
};
