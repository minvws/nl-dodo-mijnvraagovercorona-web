/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@reach/disclosure";

type ExpansionPanelProps = {
    phrase: string,
    children?: React.ReactNode
};

const ExpansionPanel = (props: ExpansionPanelProps) => {
    return (
        <Container>
            <Disclosure>
                <DisclosureButton>{props.phrase}</DisclosureButton>
                <DisclosurePanel>
                    {props.children}
                </DisclosurePanel>
            </Disclosure>
        </Container>
    );
}

export default ExpansionPanel;