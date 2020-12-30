/** @jsx jsx */
import { jsx, Container } from 'theme-ui';
import Panel from './Panel';
import { SafetyInfoItem, InternalLinkItem } from './ListItems';

const HandleDataWidget = () => {
    return (
            <Panel>
                <h3 sx={{
                    fontSize: '20pt',
                    color: 'secondaryHeader'
                }}>Zo gaan we om met jouw gegevens:</h3>
                <Container>
                    <SafetyInfoItem>
                        Niemand weet wie je bent. Het invullen is volledig anoniem.
                    </SafetyInfoItem>
                    <SafetyInfoItem>
                        We slaan geen reisgegevens op.
                    </SafetyInfoItem>
                    <SafetyInfoItem>
                        We houden alleen bij welke ondedelen je bezoekt, zodat we deze website kunnen verbeteren.
                    </SafetyInfoItem>
                </Container>

                <Container sx={{
                    paddingLeft: '3em',
                    paddingBottom: '0.5em'
                }}>
                    <InternalLinkItem href="/">
                        Meer informatie
                    </InternalLinkItem>
                </Container>
            </Panel>
    );
}

export default HandleDataWidget;