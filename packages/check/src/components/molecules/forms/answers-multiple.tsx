/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import {
	Control,
	getHrefWithlocale,
	Locales,
	Stack,
	StyledLink,
} from '@quarantaine/common';
import { Box, jsx } from 'theme-ui';
import { FormSubmit, FormSubmitProps } from './submit';
import { useRouter } from 'next/router';
import { ContentStream, ContentStreamProps } from '../content';

export interface FormAnswersMultipleProps {
	answers: {
		_key: string;
		content: string;
		checked?: boolean;
	}[];
	buttons: FormSubmitProps['buttons'];
	content: ContentStreamProps;
	locale: Locales;
	showMoreLabel: string;
	limit?: number;
}

export const FormAnswersMultiple: React.FC<FormAnswersMultipleProps> = ({
	answers,
	buttons,
	content,
	locale,
	showMoreLabel,
	limit = 6,
}) => {
	const router = useRouter();
	const [visibleAnswers, setVisibleAnswers] = useState<
		FormAnswersMultipleProps['answers']
	>();
	const [checkedAnswers, setCheckedAnswers] = useState(answers);
	const [showMore, setShowMore] = useState<boolean>(true);
	const [canSubmit, setCanSubmit] = useState<boolean>(false);

	// Only display a subset of answers
	useEffect(() => {
		if (answers) setVisibleAnswers(answers.slice(0, limit));
	}, [answers]);

	// check if there is atleast one answer checked, so we enable submit action
	useEffect(() => {
		setCanSubmit(
			checkedAnswers.filter((answer) => answer.checked).length ? true : false,
		);
	}, [checkedAnswers]);

	// Form submit action
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// trigger main button action
		if (buttons[0].next && canSubmit)
			router.push(`/${getHrefWithlocale(`/${buttons[0].next}`, locale)}`);
	};

	// Checkbox onchange action
	const onChange = (value: string) => {
		setCheckedAnswers(
			checkedAnswers.map((answer) =>
				answer.content === value
					? { ...answer, checked: answer.checked ? false : true }
					: answer,
			),
		);
	};

	// Loop though buttons and add a disabled prop when we cannot submit
	const parsedButtons = buttons.map((button, index) =>
		index === 0 && button.standard
			? { ...button, disabled: !canSubmit }
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
				{answers ? (
					<Stack spacing={['1rem']}>
						{visibleAnswers?.map((answer) => (
							<Control
								type="checkbox"
								name="answersMultiple"
								key={answer._key}
								id={answer._key}
								label={answer.content}
								value={answer.content}
								onChange={onChange}
							/>
						))}
					</Stack>
				) : null}
				{showMore && answers ? (
					<Box sx={{ marginInlineStart: '1.5rem' }}>
						<StyledLink
							as="button"
							styledAs="show-more"
							type="button"
							withChevron={false}
							icon="/icons/plus.svg"
							onClick={() => {
								setVisibleAnswers(answers);
								setShowMore(false);
							}}
						>
							{showMoreLabel}
						</StyledLink>
					</Box>
				) : null}
				<FormSubmit buttons={parsedButtons} locale={locale} />
			</Stack>
		</form>
	);
};
