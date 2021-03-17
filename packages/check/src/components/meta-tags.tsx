import React from 'react';
import Head from 'next/head';

type Props = {
	title: string;
	description: string;
	url: string;
	noIndex?: boolean;
	skipPageSuffix?: boolean;
};

export const MetaTags = ({
	title,
	description,
	url,
	noIndex,
	skipPageSuffix,
}: Props) => {
	const baseUrl = 'https://quarantainecheck.rijksoverheid.nl';
	const completeURl = `${baseUrl}/nl${url}`;

	const pageTitle = `${title}${skipPageSuffix ? '' : ' Rijksoverheid'}`;

	return (
		<Head>
			<title>{pageTitle}</title>
			<meta name="title" content={`${pageTitle}`} />
			<meta name="description" content={description} />

			<link rel="alternate" hrefLang="nl" href={`${baseUrl}/nl${url}`} />

			<meta property="og:type" content="website" />
			<meta property="og:url" content={completeURl} />
			<meta property="og:image" content={`${baseUrl}/share.png`} />
			<link rel="canonical" href={completeURl} />

			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={description} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={completeURl} />
			<meta property="twitter:title" content={pageTitle} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:image" content={`${baseUrl}/share.png`} />

			{noIndex && <meta name="robots" content="noindex" />}
		</Head>
	);
};
