/** @jsx jsx */
import React from 'react';
import { Container,  ThemeUICSSObject, jsx } from 'theme-ui';

type BodyContainerProps = {
    sx?: ThemeUICSSObject,
    children: React.ReactNode
};

const BodyContainer = (props: BodyContainerProps) => {
    return (
        <Container sx={{
            paddingRight: ['auto', '300px', '400px']
        }}>
            <Container sx={{
                width: 'bodyContainer',
                ...props.sx
            }}>
                { props.children }
            </Container>
        </Container>
    )
};

export default BodyContainer;
