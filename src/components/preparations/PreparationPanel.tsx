/** @jsx jsx */
import { jsx, Container, Image } from 'theme-ui';

type PreparationPanelProps = {
    text: string,
    image: string,
    children?: React.ReactNode
}

const PreparationPanel = (props: PreparationPanelProps) => {
    return (
        <Container>
            <Image src={props.image} />
            <h2>{props.text}</h2>
            <Container>
                {props.children}
            </Container>
        </Container>
    );
}

export default PreparationPanel;