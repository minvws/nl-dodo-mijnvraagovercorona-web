/** @jsx jsx */
import { Box, jsx, Styled, Text } from 'theme-ui';
import { MetaTags } from 'components/meta-tags';
import React from 'react';
import { Page } from 'components/page';
import { Link, QuickLinks } from '@quarantaine/common';

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
		illustrationUrl: '/illustrations/corona-world.svg',
	},
	{
		key: 'binnen-1-minuut',
		quickLinkText: 'Weet binnen 1 minuut of je in thuisquarantaine moet',
		subTitle: 'De check',
		title: 'Weet waar je aan toe bent',
		text:
			'Misschien heb je zelf klachten of ben je in de buurt geweest van iemand met corona. Of je bent op reis geweest naar een gebied met een hoog coronarisico. Met de check weet je of jij in quarantaine moet gaan en je moet laten testen om verspreiding van het virus te voorkomen.',
		illustrationUrl: '/illustrations/checklist.svg',
	},
	{
		key: 'wij-helpen',
		quickLinkText: 'We helpen je met je thuisquarantaine',
		subTitle: 'Het resultaat',
		title: 'We helpen je op weg',
		text:
			'Als je in quarantaine moet, dan helpen we je om de thuisquarantaine zo goed mogelijk voor te bereiden én door te komen.',
		illustrationUrl: '/illustrations/people-help.svg',
	},
];

export default function Home() {
	return (
		<>
			<MetaTags title="Quarantaine check" description="" url="/" />
			<Page title="Moet ik in quarantaine?">
				<QuickLinks sx={{ mb: '30px' }}>
					{homepageCopy.map((copy) => (
						<Link key={copy.key} href={`#${copy.key}`}>
							{copy.quickLinkText}
						</Link>
					))}
					<Link href="privacy" sx={{ display: ['block', 'none'] }}>
						Je privacy is altijd beschermd
					</Link>
				</QuickLinks>

				{homepageCopy.map((copy, index) => (
					<Box
						key={copy.key}
						id={copy.key}
						as="section"
						sx={{
							mb: '38px',
							display: 'flex',
							alignItems: ['flex-start', 'center'],
							flexDirection: ['column', index % 2 ? 'row' : 'row-reverse'],
						}}
					>
						<img
							sx={{ width: 200, maxWidth: '80%', margin: '0 auto' }}
							src={copy.illustrationUrl}
							alt=""
						/>
						<div
							sx={{
								[`margin${index % 2 ? 'Left' : 'Right'}`]: [undefined, '30px'],
							}}
						>
							<Text variant="chapeau">{copy.subTitle}</Text>
							<Styled.h2>{copy.title}</Styled.h2>
							<Styled.p>{copy.text}</Styled.p>
						</div>
					</Box>
				))}
			</Page>
		</>
	);
}
