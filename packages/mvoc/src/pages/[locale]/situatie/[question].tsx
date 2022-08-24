/** @jsx jsx */
import { jsx } from 'theme-ui';
import React from 'react';

import {
	Locales,
	MetaTags,
	getLocaleProperty,
	useSanityPageContent,
	getImage,
	SanityImageFullProps,
	ContentBlock,
	getClient,
} from '@quarantaine/common';

import {
	getSituationQuestionPageQuery,
	getSituationQuestions,
} from 'utilities/situations-flow';
import { locales } from 'content/general-content';
import { Page } from 'components/page';
import {
	MastheadFlow,
	AnswerSwitchProps,
	AnswerSwitch,
} from 'components/molecules';

export interface QuestionPageContent extends AnswerSwitchProps {
	header: {
		title: string;
		content: Object[];
		image: SanityImageFullProps;
	};
}

interface PageContent extends QuestionPageContent {
	metaData: {
		title: string;
		description: string;
		socialShareImage: SanityImageFullProps;
	};
	slug: string;
}

export const Vraag = ({ locale }: { locale: Locales }) => {
	const page = useSanityPageContent<PageContent>();
	const url = `/situatie/${page.slug}`;

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				shareImage={page.metaData.socialShareImage}
				url={url}
			/>

			<Page
				headerProps={{
					noPadding: true,
				}}
			>
				<MastheadFlow title={page.header.title}>
					{page.header.content ? (
						<ContentBlock content={page.header.content} />
					) : null}
				</MastheadFlow>

				<AnswerSwitch locale={locale} {...page} />
			</Page>
		</>
	);
};

type Question = { question: string };

export const getStaticPaths = async () => {
	const questions: Question[] = await getSituationQuestions();

	return {
		paths: questions.reduce(
			(paths: VraagStaticParams[], question: Question): VraagStaticParams[] => [
				...paths,
				...locales.map((locale) => ({ params: { ...question, locale } })),
			],
			[],
		),

		fallback: false,
	};
};

type VraagStaticParams = {
	params: { question: string; locale: Locales };
};

interface VraagStaticProps {
	params: { question: string; locale: Locales };
	preview: boolean;
}

export const essentialQuestionPageProjection = ({
	locale,
}: {
	locale: string;
}) => {
	return `
		"header": {
			${getLocaleProperty({ name: 'title', path: `header.title`, locale })},
			${getLocaleProperty({
				name: 'content',
				path: `header.content`,
				locale,
				block: true,
			})},
		},
		type,
		"content": {
			${getLocaleProperty({
				name: 'contentPrimary',
				path: `contentReference->content.contentPrimary`,
				locale,
				block: true,
			})},
			${getImage({
				name: 'imagePrimary',
				path: `contentReference->content.imagePrimary`,
			})},
			${getLocaleProperty({
				name: 'contentSecondary',
				path: `contentReference->content.contentSecondary`,
				locale,
				block: true,
			})},
			${getImage({
				name: 'imageSecondary',
				path: `contentReference->content.imageSecondary`,
			})},
		},
		"answersSingle": answersSingle[]{
			_key,
			${getLocaleProperty({ name: 'content', locale })},
			"next": select(
				next->_type == "situation-question-document" => 'situatie/' + next->slug.current,
				next->_type == "situation-result-document" => 'advies/' + next->slug.current,
			),
		},
		"answersMultiple": answersMultiple[]{
			_key,
			${getLocaleProperty({ name: 'content', locale })},
		},
		"ageInput": {
			${getLocaleProperty({ name: 'label', path: 'ageInput.label', locale })},
			${getLocaleProperty({
				name: 'placeholder',
				path: 'ageInput.placeholder',
				locale,
			})},
		},
		"showMore": {
			"max": showMore.max,
			"label": {
				${getLocaleProperty({
					name: 'this',
					path: 'showMore.label.this',
					locale,
				})},
				${getLocaleProperty({
					name: 'that',
					path: 'showMore.label.that',
					locale,
				})},
			}
		},
		"buttons": buttons[]{
			_key,
			${getLocaleProperty({ name: 'text', locale })},
			standard,
			"next": select(
				next->_type == "situation-question-document" => 'situatie/' + next->slug.current,
				next->_type == "situation-result-document" => 'advies/' + next->slug.current,
			),
		}
	`;
};

export const getStaticProps = async ({
	params: { question, locale },
	preview = false,
}: VraagStaticProps) => {
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
		${essentialQuestionPageProjection({ locale: locale })},
		"slug": slug.current,
	}`;
	const { page, siteSettings } = await getClient(preview).fetch(
		getSituationQuestionPageQuery({
			pageProjection,
			locale,
			question,
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
