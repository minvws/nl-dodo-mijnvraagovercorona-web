/** @jsx jsx */
import React from 'react';
import slugify from 'slugify';
import { Styled, Box, jsx, Container } from 'theme-ui';

import {
	Locales,
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
	formatDate,
	TheSidebar,
	BannerDataProtection,
	getImage,
	SanityImageFullProps,
	Card,
	formatLongDate,
	useCurrentLocale,
	CardProps,
	StyledLink,
	getHrefWithlocale,
	getPageQuery,
} from '@quarantaine/common';

import { locales } from 'content/general-content';
import { Page } from 'components/page';
import {
	Advice,
	Answer,
	AssistanceRow,
	InformContacts,
	InformContactsProps,
	Masthead,
	MoreTips,
} from 'components/molecules';
import { LinkBack } from 'components/link-back';
import {
	getSituationAdvicePageQuery,
	getSituationAdvice,
} from 'utilities/situations-flow';
import { differenceInDays, startOfDay, parse, addDays } from 'date-fns';
import { useRouter } from 'next/router';
import { getTipsCollection, TipCollectionProps } from 'utilities/tips';

interface AnswerProps {
	showOn?: Array<number>;
	title: string;
	content: Object[];
}

interface ExtendedCardProps extends CardProps, TipCollectionProps {}

interface AdviceProps {
	plan: {
		showOn?: Array<number>;
		day?: number;
		title: string;
		content: Object[];
	}[];
	cards: ExtendedCardProps[];
	title: string;
	secondaryTitle: string;
}

interface MoreTipsProps extends TipCollectionProps {
	title: string;
}

interface PageContent {
	metaData: {
		title: string;
		description: string;
		socialShareImage: SanityImageFullProps;
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
	moreTips: MoreTipsProps;
	assistance: {
		chat: string;
		image: SanityImageFullProps;
		open: string;
		openingHours: string;
		phonenumber: string;
		situationButton: string;
		situationQuestion: string;
		tekstWithChat: string;
		tekstWithoutChat: string;
		title: string;
	};
	themes: {
		title: 'string';
	};
	updatedAt: string;
}

const getDifferenceInDays = (date: Date) => {
	const difference = differenceInDays(startOfDay(new Date()), startOfDay(date));

	return difference > 0 ? difference : 0;
};

const filterPlan = ({
	plan,
	todayDay,
	date,
	locale,
}: {
	plan: AdviceProps['plan'];
	todayDay: number;
	date: Date;
	locale: Locales;
}) =>
	plan
		.filter(({ showOn }) => !showOn || showOn.includes(todayDay))
		.map(({ content, day, title }) => ({
			content,
			day,
			title,
			date:
				day === null || day === undefined
					? formatDate(new Date(), locale)
					: formatDate(addDays(date, day), locale),
		}));

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
	const currentLocale = useCurrentLocale();
	const date = router.query.datum
		? parse(`${router.query.datum}`, 'dd-MM-yyyy', new Date())
		: new Date();
	const todayDay = getDifferenceInDays(date);
	const answer =
		page?.answer &&
		getMostRelevantAnswer({
			answers: page.answer,
			todayDay,
		});
	const plan =
		page?.advice.plan &&
		filterPlan({
			plan: page.advice.plan,
			todayDay,
			date,
			locale,
		});

	const translatedTips = page.moreTips.tipCollection
		? page.moreTips.tipCollection.filter((tip) => tip.title)
		: [];

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				shareImage={page.metaData.socialShareImage}
				url={`/advies/${page.slug}`}
			/>

			<Page
				headerProps={{
					noPadding: true,
					linkBackSlot: (
						<LinkBack
							href={`#${slugify(page.themes.title, {
								strict: true,
								lower: true,
							})}`}
							variant="restart"
						/>
					),
				}}
			>
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
							{siteSettings.updatedAt}{' '}
							<time dateTime={page.updatedAt}>
								{formatLongDate(new Date(page.updatedAt), locale)}
							</time>
						</Styled.p>
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
									<Stack spacing={['2rem']}>
										{answer && (
											<Answer title={answer.title} content={answer.content} />
										)}

