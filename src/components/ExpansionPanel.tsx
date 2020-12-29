/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@reach/disclosure";

type ExpansionPanelProps = {
    phrase: string,
    children?: React.ReactNode
};

const ExpansionPanel = (props: ExpansionPanelProps) => {
    return (
        <Container sx={{paddingTop: '0.5em', paddingBottom: '0.5em'}}>
            <Disclosure>
                <DisclosureButton sx={{
                    background: 'none',
                    border: 'none',
                    fontFamily: 'body',
                    fontSize: '14pt',
                    paddingLeft: 0,
                    paddingRight: '1.9em',
                    lineHeight: '1.8e',
                    textAlign: 'left',
                    width: '100%',
                    backgroundImage: 'url("/icons/FAQ Arrow.svg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: 'right',
                    backgroundPositionY: 'center'
                }}>{props.phrase}</DisclosureButton>
                <DisclosurePanel>
                    {props.children}
                </DisclosurePanel>
            </Disclosure>
        </Container>
    );
}

export default ExpansionPanel;
