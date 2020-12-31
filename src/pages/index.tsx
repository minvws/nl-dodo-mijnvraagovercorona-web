/** @jsx jsx */
import { Heading, Container, Alert, jsx } from 'theme-ui';
import Link from 'next/link';
import ContentPageHeader from 'components/ContentPageHeader';
import StartCheckButton from 'components/home/StartCheckButton';
import HomePageNavigation from 'components/home/HomePageNavigation';
import BodyContainer from 'components/BodyContainer';
import CopySection from 'components/home/CopySection';
import HandleDataWidget from '../components/content/HandleDataWidget';
import Footer from '../components/content/Footer';
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
                <StartCheckButton />
            </ContentPageHeader>

            <HomePageNavigation />
            <BodyContainer>
                <HandleDataWidget />
                <CopySection />
            </BodyContainer>

            <Footer/>
        </>
    );
}

export default Home;
