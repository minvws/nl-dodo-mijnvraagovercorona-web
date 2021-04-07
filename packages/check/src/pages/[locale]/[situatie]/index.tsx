/** @jsx jsx */
import { Box, jsx, Styled, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import {
	parse,
	differenceInDays,
	addDays,
	startOfDay,
	endOfDay,
} from 'date-fns';

import {
	BodyContainer,
	CallToAction,
	Link,
	SaveInCalendar,
	MetaTags,
	getLocaleProperty,
	sanityClient,
	getPageQuery,
	useSanityPageContent,
	useSanitySiteSettings,
	ContentBlock,
	Feedback,
} from '@quarantaine/common';

import { SiteSettings } from 'content/site-settings';
import { Page } from 'components/page';
import {
	QuarantaineOverviewBlock,
	QuarantaineOverviewBullet,
} from 'components/quarantine-overview';
import { GGDSpecialInstructions } from 'components/ggd-special-instructions';
import { getSituations } from 'utilities/situations';
import { PrinterIcon } from 'icons/printer';
import { getSanityPageIdBySituation, Situaties } from 'config/situaties';

const getDateSinceEvent = ({
	day,
	todayDay,
	eventDate,
	locale,
}: {
	day: number | undefined;
	todayDay: number;
	eventDate: Date;
	locale: string;
}) => {
	const daysSince = day === undefined ? todayDay : day;

	return addDays(eventDate, daysSince).toLocaleDateString(locale, {
		weekday: 'short',
		month: 'long',
		day: 'numeric',
	});
};

const getDayDifference = (
	day: QuarantainePlanDay,
	previousDay: QuarantainePlanDay,
) => {
	const current = day?.day;
	const previous = previousDay?.day;

	if (!isNaN(current) && !isNaN(previous)) {
		return Math.max(current - previous - 1, 0);
	}

	return 0;
};

const filterQuarantinePlan = ({
	quarantinePlan,
	todayDay,
}: {
	quarantinePlan: QuarantainePlan;
	todayDay: number;
}): QuarantainePlan =>
	quarantinePlan
		? quarantinePlan
				.map((day) => ({
					...day,
					day: day.day === undefined ? todayDay : day.day,
				}))
				.filter(
					({ showOn }) => showOn === undefined || showOn.includes(todayDay),
				)
				.map((day, index, plan) => ({
					...day,
					difference: getDayDifference(day, plan[index - 1]),
				}))
		: [];

const parseDateFromUrl = (date: string): number =>
	date[0] ? parseInt(date[0], 10) : 0;

type QuarantainePlanDay = {
	day: number;
	showOn?: Array<number>;
	title: string;
	bullets: Array<Array<Object>>;
	difference: number;
};

type QuarantainePlan = QuarantainePlanDay[];
interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	pretitle: string;
	quarantinePlan: QuarantainePlan;
	showPrintAndCalendar: boolean;
	quarantaineDuration?: number;
	url: string;
}

interface SituatieProps {
	locale: 'nl' | 'en';
	date: string;
}

