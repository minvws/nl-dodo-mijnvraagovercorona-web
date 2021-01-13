/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPage from 'components/structure/ContentPage';

const Cookies = () => {
	return (
		<>
			<MetaTags
				title="Meer informatie | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Meer informatie? Kijk op www.rijksoverheid.nl"
				url="/informatie-over-deze-proef"
			/>
			<ContentPage title="Informatie over deze proef">
				<Styled.p sx={{ paddingTop: '63px' }}>
					Het Ministerie van VWS start een praktijkproef van de zogenaamde
					Quarantaine Reischeck. Dit is een online hulpmiddel dat inkomende
					reizigers ondersteunt bij het maken van de juiste keuzen voor hun
					gedrag in coronatijd. De proef onder een eerste groep van reizigers
					start op 7 januari.
				</Styled.p>
				<Styled.p>
					Uit onderzoek blijkt dat een groot deel van de bevolking maatregelen
					die gelden in de aanpak van het coronavirus – zoals het dringende
					quarantaineadvies - onderschrijft, maar het lastig vindt daar ook
					opvolging aan te geven. Dat geldt in het bijzonder voor inkomende en
					terugkerende reizigers. Slechts 27% van hen houdt zich aan de geldende
					quarantaine maatregelen. Die houden op dit moment in dat elke reiziger
					na aankomst uit vrijwel elk land 10 dagen in quarantaine moet gaan.
					Ook nu het reizen zeer beperkt is en in ieder geval tot en met 31
					maart 2021 alleen in noodzakelijke gevallen plaatsvindt is het van het
					grootste belang dat men deze richtlijn opvolgt.
				</Styled.p>
				<Styled.p>
					Met behulp van een praktische, digitale checklist kunnen reizigers
					nagaan, welke stappen zij moeten nemen als zij terugkeren. Zo wordt
					het hen gemakkelijker gemaakt in quarantaine te blijven. De
					Quarantaine Reischeck kan steeds worden aangepast aan de actuele
					beleidsmaatregelen. Zo weet een reiziger altijd welke maatregelen
					rondom de reis zoals testverklaringen op dat moment in Nederland van
					toepassing zijn. Inkomende reizigers worden via social media gevraagd
					de Quarantaine Reischeck te gebruiken.
				</Styled.p>
				<Styled.p sx={{ paddingBottom: '80px' }}>
					De Quarantaine Reischeck slaat geen persoons- of andere gegevens op,
					maar is slechts een hulpmiddel bij het maken van de juiste keuzen. De
					Quarantaine Reischeck is de afgelopen weken op kleine schaal getest en
					aangescherpt. Nu volgt een praktijkproef onder een eerste groep
					reizigers. Op basis van de resultaten van de proef wordt de Reischeck
					verbeterd en afgerond zodat dit hulpmiddel daarna breed inzetbaar is
					voor alle inkomende reizigers. Daarbij worden organisaties in de
					reisbranche intensief betrokken.
				</Styled.p>
			</ContentPage>
		</>
	);
};

export default Cookies;