										<Stack spacing={['2.5rem', '5rem']}>
											{!!plan?.length && (
												<Box as="section">
													<Styled.h2>{page.advice.title}</Styled.h2>
													{plan.map(({ day, title, content, date }) => (
														<SchemeBlock key={title} day={date} title={title}>
															{content && <ContentBlock content={content} />}
														</SchemeBlock>
													))}
												</Box>
											)}
											{!!page.advice?.cards?.length && (
												<Box as="section">
													{page.advice.secondaryTitle ? (
														<Styled.h2>{page.advice.secondaryTitle}</Styled.h2>
													) : null}
													<Stack spacing={['2rem']}>
														{page.advice.cards.map((card) => (
															<Card key={card.title} {...card}>
																{card.tipCollection
																	? card.tipCollection
																			.filter((tip) => tip.title)
																			.map((tip, index) => (
																				<StyledLink
																					styledAs="button-large"
																					href={getHrefWithlocale(
																						`/tip/${tip.slug}`,
																						currentLocale.urlPrefix,
																					)}
																					icon={tip.icon.src}
																					key={index}
																				>
																					{tip.title}
																				</StyledLink>
																			))
																	: null}
															</Card>
														))}
													</Stack>
												</Box>
											)}
										</Stack>
									</Stack>

									{!!plan?.length && page.informContacts.title && (
										<section
											sx={{
												'@media print': { display: 'none' },
											}}
										>
											<InformContacts {...page.informContacts} />
										</section>
									)}
									{translatedTips.length ? (
										<MoreTips
											tipCollection={translatedTips}
											title={page.moreTips.title}
										/>
									) : null}
									<Feedback
										name="Situatie Advies"
										feedbackUrl={getFeedbackUrl(siteSettings.feedback.url, {
											source: 'situation-advice',
											advice: page.slug,
											day: `${todayDay}`,
										})}
									/>
								</Stack>
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>
				{page.assistance && (
					<Layer backgroundColor="headerBackground">
						<Container>
							{/* @TODO: This box is needed to create padding around the content, which was previously done by TheSidebar, needs to be fixed */}
							<Box sx={{ paddingX: ['mobilePadding', 'tabletPadding', 0] }}>
								<AssistanceRow feedback={false} />
							</Box>
						</Container>
					</Layer>
				)}
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
	params: { advice: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { advice, locale },
}: AdviesResultaatProps) => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
			${getImage({
				name: 'socialShareImage',
				path: 'metaData.socialShareImage',
				full: true,
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
			${getLocaleProperty({
				name: 'secondaryTitle',
				path: 'advice.secondaryTitle',
				locale,
			})},
			"cards": advice.cards[]->{
				${getLocaleProperty({ name: 'title', locale })},
				${getLocaleProperty({ name: 'chapeau', locale })},
				${getLocaleProperty({ name: 'content', locale, block: true })},
				"disclosure": {
					"label": {
						${getLocaleProperty({ name: 'this', path: 'disclosure.label.this', locale })},
						${getLocaleProperty({ name: 'that', path: 'disclosure.label.that', locale })},
					},
					${getLocaleProperty({
						name: 'content',
						path: 'disclosure.content',
						locale,
						block: true,
					})},
				},
				${getTipsCollection({ locale })},
				"buttons": buttons[]{
					${getLocaleProperty({ name: 'text', locale })},
					${getLocaleProperty({ name: 'link', locale })},
					"situation": select(
						situation->_type == "situation-question-document" => 'situatie/' + situation->slug.current,
						situation->_type == "situation-result-document" => 'advies/' + situation->slug.current,
					),
				}
			}
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
				"situation": select(
					situationReference->_type == "situation-question-document" => 'situatie/' + situationReference->slug.current,
					situationReference->_type == "situation-result-document" => 'advies/' + situationReference->slug.current,
				),
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
		"moreTips": {
			${getLocaleProperty({ name: 'title', path: 'moreTips.title', locale })},
			${getTipsCollection({ path: 'moreTips', locale })},
		},
		"assistance": assistanceReference->{
			${getLocaleProperty({ name: 'chat', locale })},
			${getImage({ name: 'image', full: true })},
			${getLocaleProperty({ name: 'open', locale })},
			${getLocaleProperty({ name: 'openingHours', locale })},
			${getLocaleProperty({ name: 'openingHoursPhonenumber', locale })},
			phonenumber,
			${getLocaleProperty({ name: 'tekstWithChat', locale })},
			${getLocaleProperty({ name: 'tekstWithoutChat', locale })},
			${getLocaleProperty({ name: 'title', locale })},
		},
		"updatedAt": _updatedAt,
		"slug": slug.current,
	}`;
	const { page: advicePage, siteSettings } = await sanityClient.fetch(
		getSituationAdvicePageQuery({
			pageProjection,
			locale,
			advice,
		}),
	);

	const landingPageProjection = `{
		"themes": {
			${getLocaleProperty({ name: 'title', path: 'themes.title', locale })},
		},
	}`;

	const { page: landingPage } = await sanityClient.fetch(
		getPageQuery({
			site: 'mijn-vraag-over-corona',
			type: 'check-landing-page',
			pageProjection: landingPageProjection,
			locale,
		}),
	);

	const page = { ...advicePage, ...landingPage };

	return {
		props: {
			page,
			siteSettings,
			locale,
		},
	};
};

export default Advies;
