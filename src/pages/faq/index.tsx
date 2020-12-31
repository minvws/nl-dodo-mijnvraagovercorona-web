/** @jsx jsx */
import { jsx, Container, Link } from 'theme-ui';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@reach/disclosure";
import FAQTop5 from '../../components/faq/Top5'
import ContentPageHeader from '../../components/ContentPageHeader';
import ExpansionPanel from '../../components/ExpansionPanel';
import Footer from '../../components/content/Footer';

const FAQ = () => {
    return (
        <>
            <ContentPageHeader message="Veelgestelde vragen" backgroundImage="/images/Illustratie_Mobiel_Veelgestelde_vragenRetina.svg">
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
                <div sx={{
                    marginBottom: '3em'
                }}></div>
            </ContentPageHeader>

            <Container sx={{
                width: ['100%', '1024px'],
                padding: ['standard', 0],
                marginTop: '2em'

                }}>
                <FAQTop5 />
                <hr/>
                <ExpansionPanel text="Hoe kom ik aan een (negatieve) testuitslag en een negatieve testverklaring?">
                    Je kan een test laten afnemen bij een gevalideerd testcentrum (bv. laboratorium, arts, gezondheidsdienst, etc) op je reisbestemming. Let erop dat de test voldoet aan de eisen die Nederland stelt hieraan. Zie hiervoor de andere veelgestelde vraag. De negatieve testverklaring is verplicht wanneer je van buiten de EU/Schengen gebied afreist naar Nederland.
                    Meer informatie hierover kan je <Link href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/reizigers-van-buiten-de-eu-schengen">hier</Link> vinden
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Ik heb nergens last van, waarom moet ik in thuisquarantaine?">
                    Het kan 10 dagen duren voordat je klachten krijgt nadat je besmet bent met corona. Daarom is het belangrijk 10 dagen in thuisquarantaine te gaan. Er zijn ook mensen die helemaal geen klachten krijgen, maar wel besmet zijn met corona. Zij kunnen andere mensen besmetten als zij niet thuisblijven.
                </ExpansionPanel>
                <hr/>
                <ExpansionPanel text="Bescherm ik anderen door in thuisquarantaine te gaan?">
                    Ja, want als je niet in thuisquarantaine gaat terwijl je wel besmet bent met corona, kun je andere mensen besmetten. Bijvoorbeeld als je langs gaat bij familie of vrienden. Maar ook in de supermarkt of op straat. Ook al ben je zelf misschien niet ziek, andere mensen kunnen erg ziek worden van het coronavirus of er zelfs aan overlijden. Bovendien zorgt het hoge aantal coronabesmettingen voor teveel druk op de zorg.
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
