/** @jsx jsx */
import { Container, Input, jsx } from 'theme-ui';
import AdviceHeader from '../../components/advice/AdviceHeader';
import DestinationSearch from '../../components/advice/DestinationSearch';
import InternalLink from '../../components/content/InternalLink';

const Destination = () => {
    return (
        <>
            <AdviceHeader
                header="Wat is of was je bestemming?"
                questionStage={1}
                totalStages={2}>
                <InternalLink
                    href="">
                    Waarom vragen we dit?
                </InternalLink>
            </AdviceHeader>
            <DestinationSearch />
        </>
    );
}

export default Destination;
