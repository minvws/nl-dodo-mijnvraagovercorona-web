/** @jsx jsx */
import { Heading, Button, Container, Image, Alert, jsx } from 'theme-ui';
import Link from 'next/link';
import ContentPageHeader from 'components/ContentPageHeader';
import ListElement from '../components/content/ListElement';
import AnchorLink from '../components/content/AnchorLink';
import InternalLink from '../components/content/InternalLink';
import Panel from '../components/content/Panel';
import CopySection from 'components/home/CopySection';
import HandleDataWidget from '../components/content/HandleDataWidget';
import Footer from '../components/content/Footer';
import { AnchorLinkItem, SafetyInfoItem, InternalLinkItem } from '../components/content/ListItems';
import { useDesktopQuery } from 'hooks/useDesktopQuery';

const Home = () => {
    const isDesktop = useDesktopQuery();

    return (
        <>
            <Alert sx={{
                backgroundColor: 'button',
                borderRadius: 0,
                fontSize: '11pt',
                backgroundImage: 'url("/icons/Union.svg")',
                backgroundRepeat: 'no-repeat',
                marginRight: 0
            }}>
                Deze site is nog in de testfase. Deel je ervaring met de knop 'feedback'
            </Alert>
            <ContentPageHeader
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
                            width: ['100%', '25%'],
                            padding: '0.8em',
                            marginTop: '1.2em',
                            marginBottom: '1em',
                            fontSize: '1.2em',
                            fontFamily: 'body',
                            fontWeight: 'bold',
                            backgroundColor: 'button'
                        }}>Doe de check</Button>
                </Link>
            </ContentPageHeader>

            <Container sx={{
                marginTop: '2em',
                marginBottom: '1em',
                paddingLeft: ['1em', 0],
                width: '100%'
            }}>
                <div sx={{
                    display: 'grid',
                    gridTemplateColumns: ['1fr', '1fr 1fr 1fr 1fr'],
                    paddingLeft: [0, '2em']
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
                </div>
            </Container>
            <Container sx={{
                width: ['100%', '1024px'],
                padding: ['1em', 0]
            }}>

                <HandleDataWidget />

                <Container
                    sx={{
                        paddingTop: '3em',
                        margin: '1em',
                        color: 'header',
                        p: {
                            fontSize: '16pt',
                            marginBottom: '2em',
                            lineHeight: '1.5em',
                            marginRight: '1.3em'
                        },
                        h3: {
                            margin: '0.1em 0',
                            fontSize: '24pt'
                        },
                        h6: {
                            fontSize: '14pt',
                            margin: '1.4em 0 0.5em 0'
                        },
                        img: {
                            marginLeft: '-2.2em'
                        }
                    }}>
                    <CopySection imageUrl="/images/Illustratie_Neem_het_virus_niet_meeRetina.svg"
                                 imageAlignment="right">
                        <h6>Waarom is dit belangrijk?</h6>
                        <h3>Neem uit het buitenland het virus niet mee naar huis</h3>
                        <p>
                            Wanneer je besmet raakt in het buitenland, kun je thuis anderen besmetten. Dit kan ook een andere variant zijn van het virus. Deze check helpt je de juiste keuzes te maken voor, tijdens en na je reis.
                        </p>
                    </CopySection>
                    <CopySection imageUrl="/images/Illustratie_De_situatie_op_bestemmingRetina.svg"
                                 imageAlignment="left">
                        <h6>Hoe werkt het?</h6>
                        <h3>Ontdek de situatie op je bestemming</h3>
                        <p>
                            Op basis van je reisgegevens kijken we naar de actuele situatie op je bestemming. Zo kunnen we direct vertellen waar je rekening mee moet houden.
                        </p>
                    </CopySection>
                    <CopySection imageUrl="/images/Illustratie_Mobiel_We_vertellen_je_hoe_het_zitRetina.svg"
                                 imageAlignment="right">
                        <h6>Het resultaat</h6>
                        <h3>We vertellen je precies hoe het zit</h3>
                        <p>
                            Na de check weet je welke richtlijnen bekend zijn voor je reisbestemming, wat je moet regelen voor je terugreis en thuiskomst.
                        </p>
                    </CopySection>
                    <CopySection imageUrl="/images/Illustratie_We_helpen_je_op_wegRetina.svg"
                                 imageAlignment="left">
                        <h6>Het resultaat</h6>
                        <h3>We helpen je op weg</h3>
                        <p>
                            Ben je tijdens je reis in een gebied geweest met een oranje reisadvies? Vaak heb je voor je terugreis een negaieve testuitslag en verklaring nodig en moet je bij thuiskomst 10 dagen in thuisquarantaine. We helpen je met informatie en tips om alles goed te regelen.
                        </p>
                    </CopySection>

                </Container>
            </Container>

            <Footer/>
        </>
    );
}

export default Home;
