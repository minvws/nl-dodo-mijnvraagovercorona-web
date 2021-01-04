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
                <DisclosureButton sx={{
                    textAlign: 'left',
                    paddingLeft: 0,
                    paddingBottom: '15px',
                    paddingTop: '17px',
                    background: 'none',
                    border: 'none',
                    fontFamily: 'body',
                    fontSize: ['bodyMobile', 'body'],
                    lineHeight: ['bodyMobile', 'body'],
                    width: '100%',
                    backgroundImage: 'url("/icons/FAQ Arrow.svg")',
                    backgroundRepeat: 'no-repeat',
                    backgroundPositionX: 'right',
                    backgroundPositionY: 'center',
                    borderBottom: '1px solid #AEC1D1'
                }}>{props.text}</DisclosureButton>
                <DisclosurePanel>
                    <div sx={{
                        fontSize: ['bodyMobile', 'body'],
                        lineHeight: ['bodyMobile', 'body'],
                    }}>
                        {props.children}
                    </div>
                </DisclosurePanel>
            </Disclosure>
        </Container>
    );
}

export default ExpansionPanel;
