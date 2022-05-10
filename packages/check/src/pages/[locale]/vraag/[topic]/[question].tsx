/** @jsx jsx */
import { Box, Container, jsx } from 'theme-ui';
import React, { useEffect, useState, useContext } from 'react';
import { useRouter } from 'next/router';

import {
	Locales,
	Link,
	MetaTags,
	Fieldset,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	ContentBlock,
	RadioButton,
	getHrefWithlocale,
	Header,
	Layer,
	TheSidebar,
	BannerDataProtection,
	useSanitySiteSettings,
	Retain,
	ProgressMarker,
} from '@quarantaine/common';

import { getTopicQuestionPageQuery, getTopicQuestions } from 'utilities/topics';
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
	answers: {
		content: Object[];
		next: string;
		_key: string;
	}[];
	steps: {
		current: number;
		total: number;
	};
	button: string;
	topic: string;
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
	const nextHistory = Array(total).fill('#onderwerpen');

	nextHistory[current - 1] = url;

	return nextHistory;
};

export const Vraag = ({ locale }: { locale: Locales }) => {
	const router = useRouter();
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();

	const { history, setHistory } = useContext(GlobalContext);
	const [selectedOption, setSelectedOption] = useState<string>();

	const url = `/vraag/${page.topic}/${page.slug}`;

	const onRadioChange = (value: string) => {
		setSelectedOption(value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (selectedOption)
			router.push(`/${getHrefWithlocale(`/${selectedOption}`, locale)}`);
	};

	const updateHistory = () => {
		setHistory && setHistory(createHistory({ ...page.steps, history, url }));
	};

	useEffect(() => {
		const handleRouteChange = () => {
			updateHistory();
			setSelectedOption(undefined);
		};

		if (!history[0]) updateHistory();

		router.events.on('routeChangeStart', handleRouteChange);

		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, []);

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
					headerSlot={
						<Header
							noPadding
							linkBackSlot={
								<LinkBack
									href={history[page.steps.current - 2] || '#onderwerpen'}
									variant="back"
								/>
							}
						/>
					}
					prefixSlot={
						history.length > 1 && (
							<ProgressMarker
								currentStage={page.steps.current}
								stageLinks={history}
								currentStageLabel={page.header.title}
							/>
						)
					}
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
									<Fieldset>
										{page.answers.map((answer) => (
											<RadioButton
												name={page.slug}
												key={answer._key}
												id={answer._key}
												label={<ContentBlock content={answer.content} />}
												value={answer.next}
												onChange={onRadioChange}
											/>
										))}
									</Fieldset>

									<Link
										as="button"
										type="submit"
										disabled={selectedOption ? false : true}
										styledAs={selectedOption ? 'button' : 'button-disabled'}
									>
										{page.button}
									</Link>
								</form>
							</Retain>
						</TheSidebar>
					</Container>
				</Layer>
			</Page>
		</>
	);
};

type Question = { question: string; topic: string };

export const getStaticPaths = async () => {
	const questions: Question[] = await getTopicQuestions();

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
	params: { question: string; topic: string; locale: Locales };
}

export const getStaticProps = async ({
	params: { question, topic, locale },
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
			"image": "/images/sanity/" + topic->icon.asset->originalFilename,
		},
		"answers": answers[]{
			_key,
			${getLocaleProperty({ name: 'content', locale })},
			"next": select(
					next->_type == "topic-result-document" => 'resultaat/' + next->topic->slug.current + '/' + next->slug.current,
					next->_type == "topic-question-document" => 'vraag/' + next->topic->slug.current + '/' + next->slug.current,
					next->_type == "situation-document" && next->showDate == true => next->url + '/wanneer',
					next->_type == "situation-document" => next->url,
					),
		},
		${getLocaleProperty({ name: 'button', locale })},
		"slug": slug.current,
		"topic": topic->slug.current,
		steps,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getTopicQuestionPageQuery({
			pageProjection,
			locale,
			question,
			topic,
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
