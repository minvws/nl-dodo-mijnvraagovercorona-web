/** @jsx jsx */
import { Box, Checkbox, Container, jsx, Label } from 'theme-ui';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import {
	Locales,
	Link,
	StyledLink,
	MetaTags,
	Fieldset,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	ContentBlock,
	Control,
	getHrefWithlocale,
	Header,
	Layer,
	TheSidebar,
	BannerDataProtection,
	useSanitySiteSettings,
	Retain,
	ProgressMarker,
} from '@quarantaine/common';

import {
	getSituationQuestionPageQuery,
	getSituationQuestions,
} from 'utilities/situations-flow';
import { locales } from 'content/general-content';
import { Page } from 'components/page';
import { MastheadFlow } from 'components/molecules';
import { mastheadFlowImageMargin } from 'components/molecules/masthead/masthead-flow';
import { LinkBack } from 'components/link-back';
import GlobalContext from 'utilities/global-context';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		image: string;
	};
	answersMultiple: {
		content: string;
		_key: string;
	}[];
	showMore: {
		max: number;
		text: string;
	};
	answersSingle: {
		content: Object[];
		next: string;
		_key: string;
	}[];
	steps: {
		current: number;
		total: number;
	};
	type: 'multiple' | 'single' | 'datepicker';
	buttons: {
		_key: string;
		standard: boolean;
		text: string;
		next: string;
	}[];
	situation: string;
	slug: string;
}

const createHistory = ({
	history,
	total,
	current,
	url,
}: {
	history: string[];
	total: number;
	current: number;
	url: string;
}): string[] => {
	const nextHistory = Array(total).fill('#situaties');

	nextHistory[current - 1] = url;

	return nextHistory;
};

export const Vraag = ({ locale }: { locale: Locales }) => {
	const router = useRouter();
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();

	const [selectedOption, setSelectedOption] = useState<string>();
	const [answersMultiple, setAnswersMultiple] = useState<
		{
			content: string;
			_key: string;
		}[]
	>();
	const [showShowMore, setShowShowMore] = useState<boolean>(true);

	const url = `/situatie/${page.situation}/${page.slug}`;

	const onRadioChange = (value: string) => {
		setSelectedOption(value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (selectedOption)
			router.push(`/${getHrefWithlocale(`/${selectedOption}`, locale)}`);
	};

	useEffect(() => {
		if (page.answersMultiple)
			setAnswersMultiple(page.answersMultiple.slice(0, page.showMore.max));
	}, [page.answersMultiple]);

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={url}
			/>

			<Page noHeader>
				<MastheadFlow
					title={page.header.title}
					illustration={page.header.image}
					headerSlot={<Header noPadding />}
				/>
				<Layer
					backgroundColor="white"
					paddingBlockStart={[mastheadFlowImageMargin, '2.5rem']}
				>
					<Container>
						<TheSidebar
							asideChildren={
								<BannerDataProtection content={siteSettings.privacy} />
							}
							asideOffset={['0']}
						>
							<Retain>
								<form action="" onSubmit={onSubmit}>
									{page.type === 'multiple' && answersMultiple && (
										<>
											<Fieldset>
												{answersMultiple?.map((answer) => (
													<Control
														type="checkbox"
														name={page.slug}
														key={answer._key}
														id={answer._key}
														label={answer.content}
														value={answer.content}
													/>
												))}
											</Fieldset>
											{showShowMore && (
												<StyledLink
													as="button"
													styledAs="show-more"
													type="button"
													withChevron={false}
													icon="/icons/plus.svg"
													onClick={() => {
														setAnswersMultiple(page.answersMultiple);
														setShowShowMore(false);
													}}
												>
													{page.showMore.text}
												</StyledLink>
											)}
										</>
									)}
									{page.type === 'single' && (
										<Fieldset>
											{page.answersSingle.map((answer) => (
												<Control
													type="radio"
													name={page.slug}
													key={answer._key}
													id={answer._key}
													label={<ContentBlock content={answer.content} />}
													value={answer.next}
													onChange={onRadioChange}
												/>
											))}
										</Fieldset>
									)}
									{page.type === 'datepicker'}
									<Box
										as="ul"
										sx={{ marginTop: '16px', marginLeft: 0, padding: 0 }}
									>
										{page.buttons.map((button, index) => (
											<li
												key={button._key}
												sx={{
													listStyle: 'none',
													margin: 0,
													paddingTop: '16px',
												}}
											>
												{button.standard ? (
													<Link
														key={button._key}
														as="button"
														type="submit"
														styledAs={
															index === 0 ? 'button' : 'button-tertiary'
														}
													>
														{button.text}
													</Link>
												) : (
													<Link
														key={button._key}
														as="a"
														href={`/${getHrefWithlocale(
															`/${button.next}`,
															locale,
														)}`}
														styledAs={
															index === 0 ? 'button' : 'button-tertiary'
														}
													>
														{button.text}
													</Link>
												)}
											</li>
										))}
									</Box>
								</form>
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>
			</Page>
		</>
	);
};

type Question = { question: string; situation: string };

export const getStaticPaths = async () => {
	const questions: Question[] = await getSituationQuestions();

	return {
		paths: questions.reduce(
			(paths: VraagStaticProps[], question: Question): VraagStaticProps[] => [
				...paths,
				...locales.map((locale) => ({ params: { ...question, locale } })),
			],
			[],
		),

		fallback: false,
	};
};

interface VraagStaticProps {
	params: { question: string; situation: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { question, situation, locale },
}: VraagStaticProps) => {
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
			${getLocaleProperty({ name: 'title', path: `header.title`, locale })},
			"image": "/images/sanity/" + header.image.asset->originalFilename,
		},
        type,
		"answersSingle": answersSingle[]{
			_key,
			${getLocaleProperty({ name: 'content', locale })},
			"next": select(
                next->_type == "situation-question-document" => 'situatie/' + next->situation->slug.current + '/' + next->slug.current,
                next->_type == "situation-result-document" => 'advies/' + next->situation->slug.current + '/' + next->slug.current,
			),
		},
        "answersMultiple": answersMultiple[]{
            _key,
            ${getLocaleProperty({ name: 'content', locale })},
        },
		"showMore": {
			"max": showMore.max,
            ${getLocaleProperty({
							name: 'text',
							path: 'showMore.text',
							locale,
						})},
		},
		"buttons": buttons[]{
			_key,
            ${getLocaleProperty({ name: 'text', locale })},
            standard,
			"next": select(
                next->_type == "situation-question-document" => 'situatie/' + next->situation->slug.current + '/' + next->slug.current,
                next->_type == "situation-result-document" => 'advies/' + next->situation->slug.current + '/' + next->slug.current,
			),
        },
		"slug": slug.current,
		"situation": situation->slug.current,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getSituationQuestionPageQuery({
			pageProjection,
			locale,
			question,
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

export default Vraag;
