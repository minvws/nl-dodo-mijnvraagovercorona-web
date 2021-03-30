/** @jsx jsx */
import { jsx } from 'theme-ui';
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
	MetaTags,
	formatShortDate,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	useSanitySiteSettings,
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

export default function Wanneer() {
	const page = useSanityPageContent();
	const siteSettings = useSanitySiteSettings();
	const [selectedDate, setSelectedDate] = useState<Date>();

	return (
		<>
			<MetaTags title="Wanneer" description="" url="/jouw-situatie" />

			<Page title={pageSettings.title}>
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
							href="/jouw-situatie"
						>
							{pageSettings.toResult}
						</Link>
					)}
				</BodyContainer>
			</Page>
		</>
	);
}

interface WanneerStaticProps {
	params: { locale: 'nl' | 'en' };
}

export const getStaticProps = async ({
	params: { locale },
}: WanneerStaticProps) => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'button', path: 'header.button', locale })},
			${getLocaleProperty({ name: 'pretitle', path: 'header.pretitle', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
		},
		"uitleg": uitleg[]{
			"image": "/images/sanity/" + image.asset->originalFilename,
			${getLocaleProperty({ name: 'description', locale })},
			${getLocaleProperty({ name: 'pretitle', locale })},
			${getLocaleProperty({ name: 'title', locale })},
			"linklist": {
				${getLocaleProperty({ name: 'id', path: 'linklist.id', locale })},
				${getLocaleProperty({ name: 'usp', path: 'linklist.usp', locale })},
			},
		},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'reizen-tijdens-corona',
			type: 'landing-page',
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			locale,
		},
	};
};

export const getStaticPaths = () => ({
	paths: ['nl'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});
