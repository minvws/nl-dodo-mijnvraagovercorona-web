/** @jsx jsx */
import { Container, Input, jsx } from 'theme-ui';
import AdviceHeader from '../../components/advice/AdviceHeader';
import DestinationSearch from '../../components/advice/DestinationSearch';
import ExpandingInfoPanel from '../../components/ExpandingInfoPanel';

const Destination = () => {
    return (
        <>
            <AdviceHeader
                header="Wat is of was je bestemming?"
                questionStage={1}
                totalStages={2}>
                <ExpandingInfoPanel title="Waarom vragen we dit?" />
            </AdviceHeader>
            <Container
                sx={{
                    padding: '1em'
                }}>
                <DestinationSearch />
            </Container>
        </>
    );
}

export default Destination;
