/** @jsx jsx */
import React, { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { Flex, jsx } from 'theme-ui';
import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';

import AdviceContext, {
	MeansOfTransport,
} from 'components/advice/AdviceContext';
import ProgressMarker from 'components/advice/ProgressMarker';
import { getAdvicePath } from 'components/advice/utils';
import { ButtonStyledAsSubmit } from 'components/button/ButtonStyled';
import { Dialog } from 'components/dialog';
import { InternalLink } from 'components/Links';
import MetaTags from 'components/meta/MetaTags';
import { RadioButton } from 'components/radio-button';
import BodyContainer from 'components/structure/BodyContainer';
import { Hero, Page } from 'components/structure/Page';
import { alignLogoRightOnMobileStyles } from 'components/structure/RoHeaderLogo';
import { isBrowser } from 'utilities/is-browser';
import { useSanityPageContent } from 'hooks/translation';

interface PageContent {
	metaData: {
		title: string;
		description: string;
	};
	header: {
		title: string;
		modal: {
			link: string;
			text: string;
			title: string;
		};
	};
	button: string;
	url: string;
}

interface VervoersmiddelProps {
	locale: 'nl' | 'en';
}

const VervoersmiddelPage = ({ locale }: VervoersmiddelProps) => {
	const page = useSanityPageContent<PageContent>();
	const formRef = useRef<HTMLFormElement>(null);
	const {
		setMeansOfTransport,
		meansOfTransport,
		destination,
		from,
		to,
		stage,
	} = React.useContext(AdviceContext);
	const router = useRouter();
	const [showDialog, setShowDialog] = useState(false);

	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

	/**
	 * Navigate to next step.
	 */
	const handleSubmit = (ev: React.FormEvent<HTMLFormElement>) => {
		ev.preventDefault();
		if (!meansOfTransport) return;

		router.push(
			getAdvicePath.result({
				meansOfTransport,
				// As string casting since we now for sure that
				// we have from and to date here, otherwise a redirect would have occured.
				destination: destination as string,
				stage: stage as string,
				fromDate: from as string,
				toDate: to as string,
				locale,
			}),
		);
	};

	/**
	 * Store means of transport in context.
	 */
	const handleMeansOfTransportSelect = (
		selectedTransport: MeansOfTransport,
	) => {
		setMeansOfTransport(selectedTransport);
	};

	/**
	 * If the destination has not been selected
	 */
	if (!destination) {
		if (isBrowser()) router.push(getAdvicePath.destination(locale));
		return null;
	}

	/**
	 * If the destination has been set, but the period has not been selected yet
	 */
	if (destination && (!from || !to)) {
		if (isBrowser()) router.push(getAdvicePath.period(locale));
		return null;
	}

	return (
		<>
			<MetaTags
				title={page.metaData.title}
				description={page.metaData.description}
				url={page.url}
			/>

			<Page
				title={page.header.title}
				cleanPageOnMobile
				sx={alignLogoRightOnMobileStyles}
			>
				<Hero>
					<ProgressMarker stage={3} totalStages={3} />
					<InternalLink href="" onClick={openDialog}>
						{page.header.modal.link}
					</InternalLink>
					<Dialog
						title={page.header.modal.title}
						isVisible={showDialog}
						closeDialog={() => setShowDialog(false)}
					>
						<p>{page.header.modal.text}</p>
					</Dialog>
				</Hero>

				<BodyContainer>
					<form method="POST" action="" onSubmit={handleSubmit} ref={formRef}>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met het vliegtuig"
							value="vliegtuig"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met de auto"
							value="auto"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met de trein"
							value="trein"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Met de bus"
							value="bus"
							onChange={handleMeansOfTransportSelect}
						/>
						<RadioButton<MeansOfTransport>
							name="meansOfTransport"
							label="Ik reis op een andere manier terug naar Nederland"
							value="anders"
							onChange={handleMeansOfTransportSelect}
						/>
						{meansOfTransport && (
							<Flex
								sx={{
									justifyContent: [undefined, 'flex-end'],
									width: '100%',
									paddingTop: 30,
								}}
							>
								<ButtonStyledAsSubmit>Naar het resultaat</ButtonStyledAsSubmit>
							</Flex>
						)}
					</form>
				</BodyContainer>
			</Page>
		</>
	);
};

export const getStaticProps = async ({
	params: { locale },
}: {
	params: { locale: 'nl' | 'en' };
}) => {
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
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
			"modal": {
				${getLocaleProperty({ name: 'link', path: 'header.modal.link', locale })},
				${getLocaleProperty({ name: 'text', path: 'header.modal.text', locale })},
				${getLocaleProperty({ name: 'title', path: 'header.modal.title', locale })},
			}
		},
		${getLocaleProperty({ name: 'button', locale })},
		url
	}`;
	const { page, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'vervoersmiddel-page',
			pageProjection,
			locale,
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

export const getStaticPaths = () => ({
	paths: ['nl', 'en'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});

export default VervoersmiddelPage;
