import React from 'react';
import Head from 'next/head';

type Props = {
	title: string;
	description: string;
	url: string;
};

const MetaTags = ({ title, description, url }: Props) => {
	const completeURl = `https://www.reizentijdenscorona.nl${url}`;

	return (
		<Head>
			<title>{title}</title>
			<meta name="title" content={title} />
			<meta name="description" content={description} />

			<meta property="og:type" content="website" />
			<meta property="og:locale" content="nl_NL" />
			<meta property="og:url" content={completeURl} />
			<meta
				property="og:image"
				content="https://www.reizentijdenscorona.nl/share.png"
			/>
			<link rel="canonical" href={completeURl} />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />

			<meta property="twitter:card" content="summary_large_image" />
			<meta property="twitter:url" content={completeURl} />
			<meta property="twitter:title" content={title} />
			<meta property="twitter:description" content={description} />
			<meta
				property="twitter:image"
				content="https://www.reizentijdenscorona.nl/share.png"
			/>
		</Head>
	);
};

export default MetaTags;
