/** @jsxImportSource theme-ui */
import React from 'react';
import { jsx } from 'theme-ui';
import { isBrowser, Locales, Stack } from '@quarantaine/common';
import { FormSubmit, FormSubmitProps } from './submit';
import { ContentStream, ContentStreamProps } from '../content';

export interface FormAnswersButtonsProps {
	locale: Locales;
	content: ContentStreamProps;
	buttons: FormSubmitProps['buttons'];
}

export const FormAnswersButtons: React.FC<FormAnswersButtonsProps> = ({
	buttons,
	content,
	locale,
}) => {
	const parsedButtons = buttons?.map((button) => ({
		...button,
		next: isBrowser() ? `${button.next}${window.location.search}` : button.next,
		styledAs: 'button',
	}));

	return (
		<form
			action=""
			sx={{
				position: 'relative',
			}}
		>
			<Stack>
				<ContentStream {...content} />
				<FormSubmit buttons={parsedButtons} locale={locale} />
			</Stack>
		</form>
	);
};
