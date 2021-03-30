/** @jsx jsx */
import React from 'react';
import { Box, jsx, Styled } from 'theme-ui';

import { Page } from 'components/page';

import {
	ExpansionPanel,
	Link,
	sanityClient,
	getPageQuery,
	getLocaleProperty,
	Content,
	MetaTags,
	useSanityPageContent,
	useSanitySiteSettings,
} from '@quarantaine/common';

interface ContentType {
	title: string;
	titleSuffix?: string;
	content: React.FC;
	ctas: { text: string; name: string }[];
}
export const situationsJij: ContentType[] = [
	{
		title: 'Ik heb coronaklachten',
		titleSuffix: '(o.a. verkouden, koorts of benauwd)',
		content: () => (
			<>
				<Styled.p>
					Je hebt misschien corona als je 1 of meer van deze klachten hebt:
				</Styled.p>
				<Styled.ul>
					<li>
						Verkoudheidsklachten (zoals neusverkoudheid, loopneus, niezen,
						keelpijn)
					</li>
					<li>Hoesten</li>
					<li>Benauwdheid</li>
					<li>Verhoging of koorts</li>
					<li>
						Plotseling verlies van reuk en/of smaak (zonder neusverstopping)
					</li>
				</Styled.ul>
			</>
		),
		ctas: [
			{
				text: 'Ik heb 1 of meer coronaklachten',
				name: 'ik-heb-1-of-meer-coronaklachten',
			},
		],
	},
	{
		title: 'Ik ben in de buurt geweest van iemand met corona',
		content: () => (
			<Styled.p>
				Als je op 1 dag minstens 15 minuten dichtbij (1,5 meter of minder)
				iemand in de buurt bent geweest met corona, dan heb je een verhoogde
				kans om zelf ook besmet geraakt te zijn.
			</Styled.p>
		),
		ctas: [
			{ text: 'Ik ben misschien besmet', name: 'ik-ben-misschien-besmet' },
		],
	},
	{
		title: 'Ik heb een melding gekregen van de CoronaMelder app',
		content: () => (
			<Styled.p>
				De Coronamelder app stuurt een melding als je op 1 dag minstens 15
				minuten dichtbij iemand in de buurt bent geweest die later corona blijkt
				te hebben. Deze persoon moet ook de app gebruiken.
			</Styled.p>
		),
		ctas: [
			{
				text: 'Ik heb deze melding gekregen',
				name: 'ik-heb-een-coronamelder-melding-gekregen',
			},
		],
	},
	{
		title: 'Ik ga op reis, of ik kom terug uit het buitenland',
		content: () => (
			<>
				<Styled.p>
					Als je terugkomt uit buitenlands gebied met een hoog coronarisico,
					moet je bij thuiskomst 10 dagen in thuisquarantaine.
				</Styled.p>

				<Styled.p>
					Moet je nog een noodzakelijke reis maken, of weet je niet zeker of je
					in een risicovol gebied bent geweest? Doe dan de
				</Styled.p>
			</>
		),
		ctas: [
			{
				text: 'Ik kom uit een risicogebied',
				name: 'ik-kom-uit-een-risicogebied',
			},
		],
	},
	{
		title: 'Ik heb zelf corona',
		content: () => (
			<>
				<Styled.p>
					Wat vervelend dat je corona hebt. Heb je daarbij ook last van 1 of
					meer coronaklachten? Dat zijn:
				</Styled.p>
				<Styled.ul>
					<li>
						Verkoudheidsklachten (zoals neusverkoudheid, loopneus, niezen,
						keelpijn)
					</li>
					<li>Hoesten</li>
					<li>Benauwdheid</li>
					<li>Verhoging of koorts</li>
					<li>
						Plotseling verlies van reuk en/of smaak (zonder neusverstopping)
					</li>
				</Styled.ul>
			</>
		),
		ctas: [
			{
				text: 'Ik heb corona, mét klacht(en)',
				name: 'ik-heb-corona-met-klachten',
			},
			{
				text: 'Ik heb corona, zonder klachten',
				name: 'ik-heb-corona-zonder-klachten',
			},
		],
	},
];

