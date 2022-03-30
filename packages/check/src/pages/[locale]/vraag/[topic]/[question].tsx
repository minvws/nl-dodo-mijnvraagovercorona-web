/** @jsx jsx */
import { Box, Container, jsx } from 'theme-ui';
import React, { useState } from 'react';
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
} from '@quarantaine/common';

import { getQuestionPageQuery, getQuestions } from 'utilities/topics';
import { locales } from 'content/general-content';
import { Page } from 'components/page';
import { MastheadFlow } from 'components/molecules';
import { mastheadFlowImageMargin } from 'components/molecules/masthead/masthead-flow';
import { LinkBack } from 'components/link-back';

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
	button: string;
	topic: string;
	slug: string;
}

export const Vraag = ({ locale }: { locale: Locales }) => {
	const router = useRouter();
	const page = useSanityPageContent<PageContent>();
	const siteSettings = useSanitySiteSettings();
	const [selectedOption, setSelectedOption] = useState<string>();

	const onRadioChange = (value: string) => {
		setSelectedOption(value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		if (selectedOption)
			router.push(`/${getHrefWithlocale(`/${selectedOption}`, locale)}`);
	};

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={`/vraag/${page.topic}/${page.slug}`}
			/>

			<Page noHeader>
				<MastheadFlow
					title={page.header.title}
					illustration={page.header.image}
					headerSlot={
						<Header
							noPadding
							linkBackSlot={<LinkBack href="/" variant="back" />}
						/>
					}
					prefixSlot={
						<p>
							<mark>Vraag 1/2</mark>
						</p>
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
	const questions: Question[] = await getQuestions();

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
					next->_type == "topic-result-document" => "resultaat",
					next->_type == "topic-question-document" => "vraag",
				) + '/' + next->topic->slug.current + '/' + next->slug.current,
		},
		${getLocaleProperty({ name: 'button', locale })},
		"slug": slug.current,
		"topic": topic->slug.current,
		steps,
	}`;
	const { page, siteSettings } = await sanityClient.fetch(
		getQuestionPageQuery({
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
