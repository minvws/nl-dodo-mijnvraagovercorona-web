/** @jsx jsx */
import React, { useState, useEffect, useContext } from 'react';
import {
	Datepicker,
	getHrefWithlocale,
	Locales,
	Stack,
	addDays,
	useSanitySiteSettings,
	DatepickerTopbar,
	DatepickerTopbarTitle,
	formatShortDate,
} from '@quarantaine/common';
import { format, startOfDay } from 'date-fns';
import { jsx } from 'theme-ui';

import { FormSubmit, FormSubmitProps } from './submit';
import { useRouter } from 'next/router';

import 'react-day-picker/lib/style.css';

export interface FormAnswersDateProps {
	buttons: FormSubmitProps['buttons'];
	locale: Locales;
}

export const FormAnswersDate: React.FC<FormAnswersDateProps> = ({
	buttons,
	locale,
}) => {
	const router = useRouter();
	const [canSubmit, setCanSubmit] = useState<boolean>(false);
	const [selectedDate, setSelectedDate] = useState<Date>();
	const siteSettings = useSanitySiteSettings();

	// check if there is at least one answer checked, so we enable submit action
	useEffect(() => {
		if (selectedDate) setCanSubmit(true);
	}, [selectedDate]);

	// Form submit action
	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		// trigger main button action
		if (buttons[0].next && selectedDate && canSubmit)
			router.push({
				pathname: `/${getHrefWithlocale(`/${buttons[0].next}`, locale)}`,
				query: `datum=${format(selectedDate, 'dd-MM-yyyy')}`,
			});
	};

	// Loop though buttons and add a disabled prop when we cannot submit
	const parsedButtons = buttons.map((button, index) =>
		index === 0 && button.standard
			? { ...button, disabled: !canSubmit }
			: { ...button },
	);

	return (
		<form action="" onSubmit={onSubmit}>
			<DatepickerTopbar>
				<DatepickerTopbarTitle
					title={siteSettings.datumKiesTekst}
					subtitle={
						selectedDate
							? formatShortDate(selectedDate, locale, false)
							: undefined
					}
				/>
			</DatepickerTopbar>
			<Stack>
				<Datepicker
					disabledDays={(day) => day > addDays(startOfDay(new Date()), 1)}
					variant="singleDay"
					showPreviousMonth
					months={siteSettings.maanden}
					weekdaysShort={siteSettings.dagen}
					onDayClick={(date) => {
						setSelectedDate(date);
					}}
				/>
				<FormSubmit buttons={parsedButtons} locale={locale} />
			</Stack>
		</form>
	);
};
