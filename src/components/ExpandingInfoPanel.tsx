/** @jsx jsx */
import React from 'react';
import { Container, Text, Image, jsx } from 'theme-ui';

type InfoPanelProps = {
    title: string
}

const ExpandingInfoPanel = ({title}: InfoPanelProps) => {
    return (
        <Container
        sx={{
            fontSize: '1.1em',
            fontFamily: 'body',
            color: 'headerText',
            margin: '1em'
        }}>
        <Text>
            <Image src="/icons/Button Arrow.svg" />
            <span sx={{
                textDecoration: 'underline',
                fontWeight: 400
            }}>{title}</span>
        </Text>
        </Container>
    );
}

export default ExpandingInfoPanel;
