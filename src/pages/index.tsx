/** @jsx jsx */
import { Heading, Button, Container, Image, jsx } from 'theme-ui';
import Link from 'next/link';
import LandingHeader from '../components/LandingHeader';
import ListElement from '../components/content/ListElement';
import AnchorLink from '../components/content/AnchorLink';
import InternalLink from '../components/content/InternalLink';
import Panel from '../components/content/Panel';
import HandleDataWidget from '../components/content/HandleDataWidget';
import Footer from '../components/content/Footer';
import { AnchorLinkItem, SafetyInfoItem, InternalLinkItem } from '../components/content/ListItems';

const Home = () => {
    return (
        <>
            <LandingHeader
                message="Wat als je toch naar het buitenland gaat?"
                secondaryMessage="Reis tot 15 maart 2021 alleen noodzakelijk">
                <Heading
                    as='h2'
                    sx={{
                        paddingTop: '0.6em',
                        fontSize: '19pt',
                        fontWeight: 'lighter',
                        width: '80%'
                    }}>
                    Doe de check voor corona-richtlijnen en tips voor je thuisquarantaine.
                </Heading>
                <Link href='/advice'>
                    <Button
                        sx={{
                            width: '100%',
                            padding: '0.8em',
                            marginTop: '1.2em',
                            marginBottom: '1em',
                            fontSize: '1.2em',
                            fontFamily: 'body',
                            fontWeight: 'bold',
                            backgroundColor: 'button'
                        }}>Doe de check</Button>
                </Link>
            </LandingHeader>

            <Container sx={{
                marginTop: '2em',
                marginBottom: '1em',
                paddingLeft: '1em'
            }}>
                <AnchorLinkItem href="privacy">
                    Je privacy is altijd beschermd
                </AnchorLinkItem>
                <AnchorLinkItem href="snel">
                    Binnen 2 minuten resultaat
                </AnchorLinkItem>
                <AnchorLinkItem href="actueel">Actuele infomatie over je bestemming en thuiskomst
                </AnchorLinkItem>
                <AnchorLinkItem href="thuis-quarantaine">
                    We helpen je met je thuisquarantaine
                </AnchorLinkItem>
            </Container>

            <HandleDataWidget />

            <Container
                sx={{
                    paddingTop: '3em',
                    margin: '1em',
                    p: {
                        color: 'header',
                        fontSize: '15pt',
                        marginBottom: '2em',
                        marginRight: '1.3em'
                    },
                    h3: {
                        color: 'header',
                        margin: '0.1em 0',
                        fontSize: '20pt'
                    },
                    h6: {
                        color: 'header',
                        fontSize: '12pt',
                        margin: '1.4em 0 0.5em 0'
                    },
                    div: {
                        textAlign: 'center'
                    },
                    img: {
                        marginLeft: '-2.2em'
                    }
                }}>
                <Container>
                    <Image src="/images/Illustratie_Neem_het_virus_niet_meeRetina.svg" />
                </Container>
                <h6>Waarom is dit belangrijk?</h6>
                <h3>Neem uit het buitenland het virus niet mee naar huis</h3>
                <p>
                    Wanneer je besmet raakt in het buitenland, kun je thuis anderen besmetten. Dit kan ook een andere variant zijn van het virus. Deze check helpt je de juiste keuzes te maken voor, tijdens en na je reis.
                </p>

                <div>
                    <Image src="/images/Illustratie_De_situatie_op_bestemmingRetina.svg" />
                </div>
                <h6>Hoe werkt het?</h6>
                <h3>Ontdek de situatie op je bestemming</h3>
                <p>
                    Op basis van je reisgegevens kijken we naar de actuele situatie op je bestemming. Zo kunnen we direct vertellen waar je rekening mee moet houden.
                </p>

                <div>
                    <Image src="/images/Illustratie_Mobiel_We_vertellen_je_hoe_het_zitRetina.svg" />
                </div>
                <h6>Het resultaat</h6>
                <h3>We vertellen je precies hoe het zit</h3>
                <p>
                    Na de check weet je welke richtlijnen bekend zijn voor je reisbestemming, wat je moet regelen voor je terugreis en thuiskomst.
                </p>

                <div>
                    <Image src="/images/Illustratie_We_helpen_je_op_wegRetina.svg" />
                </div>
                <h6>Het resultaat</h6>
                <h3>We helpen je op weg</h3>
                <p>
                    Ben je tijdens je reis in een gebied geweest met een oranje reisadvies? Vaak heb je voor je terugreis een negaieve testuitslag en verklaring nodig en moet je bij thuiskomst 10 dagen in thuisquarantaine. We helpen je met informatie en tips om alles goed te regelen.
                </p>

            </Container>

            <Footer/>
        </>
    );
}

export default Home;
