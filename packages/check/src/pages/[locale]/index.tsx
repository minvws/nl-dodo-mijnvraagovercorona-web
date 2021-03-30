/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';

import { Page } from 'components/page';

import {
	Link,
	QuickLinks,
	SectionInformational,
	MetaTags,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	useSanityPageContent,
	useSanitySiteSettings,
	Content,
} from '@quarantaine/common';

// In array so we can easily abstract it to CMS later.
interface HomepageCopy {
	key: string;
	quickLinkText: string;
	subTitle: string;
	title: string;
	text: string;
	illustrationUrl: string;
}
const homepageCopy: HomepageCopy[] = [
	{
		key: 'voorkom-verspreiding',
		quickLinkText: 'Help verspreiding van het virus voorkomen',
		subTitle: 'Waarom is dit belangrijk?',
		title: 'Help verspreiding van het virus voorkomen',
		text: 'Door in quarantaine te gaan voorkom je dat anderen besmet raken.',
		illustrationUrl: '/images/corona-world.svg',
	},
	{
		key: 'binnen-1-minuut',
		quickLinkText: 'Weet binnen 1 minuut of je in thuisquarantaine moet',
		subTitle: 'De check',
		title: 'Weet waar je aan toe bent',
		text:
			'Misschien heb je zelf klachten of ben je in de buurt geweest van iemand met corona. Of je bent op reis geweest naar een gebied met een hoog coronarisico. Met de check weet je of jij in quarantaine moet gaan en je moet laten testen om verspreiding van het virus te voorkomen.',
		illustrationUrl: '/images/checklist.svg',
	},
	{
		key: 'wij-helpen',
		quickLinkText: 'We helpen je met je thuisquarantaine',
		subTitle: 'Het resultaat',
		title: 'We helpen je op weg',
		text:
			'Als je in quarantaine moet, dan helpen we je om de thuisquarantaine zo goed mogelijk voor te bereiden én door te komen.',
		illustrationUrl: '/images/people-help.svg',
	},
];

export default function LandingPage() {
	const page = useSanityPageContent();
	const siteSettings = useSanitySiteSettings();

	return (
		<>
			<MetaTags
				title="Quarantaine check"
				description=""
				url="/"
				skipPageSuffix
			/>

			<Page title="Moet ik in quarantaine?">
				<Content>
					<Link styledAs="button" href="/nl/jouw-situatie">
						Doe de check
					</Link>
					<QuickLinks sx={{ mb: '30px' }}>
						{homepageCopy.map((copy) => (
							<Link href={`#${copy.key}`} key={copy.key}>
								{copy.quickLinkText}
							</Link>
						))}
						<Link href="privacy" sx={{ display: ['block', 'none'] }}>
							Je privacy is altijd beschermd
						</Link>
					</QuickLinks>

					{homepageCopy.map((copy, index) => (
						<SectionInformational
							key={copy.key}
							id={copy.key}
							imageAlignment={index % 2 === 0 ? 'right' : 'left'}
							imageUrl={copy.illustrationUrl}
							chapeau={copy.subTitle}
							title={copy.title}
						>
							<Styled.p>{copy.text}</Styled.p>
						</SectionInformational>
					))}
				</Content>
			</Page>
		</>
	);
}

interface LandingStaticProps {
	params: { locale: 'nl' | 'en' };
}

export const getStaticProps = async ({
	params: { locale },
}: LandingStaticProps) => {
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
			${getLocaleProperty({ name: 'button', path: 'header.button', locale })},
			${getLocaleProperty({ name: 'pretitle', path: 'header.pretitle', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
		},
		"uitleg": uitleg[]{
			"image": "/images/sanity/" + image.asset->originalFilename,
			${getLocaleProperty({ name: 'description', locale })},
			${getLocaleProperty({ name: 'pretitle', locale })},
			${getLocaleProperty({ name: 'title', locale })},
			"linklist": {
				${getLocaleProperty({ name: 'id', path: 'linklist.id', locale })},
				${getLocaleProperty({ name: 'usp', path: 'linklist.usp', locale })},
			},
		},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			type: 'landing-page',
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
	paths: ['nl'].map((locale) => ({
		params: { locale },
	})),
	fallback: false,
});
