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
	getImage,
} from '@quarantaine/common';

import {
	getSituationQuestionPageQuery,
	getSituationQuestions,
} from 'utilities/situations-flow';
import { locales } from 'content/general-content';
import { Page } from 'components/page';
import {
	FormAnswersDate,
	FormAnswersMultiple,
	FormAnswersMultipleProps,
	FormAnswersSingle,
	FormAnswersSingleProps,
	FormSubmitProps,
	MastheadFlow,
} from 'components/molecules';
import { mastheadFlowImageMargin } from 'components/molecules/masthead/masthead-flow';
import { LinkBack } from 'components/link-back';
import GlobalContext from 'utilities/global-context';
import { markAssetError } from 'next/dist/client/route-loader';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		image: string;
	};
	answersMultiple: FormAnswersMultipleProps['answers'];
	showMore: {
		max: number;
		text: string;
	};
	answersSingle: FormAnswersSingleProps['answers'];
	steps: {
		current: number;
		total: number;
	};
	type: 'multiple' | 'single' | 'datepicker';
	buttons: FormSubmitProps['buttons'];
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

	const url = `/situatie/${page.situation}/${page.slug}`;

	const layerPaddingBlockStart =
		page.type === 'datepicker' ? ['0'] : [mastheadFlowImageMargin, '2.5rem'];

	const asideOffset = page.type === 'datepicker' ? [0, '3.25rem'] : [0];

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
					paddingBlockStart={layerPaddingBlockStart}
				>
					<Container>
						<TheSidebar
							asideChildren={
								<BannerDataProtection content={siteSettings.privacy} />
							}
							asideOffset={asideOffset}
						>
							<Retain>
								{page.type === 'multiple' && page.answersMultiple ? (
									<FormAnswersMultiple
										answers={page.answersMultiple}
										buttons={page.buttons}
										showMoreLabel={page.showMore.text}
										limit={page.showMore.max}
										locale={locale}
									/>
								) : page.type === 'single' && page.answersSingle ? (
									<FormAnswersSingle
										answers={page.answersSingle}
										buttons={page.buttons}
										locale={locale}
									/>
								) : (
									<FormAnswersDate buttons={page.buttons} locale={locale} />
								)}
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
			${getImage({ name: 'image', path: `header.image` })},
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
