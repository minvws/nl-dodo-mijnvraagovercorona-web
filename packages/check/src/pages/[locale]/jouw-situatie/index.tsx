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
			<Page title="Jouw situatie">
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
								Plotseling verlie-s van reuk en/of smaak (zonder
								neusverstopping)
							</li>
						</Styled.ul>
					</ExpansionPanel>
					<ExpansionPanel title="Ik ben in de buurt geweest van iemand met corona">
						<Styled.p>
							Als je op 1 dag minstens 15 minuten dichtbij (1,5 meter of minder)
							iemand in de buurt bent geweest met corona, dan heb je een
							verhoogde kans om zelf ook besmet geraakt te zijn.
						</Styled.p>
					</ExpansionPanel>
					<ExpansionPanel title="Ik heb een melding gekregen van de CoronaMelder app">
						Ik ben in de buurt geweest van iemand met corona
					</ExpansionPanel>
					<ExpansionPanel title="Ik ga op reis, of ik kom terug uit het buitenland">
						Ik ben in de buurt geweest van iemand met corona
					</ExpansionPanel>
					<ExpansionPanel title="Ik heb zelf corona">
						Ik ben in de buurt geweest van iemand met corona
					</ExpansionPanel>
				</Box>
				<Box sx={{ my: '36px' }}>
					<Styled.h2>Mensen bij jou in huis en corona</Styled.h2>
					<ExpansionPanel title="Iemand bij mij in huis of gezin heeft coronaklachten">
						Ik ben in de buurt geweest van iemand met corona
					</ExpansionPanel>
					<ExpansionPanel title="Iemand bij mij in huis of gezin heeft corona">
						Ik ben in de buurt geweest van iemand met corona
					</ExpansionPanel>
					<ExpansionPanel title="Iemand bij mij in huis is in de buurt geweest van iemand met corona">
						Ik ben in de buurt geweest van iemand met corona
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
