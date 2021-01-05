/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPage from 'components/structure/ContentPage';

const Cookies = () => {
	return (
		<>
			<MetaTags
				title="Quarantaine Reischeck | Reizentijdenscorona.nl"
				description=""
				url="/toegankelijkheid"
			/>

			<ContentPage title="Toegankelijkheid">
				<Styled.p sx={{ paddingTop: '63px' }}>
					Een toegankelijke website is voor alle doelgroepen beter te gebruiken.
					Daarom is in het{' '}
					<u>Tijdelijk besluit digitale toegankelijkheid overheid</u> bepaald
					dat overheidssites moeten voldoen aan toegankelijkheidseisen zoals
					vastgelegd in EN 301 549/WCAG 2.1 en daarover verantwoording moeten
					afleggen in een toegankelijkheidsverklaring.
				</Styled.p>
				<Styled.p>
					Deze verklaring kan pas na grondig onderzoek door een daarvoor
					aangewezen bureau worden opgesteld. Omdat deze site nog in
					ontwikkeling is, en zowel technisch als redactioneel nog zal
					veranderen, verwachten wij deze verklaring pas over enkele maanden te
					kunnen publiceren.
				</Styled.p>
				<Styled.h3>Garanderen toegankelijkheid</Styled.h3>
				<Styled.p>
					Wij garanderen een goede toegankelijkheid door de volgende maatregelen
					binnen onze processen:
					<br />
					<ul>
						<li>
							Toegankelijkheid ‘by design’: toegankelijkheid is vanaf de start
							onderdeel van alle stappen in het ontwerp-, bouw en redactionele
							proces van onze website.
						</li>
						<li>
							Onderzoek: onafhankelijke deskundigen toetsen regelmatig
							(onderdelen van) de website op toegankelijkheid. Zowel voor de
							functioneel-technische onderdelen als de redactionele aspecten.
							Gevonden knelpunten lossen wij duurzaam op.
						</li>
						<li>
							Kennis medewerkers: onze medewerkers houden hun kennis over
							toegankelijkheid op peil en passen dit toe waar nodig.
						</li>
					</ul>
				</Styled.p>
				<Styled.h3>Problemen met toegankelijkheid melden</Styled.h3>
				<Styled.p sx={{ marginBottom: '80px' }}>
					Heeft u vragen of opmerkingen? Dan kunt u contact opnemen via{' '}
					<a href="mailto:reizentijdenscorona@minvws.nl">
						reizentijdenscorona@minvws.nl
					</a>
					.
				</Styled.p>
			</ContentPage>
		</>
	);
};

export default Cookies;
