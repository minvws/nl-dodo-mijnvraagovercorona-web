import React, { useContext } from 'react';
import Head from 'next/head';

import {
	useCurrentLocale,
	useSanitySiteSettings,
	TranslationContext,
} from '@quarantaine/common';

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
	const locale = useCurrentLocale();
	const { locales } = useContext(TranslationContext);
	const {
		pageTitleSuffix,
		baseUrl,
		socialShareImage,
	} = useSanitySiteSettings();

	const completeURl = `${baseUrl}/${locale.id}${url}`;
	const pageTitle = `${title}${skipPageSuffix ? '' : pageTitleSuffix}`;
	const ogImage = `${baseUrl}${socialShareImage.src}`;

	return (
		<Head>
			<title>{pageTitle}</title>
			<meta name="title" content={`${pageTitle}`} />
			<meta name="description" content={description} />

			{locales.map((locale) => (
				<link
					key={locale.id}
					rel="alternate"
					hrefLang={locale.id}
					href={`${baseUrl}/${locale.id}${url}`}
				/>
			))}

			<meta property="og:title" content={pageTitle} />
			<meta property="og:description" content={description} />
			<meta property="og:url" content={completeURl} />
			<meta property="og:image" content={ogImage} />
			<meta property="og:type" content="website" />
			<meta property="og:locale" content={locale.locale} />
			{locales.map(
				(alternateLocale) =>
					locale.id !== alternateLocale.id && (
						<meta
							property="og:locale:alternate"
							content={alternateLocale.locale}
							key={alternateLocale.locale}
						/>
					),
			)}

			<meta property="twitter:title" content={pageTitle} />
			<meta property="twitter:description" content={description} />
			<meta property="twitter:url" content={completeURl} />
			<meta property="twitter:image" content={ogImage} />
			<meta property="twitter:card" content="summary_large_image" />

			<link rel="canonical" href={completeURl} />

			{noIndex && <meta name="robots" content="noindex" />}
		</Head>
	);
};
