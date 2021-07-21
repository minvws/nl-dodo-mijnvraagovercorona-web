/** @jsx jsx */
import { jsx } from 'theme-ui';
import React, { useMemo, useRef, useState } from 'react';

import { Page } from 'components/page';

import {
	DatepickerTopbar,
	DatepickerTopbarTitle,
	DatepickerBacklinkWrapper,
	ScreenReaderOnly,
	BodyContainer,
	Datepicker,
	Link,
	MetaTags,
	Hero,
	Dialog,
	formatShortDate,
	Fieldset,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	cartesianProduct,
	ContentBlock,
	addDays,
	Content,
	RadioButton,
} from '@quarantaine/common';

import { getSituations } from 'utilities/situations';

import 'react-day-picker/lib/style.css';
import { useRouter } from 'next/router';
import { differenceInDays, startOfDay, format } from 'date-fns';
import { ProgressMarker } from 'components/progress-marker';

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
	currentSituation: any; // TODO
	locale: 'nl';
}

export default function Beschermd({
	currentSituation,
	locale,
}: BeschermdProps) {
	const page = useSanityPageContent<PageContent>();
	// const router = useRouter();
	// const linkRef = useRef<HTMLAnchorElement>(null);
	const formRef = useRef<HTMLFormElement>(null);

	/**
	 * Navigate to next step.
	 */
	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		console.log('Volgende!');

		// TODO: update url based on currentSituation.showDate
	};

	const onRadioChange = (value: any) => {
		console.log('Radio change!');
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
				<Content noSpacingOnTop>
					<BodyContainer sx={{ display: 'flex', flexDirection: 'column' }}>
						<form method="POST" action="" onSubmit={handleSubmit} ref={formRef}>
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

							<Link as="button" styledAs="button" type="submit">
								{page.beschermdButtonText}
							</Link>
						</form>
					</BodyContainer>
				</Content>
			</Page>
		</>
	);
}

type Situaties =
	| 'ik-kan-geen-afstand-houden-en-huisgenoot-heeft-geen-klachten'
	| 'ik-kan-afstand-houden'
	| 'ik-ben-misschien-besmet'
	| 'ik-heb-een-coronamelder-melding-gekregen'
	| 'ik-kom-uit-een-risicogebied'
	| 'ik-heb-corona-met-klachten'
	| 'ik-heb-corona-zonder-klachten';

interface WanneerStaticProps {
	params: { locale: 'nl' | 'en'; situatie: Situaties };
}

export const getStaticProps = async ({
	params: { locale, situatie },
}: WanneerStaticProps) => {
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
			type: 'check-beschermd-page',
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
