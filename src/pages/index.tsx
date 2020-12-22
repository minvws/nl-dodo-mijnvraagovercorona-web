/** @jsx jsx */
import { jsx } from 'theme-ui';
import LandingHeader from '../components/LandingHeader';
import ExpandingInfoPanel from '../components/ExpandingInfoPanel';

const Home = () => {
    return (
        <>
            <LandingHeader />
            <ExpandingInfoPanel
                title="Je privacy is altijd beschermd" />
            <ExpandingInfoPanel
                title="Binnen 2 minuten resultaat" />
            <ExpandingInfoPanel
                title="Actuele informatie over je bestemming en thuiskomst" />
            <ExpandingInfoPanel
                title="We helpen je met je thuisquarantaine" />
        </>
    );
}

export default Home;
