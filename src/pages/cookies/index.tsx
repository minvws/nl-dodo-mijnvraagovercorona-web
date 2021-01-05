/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPage from 'components/structure/ContentPage';

const Cookies = () => {
	return (
		<>
			<MetaTags
				title="Cookies | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Algemene Verordening Gegevensbescherming. Reizentijdenscorona.nl gebruikt cookies voor statistieken om te begrijpen hoe bezoekers de website gebruiken. Deze informatie helpt de website te verbeteren, bijvoorbeeld door informatie te  verduidelijken of het gebruikersgemak te vergroten."
				url="/cookies"
			/>

			<ContentPage title="Cookies">
				<Styled.h3 sx={{ paddingTop: '63px' }}>
					Algemene Verordening Gegevensbescherming
				</Styled.h3>
				<Styled.p>
					Reizentijdenscorona.nl gebruikt cookies voor statistieken om te
					begrijpen hoe bezoekers de website gebruiken. Deze informatie helpt de
					website te verbeteren, bijvoorbeeld door informatie te verduidelijken
					of het gebruikersgemak te vergroten.
					<br />
					Hiertoe verzamelen wij, net als elke website, IP-adressen van
					bezoekers. Deze worden opgeslagen in zogeheten logfiles. De logfiles
					worden 5 dagen op de webserver bewaard zodat ze beschikbaar zijn voor
					het webstatistiekprogramma Piwik. Daarna blijven de logfiles 90 dagen
					bewaard voor uitsluitend beveiligingsredenen.
				</Styled.p>
				<Styled.p>
					De Autoriteit Persoonsgegevens heeft maatregelen getroffen om de
					herleidbaarheid van bezoekers aan onze website zo veel mogelijk te
					beperken. Dit doen we door onmiddellijk na het importeren van de
					logfiles in Piwik het laatste octet (cijfergroep) van elk IP-adres weg
					te gooien. Dit gebeurt in een tijdelijk geheugen, voordat de
					IP-adressen in Piwik worden opgeslagen.
				</Styled.p>
				<Styled.p>
					Wij verzamelen de volgende gegevens in Piwik:
					<ul>
						<li>
							gebruikte apparatuur en software (apparaten, browsers,
							besturingssysteem)
						</li>
						<li>gebruikte links om op onze website te komen</li>
						<li>gebruikte links binnen de website</li>
					</ul>
				</Styled.p>
				<Styled.p>
					Deze gegevens haalt Piwik uit de logfiles van de webserver. Deze
					logfiles blijven 31 dagen in de database van Piwik staan. Daarna
					worden ze verwijderd. Er blijft dan alleen een geaggregeerde
					(samengevoegde) logfile over. Die levert een jaarrapportage op over
					het websitebezoek.
				</Styled.p>
				<Styled.p>
					Wij verstrekken geen persoonsgegevens aan derden, tenzij dat
					noodzakelijk is om aangifte te doen van strafbare feiten.
				</Styled.p>
				<Styled.h3>Telecomwet – cookies voor webstatistieken</Styled.h3>
				<Styled.p sx={{ paddingBottom: '80px' }}>
					In algemene zin is het zo dat websites bezoekers toestemming moeten
					vragen voor het plaatsen van cookies. De cookiewet maakt een
					uitzondering voor cookies die niet privacygevoelig zijn, bijvoorbeeld
					cookies die bezoekersaantallen bijhouden.
					<br />
					Voor cookies die geen of weinig inbreuk op de privacy maken, is geen
					toestemming van de bezoeker nodig. Dit zijn vaak cookies die een
					website beter laten werken. In deze categorie vallen ook onze
					analytische cookies
				</Styled.p>
			</ContentPage>
		</>
	);
};

export default Cookies;
