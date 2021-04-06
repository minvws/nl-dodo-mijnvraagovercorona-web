/** @jsx jsx */
import { Box, jsx, Styled, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import {
	parse,
	differenceInDays,
	addDays,
	format,
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

const getDayLabel = ({
	day,
	title,
	todayDay,
}: {
	day: number | undefined;
	title: string;
	todayDay?: number;
}) => {
	if (title === 'Vandaag') {
		return todayDay ? `dag ${todayDay}` : '';
	}

	return `dag ${day}`;
};

const filterQuarantinePlan = ({
	quarantinePlan,
	todayDay,
}: {
	quarantinePlan: QuarantainePlan;
	todayDay: number;
}): QuarantainePlan =>
	quarantinePlan
		? quarantinePlan.filter(
				({ showOn }) => showOn === undefined || showOn.includes(todayDay),
		  )
		: [];

type QuarantainePlan = {
	day?: number;
	showOn?: Array<number>;
	title: string;
	bullets: Array<Array<Object>>;
}[];
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
}

export default function Situatie({ locale }: SituatieProps) {
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
		todayDay: todayDay || 0, // TODO: provide day
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
				<Box sx={{ backgroundColor: 'headerBackground', py: 'box' }}>
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
								day={getDayLabel({ day: day.day, title: day.title, todayDay })}
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

type Situaties =
	| 'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-geen-klachten'
	| 'ik-kan-afstand-houden'
	| 'ik-ben-misschien-besmet'
	| 'ik-heb-een-coronamelder-melding-gekregen'
	| 'ik-kom-uit-een-risicogebied'
	| 'ik-heb-corona-met-klachten'
	| 'ik-heb-corona-zonder-klachten';

interface SituatieStaticProps {
	params: { locale: 'nl' | 'en'; situatie: Situaties };
}

export async function getStaticPaths() {
	const situations = await getSituations();

	return {
		paths: situations.map((situation) => ({
			params: {
				situatie: situation,
				locale: 'nl',
			},
		})),
		fallback: false,
	};
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: SituatieStaticProps) => {
	const type = {
		'ik-heb-1-of-meer-coronaklachten': 'situatie-zelf-klachten-page',
		'ik-ben-misschien-besmet': 'situatie-buurt-page',
		'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-klachten':
			'situatie-huisgenoot-corona-geen-afstand-wel-klachten-page',
		'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-geen-klachten':
			'situatie-huisgenoot-corona-geen-afstand-geen-klachten-page',
		'ik-kan-afstand-houden': 'situatie-huisgenoot-corona-wel-afstand-page',
		'iemand-in-huis-heeft-zware-klachten':
			'situatie-huisgenoot-met-klachten-page',
		'ik-heb-een-coronamelder-melding-gekregen': 'situatie-buurt-page',
		'ik-kom-uit-een-risicogebied': 'situatie-reis-page',
		'ik-heb-corona-met-klachten': 'situatie-corona-met-klachten-page',
		'ik-heb-corona-zonder-klachten': 'situatie-corona-zonder-klachten-page',
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
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type,
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
