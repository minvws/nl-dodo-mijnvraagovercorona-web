/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useState } from 'react';

import { Page } from 'components/page';

import {
	Link,
	MetaTags,
	Hero,
	Fieldset,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	cartesianProduct,
	ContentBlock,
	Content,
	RadioButton,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';

import 'react-day-picker/lib/style.css';
import { useRouter } from 'next/router';
import { ProgressMarker } from 'components/progress-marker';
import { Situation } from 'config/situaties';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	beschermdLabel: string;
	beschermdHelpText: Object[];
	beschermdYesLabel: Object[];
	beschermdNoLabel: Object[];
	beschermdButtonText: string;
	url: string;
	currentStepLabel: string;
}

interface BeschermdProps {
	currentSituation: Situation;
	locale: 'nl';
}

export default function Beschermd({
	currentSituation,
	locale,
}: BeschermdProps) {
	const router = useRouter();
	const page = useSanityPageContent<PageContent>();
	const baseUrl = `/${locale}/${currentSituation.url}`;
	const [selectedOption, setSelectedOption] = useState<string>();

	/**
	 * Navigate to next step.
	 */
	const getNextStepUrl = () => {
		if (selectedOption === 'yes') {
			// ja ik ben beschermd -> beschermd pagina // situatie/ik-ben-beschermd
			return `${baseUrl}/ik-ben-beschermd`;
		} else if (
			selectedOption === 'no' &&
			typeof currentSituation.showDate !== 'undefined' &&
			currentSituation.showDate
		) {
			// nee & currentSituation.showDate -> date pagina // situatie/wanneer
			return `${baseUrl}/wanneer`;
		}

		// nee & !currentSituation.showDate -> onbeschermd pagina // situatie
		return `${baseUrl}`;
	};

	const onRadioChange = (value: string) => {
		setSelectedOption(value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		router.push(getNextStepUrl());
	};

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.title}
				url={page.url.replace('$$situatie', currentSituation.url)}
			/>

			<Page>
				<Hero title={page.header.title}>
					<ProgressMarker
						currentStageLabel={page.currentStepLabel}
						currentStage={2}
					/>
				</Hero>
				<Content>
					<form action="" onSubmit={onSubmit}>
						<Fieldset legend={page.beschermdLabel}>
							<ContentBlock content={page.beschermdHelpText} />
							<RadioButton
								name="protected"
								id="beschermdYesLabel"
								label={<ContentBlock content={page.beschermdYesLabel} />}
								value="yes"
								onChange={onRadioChange}
							/>
							<RadioButton
								name="protected"
								id="beschermdNoLabel"
								label={<ContentBlock content={page.beschermdNoLabel} />}
								value="no"
								onChange={onRadioChange}
							/>
						</Fieldset>

						{selectedOption && (
							<Link as="button" styledAs="button" type="submit">
								{page.beschermdButtonText}
							</Link>
						)}
					</form>
				</Content>
			</Page>
		</>
	);
}

interface BeschermdStaticProps {
	params: { locale: 'nl' | 'en'; situatie: string };
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: BeschermdStaticProps) => {
	const situations = await getSituations();
	const currentSituation = situations.find(
		(situation) => situation.url === situatie,
	);

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
		${getLocaleProperty({ name: 'beschermdLabel', locale })},
		${getLocaleProperty({ name: 'beschermdHelpText', locale })},
		${getLocaleProperty({ name: 'beschermdYesLabel', locale })},
		${getLocaleProperty({ name: 'beschermdNoLabel', locale })},
		${getLocaleProperty({ name: 'beschermdButtonText', locale })},
		url,
		${getLocaleProperty({ name: 'currentStepLabel', locale })},
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'check-ben-ik-beschermd-page',
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			currentSituation,
			siteSettings,
			locale,
		},
	};
};

export const getStaticPaths = async () => {
	const situations = await getSituations();

	return {
		paths: cartesianProduct(
			situations
				.filter((situation) => situation.showProtected)
				.map((situation) => situation.url),
			['nl', 'en'].map((locale) => `${locale}`),
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),
		fallback: false,
	};
};
