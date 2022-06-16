/** @jsx jsx */
import React, { useState } from 'react';
import { Box, Flex, Image, jsx } from 'theme-ui';
import { useRouter } from 'next/router';
import {
	Content,
	ContentBlock,
	Control,
	getHrefWithlocale,
	Input,
	Locales,
	Stack,
} from '@quarantaine/common';
import { FormSubmit, FormSubmitProps } from './submit';
import { ContentStream, ContentStreamProps } from '../content';

export interface FormAnswersAgeProps {
	locale: Locales;
	content: ContentStreamProps;
	buttons: FormSubmitProps['buttons'];
}

export const FormAnswersAge: React.FC<FormAnswersAgeProps> = ({
	buttons,
	content,
	locale,
}) => {
	const router = useRouter();
	const [selectedOption, setSelectedOption] = useState<string>();

	// submit the chosen answer
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const queryString = router.query.datum
			? `?datum=${router.query.datum}`
			: '';

		if (selectedOption)
			router.push(
				`/${getHrefWithlocale(`/${selectedOption}${queryString}`, locale)}`,
			);
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
					<Input
						type="number"
						name="test"
						label="Test"
						id="test"
						onChange={onChange}
					/>
				</Stack>
				<FormSubmit buttons={parsedButtons} locale={locale} />
			</Stack>
		</form>
	);
};
