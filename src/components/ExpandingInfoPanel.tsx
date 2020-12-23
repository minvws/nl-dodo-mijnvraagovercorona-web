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
                color: 'header',
                paddingTop: '1em'
            }}>
            <Text>
                <Image src="/icons/Anker arrow.svg" />
                <span sx={{
                          textDecoration: 'underline',
                          fontWeight: 400,
                          paddingLeft: '0.8em',
                          fontWeight: 500
                      }}>
                    {title}
                </span>
            </Text>
        </Container>
    );
}

export default ExpandingInfoPanel;
