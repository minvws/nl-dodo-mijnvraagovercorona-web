/** @jsx jsx */
import React, { useState } from 'react';
import { jsx } from 'theme-ui';
import { useRouter } from 'next/router';
import { getHrefWithlocale, Input, Locales, Stack } from '@quarantaine/common';
import { FormSubmit, FormSubmitProps } from './submit';
import { ContentStream, ContentStreamProps } from '../content';

export interface FormAnswersAgeProps {
	locale: Locales;
	content: ContentStreamProps;
	placeholder: string;
	label: string;
	buttons: FormSubmitProps['buttons'];
}

export const FormAnswersAge: React.FC<FormAnswersAgeProps> = ({
	buttons,
	content,
	locale,
	label,
	placeholder,
}) => {
	const router = useRouter();
	const [age, setAge] = useState<number>();

	// submit the chosen answer
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const next = buttons.find((button) => button.standard)?.next;

		if (age && age > 0)
			router.push(
				`/${getHrefWithlocale(
					`/${next}${
						window.location.search ? `${window.location.search}&` : '?'
					}leeftijd=${age}`,
					locale,
				)}`,
			);
	};

	const onChange = (event: React.KeyboardEvent<HTMLInputElement>) => {
		setAge(parseInt(event.currentTarget.value, 10));
	};

	// Loop though buttons and add a disabled prop when we cannot submit
	const parsedButtons = buttons.map((button, index) =>
		index === 0 && button.standard
			? {
					...button,
					disabled: !age,
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
						name={label}
						label={label}
						placeholder={placeholder}
						id={label}
						onChange={onChange}
					/>
				</Stack>
				<FormSubmit buttons={parsedButtons} locale={locale} />
			</Stack>
		</form>
	);
};
