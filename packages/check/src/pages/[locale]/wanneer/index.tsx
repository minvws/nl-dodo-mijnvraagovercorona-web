/** @jsx jsx */
import { jsx } from 'theme-ui';
import { MetaTags } from 'components/meta-tags';
import React, { useState } from 'react';
import { Page } from 'components/page';
import {
	DatepickerTopbar,
	DatepickerTopbarTitle,
	DatepickerBacklinkWrapper,
	ScreenReaderOnly,
	BodyContainer,
	Datepicker,
	Link,
	formatShortDate,
} from '@quarantaine/common';
import 'react-day-picker/lib/style.css';

// @TODO: Add site settings
const months = [
	'Januari',
	'Februari',
	'Maart',
	'April',
	'Mei',
	'Juni',
	'Juli',
	'Augustus',
	'September',
	'Oktober',
	'November',
	'December',
];

const daysShort = ['M', 'D', 'W', 'D', 'V', 'Z', 'Z'];

// @TODO: CMS
const pageSettings = {
	back: 'Terug naar de vorige pagina',
	chooseADate: 'Kies een datum',
	title: 'Wanneer was je voor het laatst bij deze persoon in de buurt?',
	toResult: 'Naar resultaat',
};

export default function JouwSituatie() {
	const [selectedDate, setSelectedDate] = useState<Date>();

	return (
		<>
			<MetaTags title={pageSettings.title} description="" url="/nl/wanneer" />
			<Page title={pageSettings.title} withoutContainer>
				<DatepickerTopbar>
					<DatepickerTopbarTitle
						title={pageSettings.chooseADate}
						subtitle={
							// @TODO: Locale
							selectedDate ? formatShortDate(selectedDate, 'nl') : undefined
						}
					/>
					<DatepickerBacklinkWrapper>
						<Link href="/jouw-situatie">
							<ScreenReaderOnly>{pageSettings.back}</ScreenReaderOnly>
						</Link>
					</DatepickerBacklinkWrapper>
				</DatepickerTopbar>
				<BodyContainer sx={{ display: 'flex', flexDirection: 'column' }}>
					<Datepicker
						variant="singleDay"
						months={months}
						weekdaysShort={daysShort}
						onDayClick={setSelectedDate}
					/>

					{selectedDate && (
						<Link
							sx={{ marginLeft: 'auto', marginY: '24px' }}
							styledAs="button"
						>
							{pageSettings.toResult}
						</Link>
					)}
				</BodyContainer>
			</Page>
		</>
	);
}
