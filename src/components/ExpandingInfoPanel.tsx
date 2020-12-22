/** @jsx jsx */
import React from 'react';
import { Container, Text, jsx } from 'theme-ui';

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
            <span
                sx={{
                    textDecoration: 'none',
                    fontSize: '1.4em',
                    paddingRight: '0.6em',
                    fontWeight: 600
                }}
            >⌄</span>
            <span sx={{
                textDecoration: 'underline',
                fontWeight: 400
            }}>{title}</span>
        </Text>
        </Container>
    );
}

export default ExpandingInfoPanel;
