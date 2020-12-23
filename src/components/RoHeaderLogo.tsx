/** @jsx jsx */
import React from 'react';
import { Image, Container, jsx } from 'theme-ui';

type RoHeaderLogoProps = {
    align?: string,
    children?: React.ReactNode
};

const RoHeaderLogo = ({align = 'center', children}) => {
    const containerStyle = align === 'center' ?
                  {
                      textAlign: 'center',
                      marginTop: '-1em'
                  } : {
                      textAlign: 'right',
                      marginTop: '-1em'
                  };
    const imageStyle = align === 'center' ? {} :
                  {

                  };
    return (
        <Container
            sx={containerStyle}>
            <Image
                sx={imageStyle}
                src='/icons/RO logo.svg' />
            {children}
        </Container>
    );
};

export default RoHeaderLogo;
