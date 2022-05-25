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
	Link,
	SaveInCalendar,
	MetaTags,
	getLocaleProperty,
	sanityClient,
	useSanityPageContent,
	useSanitySiteSettings,
	ContentBlock,
	Feedback,
	getFeedbackUrl,
	Hero,
	Content,
	SchemeBlock,
	SchemeBullet,
	cartesianProduct,
	PrinterIcon,
	getSituationPageQuery,
	Locales,
	StyledLink,
	Stack,
} from '@quarantaine/common';

import { SiteSettings } from 'content/site-settings';
import { Page } from 'components/page';
import { GGDSpecialInstructions } from 'components/ggd-special-instructions';
import { getSituations } from 'utilities/situations';
import { Situaties } from 'config/situaties';
import Head from 'next/head';
import { locales } from 'content/general-content';
import { LinkBack } from 'components/link-back';
import { WarningPanel } from 'components/warning-panel';
import { InformContacts, InformContactsProps } from 'components/molecules';

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
				/* Remove any blocks that should not be visible on todayDay */
				.filter(({ showOn }) => !showOn || showOn.includes(todayDay))
				/** Replace the day number with todayDay if the number is not set */
				.map((day) => ({
					...day,
					day: !day.day && day.day !== 0 ? todayDay : day.day,
				}))
				/** Add difference property containing the difference (in days) between this block and the previous one. */
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
	policy: Object[];
	pretitle: string;
	quarantinePlan: QuarantainePlan;
	quarantinePlanTitle: string;
	informContacts: InformContactsProps;
	showPrintAndCalendar: boolean;
	quarantaineDuration?: number;
	url: string;
	showExceptions?: boolean;
	showDate?: boolean;
	showInformContacts?: boolean;
}

interface SituatieProps {
	locale: Locales;
	date: string;
	situatie: string;
}

export default function Situatie({ locale, date, situatie }: SituatieProps) {
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
				url={`/${page.url}${date ? `/${date}` : ''}`}
			/>
			<Head>
				<style media="print">
					{/* These styles aren't applied on the component themselves since we
          don't want to hide them every page. */}
					{`
          header { background-color: transparent !important; padding: 0 !important; margin: 0 !important; }
          header > div, main > div { padding-bottom: 0 !important; padding-top: 0 !important; }
          header h1 {font-size: 26px !important; margin: 0 !important; }
          /* Again link */
          header a span { display: none !important; }
          aside, footer { display: none; }
          `}
				</style>
			</Head>
			<Page>
				<Hero
					title={page.header.title}
					titlePrefix={page.pretitle}
					illustrationUrl="/images/illustration-couch.svg"
				>
					<LinkBack href="" variant="restart" />
				</Hero>
				<Content>
					<Stack
						spacing={['2rem', '4rem']}
						styles={{
							paddingInlineEnd: [, '10rem'],
						}}
					>
						<section>
							{page.policy && <WarningPanel content={page.policy} />}

							<Styled.h2>{page.quarantinePlanTitle}</Styled.h2>

							{quarantainePlan.map((day) => (
								<SchemeBlock
									key={day.title}
									/**
									 * If no date is provided we show the "laatste contact", "vandaag" values as the main title.
									 */
									title={
										selectedLastEventDate && typeof todayDay !== 'undefined'
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
								>
									{day.bullets &&
										day.bullets.map((content, index) => (
											<SchemeBullet key={index}>
												<ContentBlock content={content} />
											</SchemeBullet>
										))}
								</SchemeBlock>
							))}

							<Box sx={{ marginBlockStart: '1rem' }}>
								<GGDSpecialInstructions />
							</Box>
						</section>

						{page.informContacts.title && (
							<section
								sx={{
									'@media print': { display: 'none' },
								}}
							>
								<InformContacts {...page.informContacts} />
							</section>
						)}

						<section
							sx={{
								'@media print': { display: 'none' },
							}}
						>
							{page.showPrintAndCalendar && selectedLastEventDate && (
								<>
									<Styled.h2>{siteSettings.quarantaineGids.title}</Styled.h2>
									<Link
										styledAs="button"
										href={siteSettings.quarantaineGids.url}
										external
									>
										{siteSettings.quarantaineGids.button}
									</Link>

									<Text variant="small">
										{siteSettings.quarantaineGids.text}
									</Text>
									<Stack spacing={['1rem']}>
										<SaveInCalendar
											locale={locale}
											content={{
												tot_en_met:
													siteSettings.quarantaineCalendar.dateSeperator,
												other_calendar:
													siteSettings.quarantaineCalendar.otherCalendar,
											}}
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
										>
											{siteSettings.quarantaineCalendar.title}
										</SaveInCalendar>
										<StyledLink
											as="button"
											styledAs="button-secondary"
											onClick={() => window.print()}
										>
											<PrinterIcon sx={{ marginInlineEnd: '0.75rem' }} />
											{siteSettings.printCta}
										</StyledLink>
									</Stack>
								</>
							)}
							<Feedback
								name="Quarantaine Check Result"
								feedbackUrl={getFeedbackUrl(siteSettings.feedback.url, {
									situation: situatie,
									day: todayDay?.toString(),
									source: 'result',
								})}
							/>
						</section>
					</Stack>
				</Content>
			</Page>
		</>
	);
}

