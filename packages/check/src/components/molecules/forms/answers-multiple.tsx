/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import { Control, Locales, Stack, StyledLink } from '@quarantaine/common';
import { Box, jsx } from 'theme-ui';
import { FormSubmit, FormSubmitProps } from './submit';

export interface FormAnswersMultipleProps {
	answers: {
		_key: string;
		content: string;
		checked?: boolean;
	}[];
	buttons: FormSubmitProps['buttons'];
	locale: Locales;
	showMoreLabel: string;
	limit?: number;
}

export const FormAnswersMultiple: React.FC<FormAnswersMultipleProps> = ({
	answers,
	buttons,
	locale,
	showMoreLabel,
	limit = 6,
}) => {
	const [visibleAnswers, setVisibleAnswers] = useState<
		FormAnswersMultipleProps['answers']
	>();
	const [showMore, setShowMore] = useState<boolean>(true);
	const [checkedAnswers, setCheckedAnswers] = useState(answers);
	const [canSubmit, setCanSubmit] = useState<boolean>(false);

	useEffect(() => {
		if (answers) setVisibleAnswers(answers.slice(0, limit));
	}, [answers]);

	useEffect(() => {
		setCanSubmit(
			checkedAnswers.filter((answer) => answer.checked).length ? true : false,
		);
	}, [checkedAnswers]);

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('submit');
	};

	const onChange = (value: string) => {
		setCheckedAnswers(
			checkedAnswers.map((answer) =>
				answer.content === value
					? { ...answer, checked: answer.checked ? false : true }
					: answer,
			),
		);
	};

	return (
		<form action="" onSubmit={onSubmit}>
			<Stack>
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
				<FormSubmit buttons={buttons} locale={locale} canSubmit={canSubmit} />
			</Stack>
		</form>
	);
};
