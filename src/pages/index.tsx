/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import LandingHeader from '../components/LandingHeader';
import ExpandingInfoPanel from '../components/ExpandingInfoPanel';

const Home = () => {
    return (
        <>
            <LandingHeader />
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
