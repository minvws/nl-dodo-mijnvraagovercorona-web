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
	Content,
	getSituationPageQuery,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';

import 'react-day-picker/lib/style.css';
import { useRouter } from 'next/router';
import { differenceInDays, startOfDay, format } from 'date-fns';
import { ProgressMarker } from 'components/progress-marker';
import { Situation } from 'config/situaties';

interface PageContent {
	page: {
		metaData: {
			title: string;
			description: string;
		};
		button: string;
		datumKiesTekst: string;
		terugTekst: string;
		maanden: string[];
		dagen: string[];
		url: string;
		currentStepLabel: string;
	};
	situation: {
		header: {
			title: string;
			modal: {
				link: string;
				title: string;
				content: Object[];
			};
		};
	};
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
	currentSituation: Situation;
	locale: 'nl';
	maxDays: number;
}

export default function Wanneer({
	currentSituation,
	locale,
	maxDays,
}: WanneerProps) {
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
				title={page.page.metaData.title}
				description={page.page.metaData.title}
				url={page.page.url.replace('$$situatie', currentSituation.url)}
			/>

			<Page>
				<Hero title={page.situation.header.title}>
					<ProgressMarker
						currentStageLabel={page.page.currentStepLabel}
						currentStage={2}
					/>
					<Link fontWeight="lighter" as="button" onClick={openDialog}>
						{page.situation.header.modal.link}
					</Link>
					<Dialog
						title={page.situation.header.modal.title}
						isVisible={showDialog}
						closeDialog={() => setShowDialog(false)}
					>
						<ContentBlock content={page.situation.header.modal.content} />
					</Dialog>
				</Hero>
				<Content noSpacingOnTop>
					<DatepickerTopbar>
						<DatepickerTopbarTitle
							title={page.page.datumKiesTekst}
							subtitle={
								selectedDate ? formatShortDate(selectedDate, locale) : undefined
							}
						/>
						<DatepickerBacklinkWrapper>
							<Link
								href={
									currentSituation.showProtected
										? `/${currentSituation.url}/ben-ik-beschermd`
										: '/jouw-situatie'
								}
							>
								<ScreenReaderOnly>{page.page.terugTekst}</ScreenReaderOnly>
							</Link>
						</DatepickerBacklinkWrapper>
					</DatepickerTopbar>
					<BodyContainer sx={{ display: 'flex', flexDirection: 'column' }}>
						<Datepicker
							disabledDays={(day) => day > addDays(startOfDay(new Date()), 1)}
							variant="singleDay"
							showPreviousMonth
							months={page.page.maanden}
							weekdaysShort={page.page.dagen}
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

						<span ref={linkRef} sx={{ display: 'flex' }}>
							{selectedDate && nrOfDaysAgo !== null && (
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
									{page.page.button}
								</Link>
							)}
						</span>
					</BodyContainer>
				</Content>
			</Page>
		</>
	);
}

interface WanneerStaticProps {
	params: { locale: 'nl' | 'en'; situatie: string };
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: WanneerStaticProps) => {
	const situations = await getSituations();
	const currentSituation = situations.find((s) => s.url === situatie);

	const maxDays = currentSituation?.maxDays || 10;

	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
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

	const situationPageProjection = `{
		"header": {
			${getLocaleProperty({ name: 'title', path: `dateHeader.title`, locale })},
			"modal": {
				${getLocaleProperty({
					name: 'link',
					path: `dateHeader.modal.link`,
					locale,
				})},
				${getLocaleProperty({
					name: 'content',
					path: `dateHeader.modal.content`,
					locale,
				})},
				${getLocaleProperty({
					name: 'title',
					path: `dateHeader.modal.title`,
					locale,
				})},
			}
		},
	}`;

	const { page: situationPage } = await sanityClient.fetch(
		getSituationPageQuery({
			type: 'situation-document',
			situationSlug: situatie,
			pageProjection: situationPageProjection,
			locale,
		}),
	);

	return {
		props: {
			page: { page, situation: situationPage },
			currentSituation,
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
			situations
				.filter((situation) => situation.showDate)
				.map((situation) => situation.url),
			['nl', 'en'].map((locale) => `${locale}`),
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),
		fallback: false,
	};
};
