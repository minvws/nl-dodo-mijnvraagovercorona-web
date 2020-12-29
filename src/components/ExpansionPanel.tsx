/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@reach/disclosure";

type ExpansionPanelProps = {
    text: string,
    children: React.ReactNode
};

const ExpansionPanel = (props: ExpansionPanelProps) => {
    return (
        <Container>
            <Disclosure>
                <DisclosureButton>{props.text}</DisclosureButton>
                <DisclosurePanel>
                    {props.children}
                </DisclosurePanel>
            </Disclosure>
        </Container>
    );
}

export default ExpansionPanel;