/** @jsx jsx */
import { Box, jsx, Styled } from 'theme-ui';
import { MetaTags } from 'components/meta-tags';
import React from 'react';
import { Page } from 'components/page';
import { ExpansionPanel, Link } from '@quarantaine/common';

export default function JouwSituatie() {
	return (
		<>
			<MetaTags title="Jouw situatie" description="" url="/" />
			<Page title="Jouw situatie" sx={{ 'dd a': { marginBottom: '16px' } }}>
				<Box sx={{ mt: '36px' }}>
					<Styled.h2>Jij en corona</Styled.h2>
					<ExpansionPanel title="Ik heb coronaklachten (o.a. verkouden, koorts of benauwd)">
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
						<Link href="/" styledAs="button">
							Ik heb 1 of meer coronaklachten
						</Link>
					</ExpansionPanel>
					<ExpansionPanel title="Ik ben in de buurt geweest van iemand met corona">
						<Styled.p>
							Als je op 1 dag minstens 15 minuten dichtbij (1,5 meter of minder)
							iemand in de buurt bent geweest met corona, dan heb je een
							verhoogde kans om zelf ook besmet geraakt te zijn.
						</Styled.p>
						<Link href="/" styledAs="button">
							Ik ben misschien besmet
						</Link>
					</ExpansionPanel>
					<ExpansionPanel title="Ik heb een melding gekregen van de CoronaMelder app">
						<Styled.p>
							De Coronamelder app stuurt een melding als je op 1 dag minstens 15
							minuten dichtbij iemand in de buurt bent geweest die later corona
							blijkt te hebben. Deze persoon moet ook de app gebruiken.
						</Styled.p>
						<Link href="/" styledAs="button">
							Ik heb deze melding gekregen
						</Link>
					</ExpansionPanel>
					<ExpansionPanel title="Ik ga op reis, of ik kom terug uit het buitenland">
						<Styled.p>
							Als je terugkomt uit buitenlands gebied met een hoog coronarisico,
							moet je bij thuiskomst 10 dagen in thuisquarantaine.
						</Styled.p>

						<Styled.p>
							Moet je nog een noodzakelijke reis maken, of weet je niet zeker of
							je in een risicovol gebied bent geweest? Doe dan de
						</Styled.p>
						<Link href="/" styledAs="button">
							Ik kom uit een risicogebied
						</Link>
					</ExpansionPanel>
					<ExpansionPanel title="Ik heb zelf corona">
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
						<Link href="/" styledAs="button">
							Ik heb corona, mét klacht(en)
						</Link>
						<Link href="/" styledAs="button">
							Ik heb corona, zonder klachten
						</Link>
					</ExpansionPanel>
				</Box>
				<Box sx={{ my: '36px' }}>
					<Styled.h2>Mensen bij jou in huis en corona</Styled.h2>
					<ExpansionPanel title="Iemand bij mij in huis of gezin heeft coronaklachten">
						<Styled.p>
							Als die persoon alleen milde klachten heeft (verkouden, loopneus,
							hoesten) hoef je niet in thuisquarantaine. Maar als deze persoon
							óók last heeft van zware klachten (koorts en/of benauwdheid), dan
							moet je wél in thuisquarantaine.
						</Styled.p>
						<Link href="/" styledAs="button">
							Iemand in huis heeft zware klachten
						</Link>
					</ExpansionPanel>
					<ExpansionPanel title="Iemand bij mij in huis of gezin heeft corona">
						<Styled.p>
							Als iemand bij jou in huis (of je gezin) corona heeft, moeten jij
							en eventuele andere huisgenoten direct in thuisquarantaine gaan en
							je zo snel mogelijk laten testen.
						</Styled.p>
						<Link href="/" styledAs="button">
							Iemand in huis heeft corona
						</Link>
					</ExpansionPanel>
					<ExpansionPanel title="Iemand bij mij in huis is in de buurt geweest van iemand met corona">
						<Styled.p>
							Als jij zelf niet in de buurt bent geweest van de persoon met
							corona, hoef je niet in quarantaine te gaan.
						</Styled.p>
						<Styled.p>
							<strong>Let op:</strong> je huisgenoot die wél in de buurt was van
							de persoon met corona, moet in thuisquarantaine gaan en zichzelf
							zo snel mogelijk laten testen.
						</Styled.p>
					</ExpansionPanel>
				</Box>
				<Styled.h2>Staat jouw situatie er niet tussen?</Styled.h2>
				<Styled.p>Dan hoef je nu niet in thuisquarantaine te gaan.</Styled.p>
				<Styled.p>
					Blijf wel{' '}
					<Link href="/" withChevron={false}>
						alle basisregels
					</Link>{' '}
					volgen om het virus geen kans te geven zich verder te verspreiden. Dus
					houd 1,5 meter afstand, was je handen en bij klachten blijf thuis en
					laat je testen.
				</Styled.p>
			</Page>
		</>
	);
}