export const situationsOther: ContentType[] = [
	{
		title: 'Iemand bij mij in huis of gezin heeft coronaklachten',
		content: () => (
			<Styled.p>
				Als die persoon alleen milde klachten heeft (verkouden, loopneus,
				hoesten) hoef je niet in thuisquarantaine. Maar als deze persoon óók
				last heeft van zware klachten (koorts en/of benauwdheid), dan moet je
				wél in thuisquarantaine.
			</Styled.p>
		),
		ctas: [
			{
				text: 'Iemand in huis heeft zware klachten',
				name: 'iemand-in-huis-heeft-zware-klachten',
			},
		],
	},
	{
		title: 'Iemand bij mij in huis of gezin heeft corona',
		content: () => (
			<Styled.p>
				Als iemand bij jou in huis (of je gezin) corona heeft, moeten jij en
				eventuele andere huisgenoten direct in thuisquarantaine gaan en je zo
				snel mogelijk laten testen.
			</Styled.p>
		),
		ctas: [
			{
				text: 'Iemand in huis heeft corona',
				name: 'iemand-in-huis-heeft-corona',
			},
		],
	},
	{
		title:
			'Iemand bij mij in huis is in de buurt geweest van iemand met corona',
		content: () => (
			<>
				<Styled.p>
					Als jij zelf niet in de buurt bent geweest van de persoon met corona,
					hoef je niet in quarantaine te gaan.
				</Styled.p>
				<Styled.p>
					<strong>Let op:</strong> je huisgenoot die wél in de buurt was van de
					persoon met corona, moet in thuisquarantaine gaan en zichzelf zo snel
					mogelijk laten testen.
				</Styled.p>
			</>
		),
		ctas: [],
	},
];

export default function JouwSituatie() {
	const page = useSanityPageContent();
	const siteSettings = useSanitySiteSettings();

	return (
		<>
			<MetaTags title="Jouw situatie" description="" url="/jouw-situatie" />
			<Page title="Jouw situatie" sx={{ 'dd a': { marginBottom: '16px' } }}>
				<Content>
					<Box sx={{ mt: '36px' }}>
						<Styled.h2>Jij en corona</Styled.h2>

						{situationsJij.map(({ content: Content, ...situation }) => (
							<ExpansionPanel
								title={situation.title}
								titleSuffix={situation.titleSuffix}
							>
								<Content />
								{situation.ctas.map((cta) => (
									<Link href={`/nl/${cta.name}/wanneer`} styledAs="button">
										{cta.text}
									</Link>
								))}
							</ExpansionPanel>
						))}
					</Box>
					<Box sx={{ my: '36px' }}>
						<Styled.h2>Mensen bij jou in huis en corona</Styled.h2>

						{situationsOther.map(({ content: Content, ...situation }) => (
							<ExpansionPanel
								title={situation.title}
								titleSuffix={situation.titleSuffix}
							>
								<Content />
								{situation.ctas.map((cta) => (
									<Link href={`/nl/${cta.name}/wanneer`} styledAs="button">
										{cta.text}
									</Link>
								))}
							</ExpansionPanel>
						))}
					</Box>
					<Styled.h2>Staat jouw situatie er niet tussen?</Styled.h2>
					<Styled.p>Dan hoef je nu niet in thuisquarantaine te gaan.</Styled.p>
					<Styled.p>
						Blijf wel{' '}
						<Link href="/" withChevron={false}>
							alle basisregels
						</Link>{' '}
						volgen om het virus geen kans te geven zich verder te verspreiden.
						Dus houd 1,5 meter afstand, was je handen en bij klachten blijf
						thuis en laat je testen.
					</Styled.p>
				</Content>
			</Page>
		</>
	);
}

interface JouwSituatieStaticProps {
	params: { locale: 'nl' | 'en' };
}

export const getStaticProps = async ({
	params: { locale },
}: JouwSituatieStaticProps) => {
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
			site: 'reizen-tijdens-corona',
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
