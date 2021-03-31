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
	Hero,
	Dialog,
	formatShortDate,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	useSanitySiteSettings,
	cartesianProduct,
	Header,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';

import 'react-day-picker/lib/style.css';
import { useRouter } from 'next/router';
import { differenceInDays, startOfDay, format } from 'date-fns';

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

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		modal: {
			link: string;
			text: string;
			title: string;
		};
	};
	button: string;
	datumKiesTekst: string;
	terugTekst: string;
	maanden: string[];
	dagen: string[];
	url: string;
}

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

export default function Wanneer({ situatie, locale }) {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();
	const [selectedDate, setSelectedDate] = useState<Date>();
	const [showDialog, setShowDialog] = useState(false);
	const router = useRouter();

	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

	// @TODO: Disable dates in the future?
	const nrOfDaysAgo = useMemo(() => {
		if (!selectedDate) return null;
		return differenceInDays(startOfDay(new Date()), startOfDay(selectedDate));
	}, [selectedDate]);

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={page.url.replace('$$situatie', situatie)}
			/>

			<Page title={page.header.title}>
				<Hero>
					{/* <ProgressMarker stage={1} totalStages={2} /> */}
					<Link fontWeight="lighter" as="button" onClick={openDialog}>
						{page.header.modal.link}
					</Link>
					<Dialog
						title={page.header.modal.title}
						isVisible={showDialog}
						closeDialog={() => setShowDialog(false)}
					>
						<p>{page.header.modal.text}</p>
					</Dialog>
				</Hero>
				<DatepickerTopbar>
					<DatepickerTopbarTitle
						title={page.datumKiesTekst}
						subtitle={
							selectedDate ? formatShortDate(selectedDate, locale) : undefined
						}
					/>
					<DatepickerBacklinkWrapper>
						<Link href="/nl/jouw-situatie">
							<ScreenReaderOnly>{page.terugTekst}</ScreenReaderOnly>
						</Link>
					</DatepickerBacklinkWrapper>
				</DatepickerTopbar>
				<BodyContainer sx={{ display: 'flex', flexDirection: 'column' }}>
					<Datepicker
						disabledDays={(day) => day > new Date()}
						variant="singleDay"
						months={page.maanden}
						weekdaysShort={page.dagen}
						onDayClick={setSelectedDate}
					/>

					{selectedDate && nrOfDaysAgo !== null && (
						<Link
							sx={{ marginLeft: 'auto', marginY: '24px' }}
							styledAs="button"
							href={
								datePageUrlToResultUrl(router.asPath, nrOfDaysAgo, 10) +
								`?event=${format(selectedDate, 'dd-MM-yyyy')}`
							}
						>
							{page.button}
						</Link>
					)}
				</BodyContainer>
			</Page>
		</>
	);
}

type Situaties =
	| 'ik-kan-geen-afstand-houden'
	| 'ik-kan-wel-afstand-houden'
	| 'ik-ben-misschien-besmet'
	| 'ik-heb-een-coronamelder-melding-gekregen'
	| 'ik-kom-uit-een-risicogebied'
	| 'ik-heb-corona-met-klachten'
	| 'ik-heb-corona-zonder-klachten';

interface WanneerStaticProps {
	params: { locale: 'nl' | 'en'; situatie: Situaties };
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: WanneerStaticProps) => {
	const headerPath = {
		'ik-kan-geen-afstand-houden': 'headerHuisgenootGeenAfstand',
		'ik-kan-wel-afstand-houden': 'headerHuisgenootAfstand',
		'ik-ben-misschien-besmet': 'headerBuurt',
		'ik-heb-een-coronamelder-melding-gekregen': 'headerBuurt',
		'ik-kom-uit-een-risicogebied': 'headerReis',
		'ik-heb-corona-met-klachten': 'headerCoronaMetKlachten',
		'ik-heb-corona-zonder-klachten': 'headerCoronaZonderKlachten',
	}[situatie];

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
			${getLocaleProperty({ name: 'title', path: `${headerPath}.title`, locale })},
			"modal": {
				${getLocaleProperty({
					name: 'link',
					path: `${headerPath}.modal.link`,
					locale,
				})},
				${getLocaleProperty({
					name: 'text',
					path: `${headerPath}.modal.text`,
					locale,
				})},
				${getLocaleProperty({
					name: 'title',
					path: `${headerPath}.modal.title`,
					locale,
				})},
			}
		},
		${getLocaleProperty({ name: 'button', locale })},
		${getLocaleProperty({ name: 'datumKiesTekst', locale })},
		${getLocaleProperty({ name: 'terugTekst', locale })},
		${getLocaleProperty({ name: 'maanden', locale, array: true })},
		${getLocaleProperty({ name: 'dagen', locale, array: true })},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'wanneer-page',
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			situatie,
			siteSettings,
			locale,
		},
	};
};

export const getStaticPaths = async () => {
	const situations = await getSituations();

	return {
		paths: cartesianProduct(
			situations,
			['nl'].map((locale) => `${locale}`),
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),
		fallback: false,
	};
};
