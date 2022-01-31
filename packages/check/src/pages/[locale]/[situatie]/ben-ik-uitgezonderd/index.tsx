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
	Locales,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';

import 'react-day-picker/lib/style.css';
import { useRouter } from 'next/router';
import { Situation } from 'config/situaties';
import { LinkBack } from 'components/link-back';
import { locales } from 'content/general-content';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
	};
	uitgezonderdLabel: string;
	uitgezonderdHelpText: Object[];
	uitgezonderdYesLabel: Object[];
	uitgezonderdNoLabel: Object[];
	uitgezonderdButtonText: string;
	url: string;
	currentStepLabel: string;
}

interface UitgezonderdProps {
	currentSituation: Situation;
	locale: Locales;
}

export default function Uitgezonderd({
	currentSituation,
	locale,
}: UitgezonderdProps) {
	const router = useRouter();
	const page = useSanityPageContent<PageContent>();
	const baseUrl = `/${locale}/${currentSituation.url}`;
	const [selectedOption, setSelectedOption] = useState<string>();

	/**
	 * Navigate to next step.
	 */
	const getNextStepUrl = () => {
		if (selectedOption === 'yes') {
			// ja ik ben uitgezonderd -> uitgezonderd pagina // situatie/ik-ben-uitgezonderd
			return `${baseUrl}/ik-ben-uitgezonderd`;
		} else if (
			selectedOption === 'no' &&
			typeof currentSituation.showDate !== 'undefined' &&
			currentSituation.showDate
		) {
			// nee & currentSituation.showDate -> date pagina // situatie/wanneer
			return `${baseUrl}/wanneer`;
		}

		// nee & !currentSituation.showDate -> onuitgezonderd pagina // situatie
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
					<LinkBack href={`/${locale}/jouw-situatie`} />
				</Hero>
				<Content>
					<form action="" onSubmit={onSubmit}>
						<Fieldset legend={page.uitgezonderdLabel}>
							<ContentBlock content={page.uitgezonderdHelpText} />
							<RadioButton
								name="exception"
								id="uitgezonderdYesLabel"
								label={<ContentBlock content={page.uitgezonderdYesLabel} />}
								value="yes"
								onChange={onRadioChange}
							/>
							<RadioButton
								name="exception"
								id="uitgezonderdNoLabel"
								label={<ContentBlock content={page.uitgezonderdNoLabel} />}
								value="no"
								onChange={onRadioChange}
							/>
						</Fieldset>

						{selectedOption && (
							<Link as="button" styledAs="button" type="submit">
								{page.uitgezonderdButtonText}
							</Link>
						)}
					</form>
				</Content>
			</Page>
		</>
	);
}

interface UitgezonderdStaticProps {
	params: { locale: Locales; situatie: string };
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: UitgezonderdStaticProps) => {
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
		${getLocaleProperty({ name: 'uitgezonderdLabel', locale })},
		${getLocaleProperty({ name: 'uitgezonderdHelpText', locale })},
		${getLocaleProperty({ name: 'uitgezonderdYesLabel', locale })},
		${getLocaleProperty({ name: 'uitgezonderdNoLabel', locale })},
		${getLocaleProperty({ name: 'uitgezonderdButtonText', locale })},
		${getLocaleProperty({ name: 'currentStepLabel', locale })},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'quarantaine-check',
			type: 'check-ben-ik-uitgezonderd-page',
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
				.filter((situation) => situation.showExceptions)
				.map((situation) => situation.url),
			locales,
		).map(([situatie, locale]: string[]) => ({
			params: { situatie, locale },
		})),
		fallback: false,
	};
};
