/** @jsx jsx */
import React, { useState, useEffect } from 'react';
import {
	Control,
	ExpansionPanel,
	getHrefWithlocale,
	isBrowser,
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
	const [canSubmit, setCanSubmit] = useState<boolean>(false);

	const split = 6;

	// Split items into 2 groups
	const firstGroup = answers.slice(0, split ? split : answers.length);
	const secondGroup = answers.slice(
		split ? split : answers.length,
		answers.length,
	);

	// check if there is atleast one answer checked, so we enable submit action
	useEffect(() => {
		setCanSubmit(!!checkedAnswers.filter((answer) => answer.checked).length);
	}, [checkedAnswers]);

	// Form submit action
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		if (buttons[0].next && canSubmit)
			router.push(
				`/${getHrefWithlocale(
					`/${buttons[0].next}${window.location.search}`,
					locale,
				)}`,
			);
	};

	// Checkbox onchange action
	const onChange = (value: string) => {
		setCheckedAnswers(
			checkedAnswers.map((answer) =>
				answer.content === value
					? { ...answer, checked: !answer.checked }
					: answer,
			),
		);
	};

	// Loop though buttons and add a disabled prop when we cannot submit
	const parsedButtons = buttons?.map((button, index) =>
		index === 0 && button.standard
			? { ...button, disabled: !canSubmit }
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
					{answers ? (
						<Stack spacing={['1rem']}>
							{firstGroup?.map((answer) => (
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
					<ExpansionPanel
						title={showMoreLabel}
						variant="plusinline"
						anchorToPanel={false}
						hideLabelWhenExpanded={true}
						// toggleEvent={(value: string) => setPanelState(value)}
					>
						<Stack spacing={['1rem']}>
							{secondGroup?.map((answer) => (
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
					</ExpansionPanel>
				</Stack>
				<FormSubmit buttons={parsedButtons} locale={locale} />
			</Stack>
		</form>
	);
};
