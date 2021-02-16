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

interface BestemmingProps {
	page: {
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
	};
	siteSettings: {
		pageTitleSuffix: string;
	};
	locale: 'nl' | 'en';
}

const Bestemming = ({ page, siteSettings, locale }: BestemmingProps) => {
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
		router.push(getAdvicePath.period());
	};

	return (
		<>
			<MetaTags
				title={`${page.metaData.title}${siteSettings.pageTitleSuffix}`}
				description={page.metaData.description}
				locale={locale}
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

export const getStaticProps = async () => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty('title', 'metaData.title')},
			${getLocaleProperty('description', 'metaData.description')},
		},
		"header": {
			${getLocaleProperty('title', 'header.title')},
			"modal": {
				${getLocaleProperty('link', 'header.modal.link')},
				${getLocaleProperty('text', 'header.modal.text')},
				${getLocaleProperty('title', 'header.modal.title')},
			}
		},
		${getLocaleProperty('button')},
		${getLocaleProperty('nietGevonden')},
		${getLocaleProperty('placeholder')},
		url
	}`;
	const { page, siteSettings } = await sanity.fetch(
		getPageQuery({
			type: 'bestemming-page',
			pageProjection,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			locale: process.env.NEXT_PUBLIC_LOCALE,
		},
	};
};

export default Bestemming;
