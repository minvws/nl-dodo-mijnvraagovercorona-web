/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';

type BodyContainerProps = {
    children: React.ReactNode
};

const BodyContainer = (props: BodyContainerProps) => {
    return (
        <Container sx={{
            width: ['100%', '1024px'],
            padding: ['1em', 0]
        }}>
          { props.children }
        </Container>
    )
};

export default BodyContainer;
