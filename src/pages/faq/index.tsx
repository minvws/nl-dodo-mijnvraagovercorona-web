/** @jsx jsx */
import { jsx, Container, Link } from 'theme-ui';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@reach/disclosure";
import LandingHeader from '../../components/LandingHeader';
import ExpansionPanel from '../../components/ExpansionPanel';
import Footer from '../../components/content/Footer';

const FAQ = () => {
    return (
        <>
            <LandingHeader message="Veelgestelde vragen" backgroundImage="/images/Illustratie_Mobiel_We_vertellen_je_hoe_het_zitRetina.svg">
                <Link href="/advice" sx={{
                    position: 'absolute',
                    top: '20px',
                    textDecoration: 'none',
                    fontFamily: 'body',
                    verticalAlign: 'top',
                    '::before': {
                        display: 'block',
                        content: '""',
                        backgroundImage: `url("/icons/Refresh.svg")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        float: 'left',
                        height: '1.5em',
                        width: '1.5em',
                        paddingRight: '0.5em'
                    }
                }}>
                    naar resultaat
                </Link>
            </LandingHeader>

            <Container>
                <ExpansionPanel text="Waarom heb ik een negatieve testuitslag en negatieve testverklaring nodig?">
                    Dit is één van de Nederlandse maatregelen om de import en verspreiding van het coronavirus tegen te gaan. Je kan hier meer lezen: <a href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/negatieve-covid-19-testverklaring">https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/negatieve-covid-19-testverklaring</a>
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Welke eisen worden gesteld aan de negatieve testuitslag?">
                    De negatieve testuitslag moet in het Engels, Duits, Frans, Spaans of Nederlands zijn. Het document wordt op 5 punten gecontroleerd:
                    <ul>
                        <li>Type test: dit moet een moleculaire PCR-test zijn en een test op Sars-Cov-2/COVID-19. Een ander type test, inclusief een sneltest, is niet geldig;</li>
                        <li>Testresultaat: moet negatief (of niet gedetecteerd) zijn;</li>
                        <li>Voor- en achternaam: overeenkomstig met het paspoort;</li>
                        <li>Datum en tijd van afname van de test: De test is maximaal 72 uur oud bij aankomst in Nederland;</li>
                        <li>Gegevens instituut of laboratorium dat de test afnam.</li>
                    </ul>
                    Meer informatie kan je hier vinden:
                    <a href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/reizigers-van-binnen-de-eu-schengen">
                        https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/reizigers-van-binnen-de-eu-schengen
                    </a>
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Hoe kom ik aan een (negatieve) testuitslag en een negatieve testverklaring?">
                    Je kan een test laten afnemen bij een gevalideerd testcentrum (bv. laboratorium, arts, gezondheidsdienst, etc) op je reisbestemming. Let erop dat de test voldoet aan de eisen die Nederland stelt hieraan. Zie hiervoor de andere veelgestelde vraag. De negatieve testverklaring is verplicht wanneer je van buiten de EU/Schengen gebied afreist naar Nederland. Meer informatie hierover kan je hier vinden:
                    <a href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/reizigers-van-buiten-de-eu-schengen">
                        https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/reizigers-van-buiten-de-eu-schengen
                    </a>
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Wat houdt thuisquarantaine in?">
                    Thuisquarantaine betekent dat je thuisblijft en geen bezoek ontvangt. Dit doe je als je risico hebt gelopen om met corona besmet te zijn. Door in thuisquarantaine te gaan voorkom je dat het coronavirus zich verder verspreidt.
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Wie moeten allemaal in thuisquarantaine?">
                    Iedereen die in een gebied is geweest met een oranje reisadvies, waarbij geldt dat je bij thuiskomst in thuisquarantaine moet.
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Kan ik de 10 dagen thuisquarantaine inkorten?">
                    Nee, als je in thuisquarantaine bent omdat je in een risicogebied bent geweest, dan moet je altijd de 10 dagen thuisquarantaine af maken.
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Ik heb nergens last van, waarom moet ik in thuisquarantaine?">
                    Het kan 10 dagen duren voordat je klachten krijgt nadat je besmet bent met corona. Daarom is het belangrijk 10 dagen in thuisquarantaine te gaan. Er zijn ook mensen die helemaal geen klachten krijgen, maar wel besmet zijn met corona. Zij kunnen andere mensen besmetten als zij niet thuisblijven.
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Wat gebeurt er als ik niet in thuisquarantaine ga?">
                    Als je niet in thuisquarantaine gaat terwijl je wel besmet bent met corona, kun je andere mensen besmetten. Bijvoorbeeld als je langs gaat bij familie of vrienden. Maar ook in de supermarkt of op straat. Ook al ben je zelf misschien niet ziek, andere mensen kunnen erg ziek worden van het coronavirus of er zelfs aan overlijden. Bovendien zorgt het hoge aantal coronabesmettingen voor teveel druk op de zorg.
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Waarom moet ik 10 dagen in thuisquarantaine?">
                    Het kan 10 dagen duren voordat je klachten krijgt nadat je besmet bent met corona. Daarom is het belangrijk 10 dagen in thuisquarantaine te gaan. Na 10 dagen is de kans dat je nog coronaklachten krijgt erg klein.
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Mijn partner, kinderen of huisgenoot zijn niet mee op reis geweest. Moeten zij ook in thuisquarantaine?">
                    Nee, alleen de persoon die op reis is geweest moet in quarantaine.
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Ik ben in het buitenland al (negatief) getest. Moet ik toch in thuisquarantaine?">
                    Ja. Testen is echt een momentopname. Het kan tot 10 dagen duren voordat je klachten krijgt. Het kan dus zijn dat je te vroeg bent getest in het buitenland. Daarom moet je bij terugkomst alsnog 10 dagen in thuisquarantaine.
                </ExpansionPanel>
            </Container>

            <Footer />
        </>
    );
}

export default FAQ;
