/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useMemo, useState } from 'react';

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
	cartesianProduct,
} from '@quarantaine/common';

import 'react-day-picker/lib/style.css';
import { situationsJij, situationsOther } from 'pages/[locale]/jouw-situatie';
import { useRouter } from 'next/router';
import { differenceInDays, startOfDay } from 'date-fns';

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

const datePageUrlToResultUrl = (
	datePageUrl: string,
	day: number,
	maxDays: number,
) => {
	const daySuffix = day === 0 || maxDays === 1 ? '' : `/${day}-dagen-geleden`;

	return datePageUrl.replace(
		'/wanneer',
		day > maxDays ? '/geen-resultaat' : daySuffix,
	);
};

export default function Wanneer() {
	const page = useSanityPageContent();
	const siteSettings = useSanitySiteSettings();
	const [selectedDate, setSelectedDate] = useState<Date>();
	const router = useRouter();

	// @TODO: Disable dates in the future?
	const nrOfDaysAgo = useMemo(() => {
		if (!selectedDate) return null;
		return differenceInDays(startOfDay(new Date()), startOfDay(selectedDate));
	}, [selectedDate]);
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

					{selectedDate && nrOfDaysAgo !== null && (
						<Link
							sx={{ marginLeft: 'auto', marginY: '24px' }}
							styledAs="button"
							href={datePageUrlToResultUrl(router.asPath, nrOfDaysAgo, 10)}
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

export const getStaticPaths = () => {
	// @TODO: Add paths from CMS here.
	const situaties = [...situationsJij, ...situationsOther]
		.filter((s) => s.ctas[0]?.name)
		.map((s) => s.ctas[0].name);

	return {
		paths: cartesianProduct(
			situaties,
			['nl', 'en'].map((locale) => `${locale}`),
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),
		fallback: false,
	};
};
