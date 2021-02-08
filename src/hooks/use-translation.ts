import { useMemo } from 'react';
// @TODO: Not really happy with processing HTML, who knows what we will be injecting...
import parse from 'html-react-parser';

const curlyBracketRegex = /\{\{(.+?)\}\}/g;

type TranslationVariables = { [key: string]: string | number | undefined };

export const useTranslation = (content: { [key: string]: string }) => {
	const t = useMemo(() => {
		return (contentKey: string, variables?: TranslationVariables) => {
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
	}, [content]);

	return {
		t,
		t_s: (contentKey: string, variables?: TranslationVariables) =>
			`${t(contentKey, variables)}`,
	};
};
