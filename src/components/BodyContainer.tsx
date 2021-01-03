/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';

type BodyContainerProps = {
    children: React.ReactNode
};

const BodyContainer = (props: BodyContainerProps) => {
    return (
        <Container sx={{
            paddingRight: ['auto', '300px', '400px']
        }}>
            <Container sx={{
                width: 'bodyContainer'
            }}>
                { props.children }
            </Container>
        </Container>
    )
};

export default BodyContainer;
