/** @jsx jsx */
import React, { useState } from 'react';
import { Box, Flex, Image, jsx } from 'theme-ui';
import { useRouter } from 'next/router';
import {
	Content,
	ContentBlock,
	Control,
	getHrefWithlocale,
	isBrowser,
	Locales,
	Stack,
} from '@quarantaine/common';
import { FormSubmit, FormSubmitProps } from './submit';
import { ContentStream, ContentStreamProps } from '../content';

export interface FormAnswersSingleProps {
	locale: Locales;
	answers: {
		content: Object[];
		next: string;
		_key: string;
	}[];
	buttons: FormSubmitProps['buttons'];
	content: ContentStreamProps;
}

export const FormAnswersSingle: React.FC<FormAnswersSingleProps> = ({
	answers,
	buttons,
	content,
	locale,
}) => {
	const router = useRouter();
	const [selectedOption, setSelectedOption] = useState<string>();

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (selectedOption)
			router.push(
				`/${getHrefWithlocale(
					`/${selectedOption}${window.location.search}`,
					locale,
				)}`,
			);
	};

	// onchange radio & set selectedOption
	const onChange = (value: string) => {
		setSelectedOption(value);
	};

	// Loop though buttons and add a disabled prop when we cannot submit
	const parsedButtons = buttons?.map((button, index) =>
		index === 0 && button.standard
			? {
					...button,
					disabled: selectedOption && selectedOption !== '' ? false : true,
			  }
			: {
					...button,
					next: isBrowser()
						? `${button.next}${window.location.search}`
						: button.next,
			  },
	);

	return (
		<form
			action=""
			onSubmit={onSubmit}
			sx={{
				position: 'relative',
			}}
		>
			<Stack>
				<ContentStream {...content} />
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