interface SituatieStaticProps {
	params: { locale: Locales; situatie: Situaties; date: string };
}

export async function getStaticPaths() {
	const situations = await getSituations();

	return {
		paths: cartesianProduct(
			situations.map((situation) => situation.url),
			locales,
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),

		fallback: false,
	};
}

const extractLocaleBullets = ({
	page,
	locale,
}: {
	page: any;
	locale: string;
}) => ({
	...page,
	quarantinePlan: page.quarantinePlan?.map((planItem: any) => ({
		...planItem,
		bullets: planItem.bullets
			? planItem.bullets.map((bullet: any) => bullet[locale])
			: null,
	})),
});

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
		${getLocaleProperty({ name: 'policy', locale })},
		${getLocaleProperty({ name: 'pretitle', locale })},
		"quarantinePlan": quarantinePlan[]{
			day,
			showOn,
			${getLocaleProperty({ name: 'title', locale })},
			${getLocaleProperty({ name: 'bullets', locale, array: true, block: true })}
		},
		"informContacts": {
			${getLocaleProperty({
				name: 'title',
				path: 'informContactsReference->title',
				locale,
			})},
			"steps": informContactsReference->steps[] {
				${getLocaleProperty({ name: 'title', locale })},
				${getLocaleProperty({ name: 'content', locale, block: true })},
				"points": points[] {
					${getLocaleProperty({ name: 'title', locale })},
					${getLocaleProperty({ name: 'content', locale, block: true })},
				}
			},
			${getLocaleProperty({
				name: 'preButtonContent',
				path: 'informContactsReference->preButtonContent',
				locale,
				block: true,
			})},
			"buttons": informContactsReference->buttons {
				"situation": {
					"url": situationReference->url,
					"showDate": situationReference->showDate,
					"showExceptions": situationReference->showExceptions,
				},
				"shareButton": {
					${getLocaleProperty({ name: 'label', path: 'shareButton.label', locale })},
					${getLocaleProperty({
						name: 'message',
						path: 'shareButton.message',
						locale,
					})},
				},
				"copyButton": {
					${getLocaleProperty({ name: 'label', path: 'copyButton.label', locale })},
					${getLocaleProperty({
						name: 'labelCopied',
						path: 'copyButton.labelCopied',
						locale,
					})},
				}
			}
		},
		${getLocaleProperty({ name: 'quarantinePlanTitle', locale })},
		showPrintAndCalendar,
   		quarantaineDuration,
		url,
    	showExceptions,
    	showDate,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getSituationPageQuery({
			type: 'situation-document',
			situationSlug: situatie,
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page: extractLocaleBullets({ page, locale }),
			siteSettings,
			locale,
			situatie,
			date: date || '',
		},
	};
};
