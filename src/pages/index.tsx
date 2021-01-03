/** @jsx jsx */
import { Styled, Container, Alert, jsx } from 'theme-ui';
import ContentPageHeader from 'components/ContentPageHeader';
import StartCheckButton from 'components/home/StartCheckButton';
import HomePageNavigation from 'components/home/HomePageNavigation';
import BodyContainer from 'components/BodyContainer';
import CopySection from 'components/home/CopySection';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from '../components/content/Footer';
import { useDesktopQuery } from 'hooks/useDesktopQuery';

const Home = () => {
    const isDesktop = useDesktopQuery();

    return (
        <>
            <Alert sx={{
                paddingBottom: '5px',
                margin: 0,
                backgroundColor: 'button',
                borderRadius: 0,
                fontSize: '14px'
            }}>
                <p sx={{marginTop: '-3px'}}>Deze site is nog in de testfase. Deel je ervaring met de knop 'feedback'</p>
            </Alert>
            <ContentPageHeader
                message="Wat als je toch naar het buitenland gaat?"
                secondaryMessage="Reis tot 15 maart 2021 alleen noodzakelijk">
                <h2
                    sx={{
                        fontWeight: 'lighter',
                        width: ['80%', '549px'],
                        fontSize: '26px',
                        marginTop: 0,
                        marginBottom: ['28px', '23px'],
                        letterSpacint: '0.00265em'
                    }}>
                    Doe de check voor corona-richtlijnen en tips voor je thuisquarantaine.
                </h2>
                <StartCheckButton />
            </ContentPageHeader>

            <HomePageNavigation />

           <BodyContainer>
                <DataProtectionPanel />
                <CopySection />
            </BodyContainer>

            <Footer/>
        </>
    );
}

export default Home;
