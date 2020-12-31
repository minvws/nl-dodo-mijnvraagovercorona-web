/** @jsx jsx */
import { jsx, Container, Link } from 'theme-ui';
import SimpleContent from '../../components/content/SimpleContent';

const Cookies = () => {
    return (
        <SimpleContent>
            <Container>
                <h2>Toegankelijkheid</h2>
                <p>
                    Een toegankelijke website is voor alle doelgroepen beter te gebruiken. Daarom is in het <u>Tijdelijk besluit digitale toegankelijkheid overheid</u> bepaald dat overheidssites moeten voldoen aan toegankelijkheidseisen zoals vastgelegd in EN 301 549/WCAG 2.1 en daarover verantwoording moeten afleggen in een toegankelijkheidsverklaring.
                </p>
                <p>
                    Deze verklaring kan pas na grondig onderzoek door een daarvoor aangewezen bureau worden opgesteld. Omdat deze site nog in ontwikkeling is, en zowel technisch als redactioneel nog zal veranderen, verwachten wij deze verklaring pas over enkele maanden te kunnen publiceren.
                </p>
                <p>
                    <h4>Garanderen toegankelijkheid</h4>
                    Wij garanderen een goede toegankelijkheid door de volgende maatregelen binnen onze processen:<br/>
                    <ul>
                        <li>Toegankelijkheid ‘by design’: toegankelijkheid is vanaf de start onderdeel van alle stappen in het ontwerp-, bouw en redactionele proces van onze website.</li>
                        <li>Onderzoek: onafhankelijke deskundigen toetsen regelmatig (onderdelen van) de website op toegankelijkheid. Zowel voor de functioneel-technische onderdelen als de redactionele aspecten. Gevonden knelpunten lossen wij duurzaam op.</li>
                        <li>Kennis medewerkers: onze medewerkers houden hun kennis over toegankelijkheid op peil en passen dit toe waar nodig.</li>
                    </ul>
                </p>
                <p>
                    <h4>Problemen met toegankelijkheid melden</h4>
                    Heeft u vragen of opmerkingen? Dan kunt u contact opnemen via reizentijdenscorona@minvws.nl.
                </p>
            </Container>
        </SimpleContent>
    );
}

export default Cookies;
