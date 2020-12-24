/** @jsx jsx */
import { Heading, Button, Container, Image, jsx } from 'theme-ui';
import Link from 'next/link';
import LandingHeader from '../components/LandingHeader';
import ListElement from '../components/content/ListElement';
import AnchorLink from '../components/content/AnchorLink';
import InternalLink from '../components/content/InternalLink';
import Panel from '../components/content/Panel';
import Footer from '../components/content/Footer';

const Home = () => {
    return (
        <>
            <LandingHeader
                message="Wat als je toch naar het buitenland gaat?"
                secondaryMessage="Reis tot 15 maart 2021 alleen noodzakelijk">
                <Heading
                    as='h2'
                    sx={{
                        fontWeight: 200,
                        paddingTop: '24px'
                    }}>
                    Doe de check voor corona-richtlijnen en tips voor je thuisquarantaine.
                </Heading>
                <Link href='/advice'>
                    <Button
                        sx={{
                            width: '100%',
                            padding: '0.8em',
                            marginTop: '1em',
                            fontSize: '1.2em',
                            fontFamily: 'body',
                            fontWeight: 'bold',
                            backgroundColor: 'button'
                        }}>Doe de check</Button>
                </Link>
            </LandingHeader>
            <AnchorLink anchor="privacy">
                Je privacy is altijd beschermd
            </AnchorLink>
            <AnchorLink anchor="snel">
                Binnen 2 minuten resultaat
            </AnchorLink>
            <AnchorLink anchor="actueel">
                Actuele infomatie over je bestemming en thuiskomst
            </AnchorLink>
            <AnchorLink anchor="thuis-quarantaine">
                We helpen je met je thuisquarantaine
            </AnchorLink>

            <Panel>
                <h3>Zo gaan we om met jouw gegevens:</h3>
                <ListElement symbolFile="Privacy Protection.svg">
                    Niemand weet wie je bent. Het invullen is volledig anoniem.
                </ListElement>
                <ListElement symbolFile="Privacy Protection.svg">
                    We slaan geen reisgegevens op.
                </ListElement>
                <ListElement symbolFile="Privacy Protection.svg">
                    We houden alleen bij welke ondedelen je bezoekt, zodat we deze website kunnen verbeteren.
                </ListElement>

                <InternalLink href="/">
                    Meer informatie
                </InternalLink>
            </Panel>
            <Container
                sx={{
                    padding: '1em',
                    p: { color: 'header' },
                    h3: { color: 'header' },
                    h6: { color: 'header' },

                    div: {
                        textAlign: 'center'
                    }
                }}>
                <div>
                    <Image src="/images/Illustratie_Neem het virus niet meeRetina.svg" />
                </div>
                <h6>Waarom is dit belangrijk</h6>
                <h3>Neem uit het buitenland het virus niet mee naar huis</h3>
                <p>
                    Wanneer je besmet raakt in het buitenland, kun je thuis anderen besmetten. Dit kan ook een andere variant zijn van het virus. Deze check helpt je de juiste keuzes te maken voor, tijdens en na je reis.
                </p>

                <div>
                    <Image src="/images/Illustratie_De situatie op bestemmingRetina.svg" />
                </div>
                <h6>Hoe werkt het?</h6>
                <h3>Ontdek de situatie op je bestemming</h3>
                <p>
                    Op basis van je reisgegevens kijken we naar de actuele situatie op je bestemming. Zo kunnen we direct vertellen waar je rekening mee moet houden.
                </p>

                <div>
                    <Image src="/images/Illustratie_Mobiel_We vertellen je hoe het zitRetina.svg" />
                </div>
                <h6>Het resultaat</h6>
                <h3>We vertellen je precies hoe het zit</h3>
                <p>
                    Na de check weet je welke richtlijnen bekend zijn voor je reisbestemming en wat je moet doen als je thuiskomt.
                </p>

                <div>
                    <Image src="/images/Illustratie_We helpen je op wegRetina.svg" />
                </div>
                <h6>Het resultaat</h6>
                <h3>We helpen je op weg</h3>
                <p>
                    Ben je tijdens je reis in een gebied geweest met eenoranje reisadvies? Vaak moet je dan na terugkomst 10 dagen in thuisquarantaine. We helpen je met tips om deze periode goed door te komen.
                </p>

            </Container>

            <Footer/>
        </>
    );
}

export default Home;
