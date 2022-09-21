/** @jsxImportSource theme-ui */
import React from 'react';
import { Container, jsx } from 'theme-ui';
import {
	BannerDataProtection,
	Layer,
	Locales,
	Retain,
	TheSidebar,
	useSanitySiteSettings,
} from '@quarantaine/common';
import { FormSubmitProps } from './submit';
import { FormAnswersSingle, FormAnswersSingleProps } from './answers-single';
import {
	FormAnswersMultiple,
	FormAnswersMultipleProps,
} from './answers-multiple';
import { FormAnswersDate } from './answers-date';
import { FormAnswersButtons } from './answers-buttons';
import { FormAnswersAge } from './answers-age';

export interface AnswerSwitchProps {
	content: FormAnswersSingleProps['content'];
	answersMultiple: FormAnswersMultipleProps['answers'];
	showMore: {
		max: number;
		label: {
			this: string;
			that: string;
		};
	};
	answersSingle: FormAnswersSingleProps['answers'];
	ageInput: {
		label: string;
		placeholder: string;
	};
	type: 'multiple' | 'single' | 'datepicker' | 'buttons' | 'age';
	buttons: FormSubmitProps['buttons'];
}

interface OwnProps extends AnswerSwitchProps {
	locale: Locales;
	showAside?: boolean;
}

export const AnswerSwitch: React.FC<OwnProps> = ({
	content,
	answersMultiple,
	answersSingle,
	showMore,
	ageInput,
	buttons,
	type,
	locale,
	showAside = true,
}) => {
	const siteSettings = useSanitySiteSettings();

	const layerPaddingBlockStart =
		type === 'datepicker' ? ['0'] : ['2rem', '3.75rem'];

	const asideOffset = type === 'datepicker' ? [0, '3.25rem'] : [0];

	return (
		<Layer backgroundColor="white" paddingBlockStart={layerPaddingBlockStart}>
			<Container>
				<TheSidebar
					asideChildren={
						showAside ? (
							<BannerDataProtection content={siteSettings.privacy} />
						) : null
					}
					asideOffset={asideOffset}
				>
					<Retain>
						{type === 'multiple' && answersMultiple ? (
							<FormAnswersMultiple
								answers={answersMultiple}
								buttons={buttons}
								showMoreLabel={showMore.label}
								limit={showMore.max}
								locale={locale}
								content={content}
							/>
						) : type === 'single' && answersSingle ? (
							<FormAnswersSingle
								answers={answersSingle}
								buttons={buttons}
								locale={locale}
								content={content}
							/>
						) : type === 'datepicker' ? (
							<FormAnswersDate buttons={buttons} locale={locale} />
						) : type === 'buttons' ? (
							<FormAnswersButtons
								buttons={buttons}
								locale={locale}
								content={content}
							/>
						) : type === 'age' ? (
							<FormAnswersAge
								buttons={buttons}
								locale={locale}
								placeholder={ageInput.placeholder}
								label={ageInput.label}
								content={content}
							/>
						) : null}
					</Retain>
				</TheSidebar>
			</Container>
		</Layer>
	);
};
