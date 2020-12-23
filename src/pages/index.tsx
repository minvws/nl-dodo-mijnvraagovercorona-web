/** @jsx jsx */
import { Heading, Button, Container, jsx } from 'theme-ui';
import Link from 'next/link';
import LandingHeader from '../components/LandingHeader';
import ExpandingInfoPanel from '../components/ExpandingInfoPanel';

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
                            fontWieght: 'bold',
                            backgroundColor: 'button'
                        }}>Doe de check</Button>
                </Link>
            </LandingHeader>
            <Container
                sx={{
                    margin: '1em'
                }}>
                <ExpandingInfoPanel
                    title="Je privacy is altijd beschermd" />
                <ExpandingInfoPanel
                    title="Binnen 2 minuten resultaat" />
                <ExpandingInfoPanel
                    title="Actuele informatie over je bestemming en thuiskomst" />
                <ExpandingInfoPanel
                    title="We helpen je met je thuisquarantaine" />
            </Container>
        </>
    );
}

export default Home;