export default function Situatie({ locale, date }: SituatieProps) {
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings<SiteSettings>();
	const router = useRouter();

	const selectedLastEventDate = router.query.event
		? parse(`${router.query.event}`, 'dd-MM-yyyy', new Date())
		: undefined;

	const todayDay = selectedLastEventDate
		? differenceInDays(new Date(), selectedLastEventDate)
		: undefined;

	const quarantainePlan = filterQuarantinePlan({
		quarantinePlan: page.quarantinePlan,
		todayDay: todayDay || parseDateFromUrl(date),
	});

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
			/>
			<Page
				title={page.header.title}
				headerPrefix={page.pretitle}
				showRetryLink
			>
				<Box
					sx={{
						backgroundColor: 'headerBackground',
						py: 'box',
					}}
				>
					<BodyContainer sx={{ paddingRight: [, '165px'] }}>
						<Styled.h2>{siteSettings.quarantineOverviewTitle}</Styled.h2>

						{quarantainePlan.map((day) => (
							<QuarantaineOverviewBlock
								key={day.title}
								/**
								 * If no date is provided we show the "laatste contact", "vandaag" values as the main title.
								 */
								title={
									selectedLastEventDate && todayDay
										? getDateSinceEvent({
												day: day.day,
												todayDay,
												eventDate: selectedLastEventDate,
												locale,
										  })
										: day.title
								}
								subtitle={selectedLastEventDate ? `(${day.title})` : ''}
								day={`dag ${day.day}`}
								dividers={day.difference}
							>
								{day.bullets &&
									day.bullets.map((content, index) => (
										<QuarantaineOverviewBullet key={index}>
											<ContentBlock content={content} />
										</QuarantaineOverviewBullet>
									))}
							</QuarantaineOverviewBlock>
						))}

						<Box sx={{ mt: 'box' }}>
							<GGDSpecialInstructions />
						</Box>
					</BodyContainer>
				</Box>
				<BodyContainer sx={{ mt: '32px' }}>
					<Box
						sx={{
							width: '380px',
							maxWidth: '100%',
							button: {
								background: 'transparent',
								p: 0,
								border: 0,
								width: '100%',
								mb: 'box',
								':hover, :focus': {
									'> span': {
										backgroundColor: '#fcfeff',
									},
								},
								'> span': {
									border: 'none',
									backgroundColor: '#eef7fB',
									transition: 'background 300ms ease-in-out',
									p: { fontWeight: 'normal', fontSize: '19px' },
									backgroundImage: 'none',
									padding: '14px',
								},
								svg: {
									width: '24px',
									height: '18px',
								},
							},
						}}
					>
						<Link
							styledAs="button"
							href={siteSettings.quarantaineGids.url}
							external
						>
							{siteSettings.quarantaineGids.button}
						</Link>

						<Text variant="small">{siteSettings.quarantaineGids.text}</Text>

						{page.showPrintAndCalendar && selectedLastEventDate && (
							<>
								<SaveInCalendar
									locale="nl" // @TODO: Locale
									content={{
										tot_en_met: siteSettings.quarantaineCalendar.dateSeperator,
										other_calendar:
											siteSettings.quarantaineCalendar.otherCalendar,
									}}
									title={siteSettings.quarantaineCalendar.title}
									modalTitle={siteSettings.quarantaineCalendar.modalTitle}
									modalBody={siteSettings.quarantaineCalendar.modalBody}
									inviteTitle={siteSettings.quarantaineCalendar.inviteTitle}
									inviteText={siteSettings.quarantaineCalendar.inviteText}
									fromDate={startOfDay(selectedLastEventDate)}
									toDate={endOfDay(
										addDays(
											selectedLastEventDate,
											page.quarantaineDuration || 10,
										),
									)}
									hideDate
								/>
								<button onClick={() => window.print()}>
									<CallToAction icon={PrinterIcon}>
										<p>{siteSettings.printCta}</p>
									</CallToAction>
								</button>
							</>
						)}
					</Box>
					<Feedback />
				</BodyContainer>
			</Page>
		</>
	);
}

interface SituatieStaticProps {
	params: { locale: 'nl' | 'en'; situatie: Situaties; date: string };
}

export async function getStaticPaths() {
	const situations = await getSituations();

	return {
		paths: situations.map((situation) => ({
			params: {
				situatie: situation.url,
				locale: 'nl',
			},
		})),
		fallback: false,
	};
}

export const getStaticProps = async ({
	params: { locale, situatie, date },
}: SituatieStaticProps) => {
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
		${getLocaleProperty({ name: 'pretitle', locale })},
		"quarantinePlan": quarantinePlan[]{
			day,
			showOn,
			${getLocaleProperty({ name: 'title', locale })},
			${getLocaleProperty({ name: 'bullets', locale, array: true })},
		},
		showPrintAndCalendar,
    quarantaineDuration,
    maxDays,
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: getSanityPageIdBySituation(situatie),
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			locale,
			date: date || '',
		},
	};
};
