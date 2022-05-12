/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import { useRouter } from 'next/router';
import {
	ContentBlock,
	Control,
	getHrefWithlocale,
	Locales,
	Stack,
} from '@quarantaine/common';
import { FormSubmit, FormSubmitProps } from './submit';

export interface FormAnswersSingleProps {
	locale: Locales;
	answers: {
		content: Object[];
		next: string;
		_key: string;
	}[];
	buttons: FormSubmitProps['buttons'];
}

export const FormAnswersSingle: React.FC<FormAnswersSingleProps> = ({
	answers,
	buttons,
	locale,
}) => {
	const router = useRouter();
	const [selectedOption, setSelectedOption] = useState<string>();

	// submit the chosen answer
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (selectedOption)
			router.push(`/${getHrefWithlocale(`/${selectedOption}`, locale)}`);
	};

	// onchange radio & set selectedOption
	const onChange = (value: string) => {
		setSelectedOption(value);
	};

	// Loop though buttons and add a disabled prop when we cannot submit
	const parsedButtons = buttons.map((button, index) =>
		index === 0 && button.standard
			? {
					...button,
					disabled: selectedOption && selectedOption !== '' ? false : true,
			  }
			: { ...button },
	);

	return (
		<form action="" onSubmit={onSubmit}>
			<Stack>
				<Stack spacing={['1rem']}>
					{answers.map((answer) => (
						<Control
							type="radio"
							name="answersSingle"
							key={answer._key}
							id={answer._key}
							label={<ContentBlock content={answer.content} />}
							value={answer.next || ''}
							onChange={onChange}
						/>
					))}
				</Stack>
				<FormSubmit buttons={parsedButtons} locale={locale} />
			</Stack>
		</form>
	);
};
