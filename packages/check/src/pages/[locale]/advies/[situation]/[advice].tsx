/** @jsx jsx */
import { Image, Styled, Box, jsx, Container } from 'theme-ui';
import React, { useContext } from 'react';
import { DateTime } from 'luxon';

import {
	Locales,
	StyledLinkPropsAsAnchor,
	MetaTags,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	ContentBlock,
	Feedback,
	getFeedbackUrl,
	useSanitySiteSettings,
	Header,
	Layer,
	Retain,
	Stack,
	SchemeBlock,
	formatShortDate,
	TheSidebar,
	BannerDataProtection,
	getImage,
	SanityImageFullProps,
} from '@quarantaine/common';

import { locales } from 'content/general-content';
import { Page } from 'components/page';
import {
	Advice,
	Answer,
	InformContacts,
	InformContactsProps,
	Masthead,
	MastheadFlow,
} from 'components/molecules';
import { LinkBack } from 'components/link-back';
import {
	getSituationAdvicePageQuery,
	getSituationAdvice,
} from 'utilities/situations-flow';
import {
	differenceInDays,
	startOfDay,
	parse,
	subDays,
	addDays,
} from 'date-fns';
import { useRouter } from 'next/router';

interface AnswerProps {
	showOn?: Array<number>;
	title: string;
	content: Object[];
}

interface AdviceProps {
	plan: {
		showOn?: Array<number>;
		day?: number;
		title: string;
		content: Object[];
	}[];
	title: string;
}

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		image: SanityImageFullProps;
		showSeriousSymptoms: boolean;
	};
	answer: AnswerProps[];
	advice: AdviceProps;
	informContacts: InformContactsProps;
	slug: string;
	situation: string;
	updatedAt: string;
}

const getDifferenceInDays = (date: Date) => {
	const difference = differenceInDays(startOfDay(new Date()), startOfDay(date));

	return difference > 0 ? difference : 0;
};

const filterAdvice = ({
	advice,
	todayDay,
	date,
	locale,
}: {
	advice: AdviceProps;
	todayDay: number;
	date: Date;
	locale: Locales;
}) => {
	return {
		...advice,
		plan: advice.plan
			.filter(({ showOn }) => !showOn || showOn.includes(todayDay))
			.map(({ content, day, title }) => ({
				content,
				day,
				title,
				date:
					day === null || day === undefined
						? formatShortDate(new Date(), locale, true)
						: formatShortDate(addDays(date, day), locale, true),
			})),
	};
};

const getMostRelevantAnswer = ({
	answers,
	todayDay,
}: {
	answers: AnswerProps[];
	todayDay: number;
}) => {
	const answer = answers.filter(
		({ showOn }) => !showOn || showOn.includes(todayDay),
	)[0];

	return answer || answers[answers.length - 1];
};

export const Advies = ({ locale }: { locale: Locales }) => {
	const router = useRouter();
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();
	const date = router.query.datum
		? parse(`${router.query.datum}`, 'dd-MM-yyyy', new Date())
		: new Date();
	const todayDay = getDifferenceInDays(date);
	const answer = getMostRelevantAnswer({ answers: page.answer, todayDay });
	const advice =
		page.advice.plan &&
		filterAdvice({
			advice: page.advice,
			todayDay,
			date,
			locale,
		});

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={`/resultaat/${page.situation}/${page.slug}`}
			/>

			<Page noHeader>
				<Masthead
					title={page.header.title}
					illustration={page.header.image}
					variant="default"
					prefixSlot={
						<Styled.p
							sx={{
								fontSize: ['1rem', '1rem'],
								lineHeight: ['smallTextMobile', 'smallText'],
								color: 'detailText',
							}}
						>
							{siteSettings.updatedAt}
							<time dateTime={page.updatedAt}>
								{DateTime.fromISO(page.updatedAt).toLocaleString()}
							</time>
						</Styled.p>
					}
					headerSlot={
						<Header
							noPadding
							linkBackSlot={<LinkBack href="#situaties" variant="restart" />}
						/>
					}
				>
					{page.header.showSeriousSymptoms ? (
						<Advice
							title={siteSettings.severeSymptomsAdvice.title}
							subtitle={siteSettings.severeSymptomsAdvice.subtitle}
							icon={siteSettings.severeSymptomsAdvice.icon.src}
						/>
					) : null}
				</Masthead>

				<Layer backgroundColor="transparant">
					<Container>
						<TheSidebar
							asideChildren={
								<BannerDataProtection content={siteSettings.privacy} />
							}
							asideOffset={[0]}
						>
							<Retain>
								<Stack spacing={['2.5rem', '5rem']}>
									{answer && (
										<Answer title={answer.title} content={answer.content} />
									)}

									{!!advice?.plan.length && (
										<Box>
											<Styled.h2>{advice.title}</Styled.h2>
											{advice.plan.map(({ day, title, content, date }) => (
												<SchemeBlock key={title} day={date} title={title}>
													{content && <ContentBlock content={content} />}
												</SchemeBlock>
											))}
										</Box>
									)}

									{!!advice?.plan.length && page.informContacts.title && (
										<section
											sx={{
												'@media print': { display: 'none' },
											}}
										>
											<InformContacts {...page.informContacts} />
										</section>
									)}
									<Feedback
										name="Situatie Advies"
										feedbackUrl={getFeedbackUrl(siteSettings.feedback.url, {
											source: 'situation-advice',
											situation: page.situation,
											advice: page.slug,
										})}
									/>
								</Stack>
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>
			</Page>
		</>
	);
};

type Advice = { advice: string; situation: string };

export const getStaticPaths = async () => {
	const adviceList: Advice[] = await getSituationAdvice();

	return {
		paths: adviceList.reduce(
			(
				paths: AdviesResultaatProps[],
				advice: Advice,
			): AdviesResultaatProps[] => [
				...paths,
				...locales.map((locale) => ({ params: { ...advice, locale } })),
			],
			[],
		),

		fallback: false,
	};
};

interface AdviesResultaatProps {
	params: { advice: string; situation: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { advice, situation, locale },
}: AdviesResultaatProps) => {
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
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
			${getImage({ name: 'image', path: `header.image`, full: true })},
			"showSeriousSymptoms": header.showSeriousSymptoms,
		},
		"answer": answer[]{
			showOn,
			${getLocaleProperty({ name: 'title', locale })},
			${getLocaleProperty({ name: 'content', locale, block: true })},
		},
		"advice": {
			${getLocaleProperty({
				name: 'title',
				path: 'advice.title',
				locale,
			})},
			"plan": advice.plan[]{
				showOn,
				day,
				${getLocaleProperty({ name: 'title', locale })},
				${getLocaleProperty({ name: 'content', locale, block: true })},
			},
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
		"updatedAt": _updatedAt,
		"slug": slug.current,
		"situation": situation->slug.current,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getSituationAdvicePageQuery({
			pageProjection,
			locale,
			advice,
			situation,
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

export default Advies;
