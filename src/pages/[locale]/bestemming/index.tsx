/** @jsx jsx */
import React, { useState } from 'react';
import sanity, { getPageQuery, getLocaleProperty } from 'utilities/sanity';
import { jsx } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import { InternalLink } from 'components/Links';
import '@reach/dialog/styles.css';
import DestinationSearch from 'components/advice/DestinationSearch';
import { Dialog } from 'components/dialog';
import { Content, Hero, Page } from 'components/structure/Page';
import ProgressMarker from 'components/advice/ProgressMarker';
import { alignLogoRightOnMobileStyles } from 'components/structure/RoHeaderLogo';
import AdviceContext from 'components/advice/AdviceContext';
import { getCountrySlug } from 'utilities/pathUtils';
import { useRouter } from 'next/router';
import { getAdvicePath } from 'components/advice/utils';
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
	nietGevonden: string;
	placeholder: string;
	button: string;
	url: string;
}

interface BestemmingProps {
	locale: 'nl' | 'en';
}

const Bestemming = ({ locale }: BestemmingProps) => {
	const page = useSanityPageContent<PageContent>();
	const [showDialog, setShowDialog] = useState(false);
	const { setDestination } = React.useContext(AdviceContext);
	const router = useRouter();
	const openDialog = (event: any) => {
		event.preventDefault();
		setShowDialog(true);
	};

	const handleDestinationChose = (destinationName: string) => {
		const destination = getCountrySlug(destinationName);

		// @TODO: Handle invalid destination names which return in null being returned
		// from the slug.
		if (!destination) return;

		setDestination(destination);
		router.push(getAdvicePath.period(locale));
	};

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
					<ProgressMarker stage={1} totalStages={3} />
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
				<Content>
					<DestinationSearch onDestinationChosen={handleDestinationChose} />
				</Content>
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
		${getLocaleProperty({ name: 'nietGevonden', locale })},
		${getLocaleProperty({ name: 'placeholder', locale })},
		url
	}`;
	const { page, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'bestemming-page',
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

export default Bestemming;
