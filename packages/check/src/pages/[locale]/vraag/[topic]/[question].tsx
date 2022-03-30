/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';
import { useRouter } from 'next/router';

import {
	Locales,
	Link,
	MetaTags,
	Hero,
	Fieldset,
	sanityClient,
	getLocaleProperty,
	useSanityPageContent,
	cartesianProduct,
	ContentBlock,
	Content,
	RadioButton,
	getHrefWithlocale,
} from '@quarantaine/common';

import {
	getQuestionPageQuery,
	getQuestions,
	getTopics,
} from 'utilities/topics';
import { locales } from 'content/general-content';
import { Page } from 'components/page';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
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
	const [selectedOption, setSelectedOption] = useState<string>();

	const onRadioChange = (value: string) => {
		setSelectedOption(value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push(`/${getHrefWithlocale(`/${selectedOption}`, locale)}`);
	};

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={`/vraag/${page.topic}/${page.slug}`}
			/>

			<Page>
				<Hero title={page.header.title} />
				<Content>
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

						{selectedOption && (
							<Link as="button" styledAs="button" type="submit">
								{page.button}
							</Link>
						)}
					</form>
				</Content>
			</Page>
		</>
	);
};

export const getStaticPaths = async () => {
	const topics = await getTopics();
	const questions = await getQuestions();

	return {
		paths: cartesianProduct(topics, questions, locales).map(
			([topic, question, locale]: string[]) => ({
				params: { topic, question, locale },
			}),
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
