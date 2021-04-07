/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useMemo, useRef, useState } from 'react';

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
	cartesianProduct,
	ContentBlock,
	addDays,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';

import 'react-day-picker/lib/style.css';
import { useRouter } from 'next/router';
import { differenceInDays, startOfDay, format } from 'date-fns';
import { ProgressMarker } from 'components/progress-marker';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		modal: {
			link: string;
			title: string;
			content: Object[];
		};
	};
	button: string;
	datumKiesTekst: string;
	terugTekst: string;
	maanden: string[];
	dagen: string[];
	url: string;
	currentStepLabel: string;
}

const datePageUrlToResultUrl = (
	datePageUrl: string,
	day: number,
	maxDays: number,
	locale: 'nl' | 'en',
) => {
	const daySuffix =
		day === 0 || maxDays === 1
			? ''
			: day === 1
			? `/${day}-dag-geleden`
			: `/${day}-dagen-geleden`;
	if (day > maxDays) return `/${locale}/geen-advies`;
	return datePageUrl.replace('/wanneer', daySuffix);
};

interface WanneerProps {
	situatie: Situaties;
	locale: 'nl';
	maxDays: number;
}

export default function Wanneer({ situatie, locale, maxDays }: WanneerProps) {
	const page = useSanityPageContent<PageContent>();
	const [selectedDate, setSelectedDate] = useState<Date>();
	const [showDialog, setShowDialog] = useState(false);
	const router = useRouter();
	const linkRef = useRef<HTMLAnchorElement>(null);

	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

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
					<ProgressMarker
						currentStageLabel={page.currentStepLabel}
						currentStage={2}
					/>
					<Link fontWeight="lighter" as="button" onClick={openDialog}>
						{page.header.modal.link}
					</Link>
					<Dialog
						title={page.header.modal.title}
						isVisible={showDialog}
						closeDialog={() => setShowDialog(false)}
					>
						<ContentBlock content={page.header.modal.content} />
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
						disabledDays={(day) => day > addDays(startOfDay(new Date()), 1)}
						variant="singleDay"
						showPreviousMonth
						months={page.maanden}
						weekdaysShort={page.dagen}
						onDayClick={(date) => {
							if (
								linkRef.current &&
								typeof linkRef.current.scrollIntoView === 'function' &&
								window.innerWidth < 800
							) {
								linkRef.current.scrollIntoView({ block: 'center' });
							}
							setSelectedDate(date);
						}}
					/>

					{selectedDate && nrOfDaysAgo !== null && (
						<span ref={linkRef} sx={{ display: 'flex' }}>
							<Link
								sx={{ marginLeft: 'auto' }}
								styledAs="button"
								href={
									datePageUrlToResultUrl(
										router.asPath,
										nrOfDaysAgo,
										maxDays,
										locale,
									) + `?event=${format(selectedDate, 'dd-MM-yyyy')}`
								}
							>
								{page.button}
							</Link>
						</span>
					)}
				</BodyContainer>
			</Page>
		</>
	);
}

type Situaties =
	| 'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-geen-klachten'
	| 'ik-kan-afstand-houden'
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
	const situations = await getSituations();
	const currentSituation = situations.find((s) => s.url === situatie);

	const maxDays = currentSituation?.maxDays || 10;

	const headerPath = {
		'ik-ben-misschien-besmet': 'headerBuurt',
		'ik-heb-een-coronamelder-melding-gekregen': 'headerCoronamelder',
		'ik-kom-uit-een-risicogebied': 'headerReis',
		'ik-heb-corona-met-klachten': 'headerCoronaMetKlachten',
		'ik-heb-corona-zonder-klachten': 'headerCoronaZonderKlachten',
		'ik-kan-afstand-houden': 'headerHuisgenootAfstand',
		'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-geen-klachten':
			'headerHuisgenootGeenAfstand',
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
					name: 'content',
					path: `${headerPath}.modal.content`,
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
    ${getLocaleProperty({ name: 'currentStepLabel', locale })},
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
			maxDays,
		},
	};
};

export const getStaticPaths = async () => {
	const situations = await getSituations();

	return {
		paths: cartesianProduct(
			situations.map((situation) => situation.url),
			['nl'].map((locale) => `${locale}`),
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),
		fallback: false,
	};
};
