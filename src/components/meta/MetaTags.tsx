import React from 'react';
import Head from 'next/head';
import { useCurrentLanguage, useSanitySiteSettings } from 'hooks/translation';

type Props = {
	title: string;
	description: string;
	url: string;
	noIndex?: boolean;
	skipPageSuffix?: boolean;
};

const MetaTags = ({
	title,
	description,
	url,
	noIndex,
	skipPageSuffix,
}: Props) => {
	const language = useCurrentLanguage();
	const baseUrl = 'https://reizentijdenscorona.rijksoverheid.nl';
	const completeURl = `${baseUrl}/${language.id}${url}`;
	const siteSettings = useSanitySiteSettings();

	const pageTitle = `${title}${
		skipPageSuffix ? '' : siteSettings.pageTitleSuffix
	}`;

	return (
		<Head>
			<title>{pageTitle}</title>
			<meta name="title" content={`${pageTitle}`} />
			<meta name="description" content={description} />

			<link rel="alternate" hrefLang="nl" href={`${baseUrl}/nl${url}`} />
			<link rel="alternate" hrefLang="en" href={`${baseUrl}/en${url}`} />

			<meta property="og:type" content="website" />
			<meta property="og:locale" content={language.locale} />
			{language.alternateLocales.map((alternateLocale) => (
				<meta property="og:locale:alternate" content={alternateLocale} />
			))}

			<meta property="og:url" content={completeURl} />
			<meta property="og:image" content={`${baseUrl}/share.png`} />
			<link rel="canonical" href={completeURl} />

			<meta
				property="og:title"
				content={`${title}${siteSettings.pageTitleSuffix}`}
			/>
			<meta property="og:description" content={description} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={completeURl} />
			<meta
				property="twitter:title"
				content={`${title}${siteSettings.pageTitleSuffix}`}
			/>
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={`${baseUrl}/share.png`} />

			{noIndex && <meta name="robots" content="noindex" />}
		</Head>
	);
};

export default MetaTags;
