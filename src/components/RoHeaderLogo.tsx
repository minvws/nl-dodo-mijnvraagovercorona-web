/** @jsx jsx */
import React from 'react';
import { Image, Link, Container, ThemeUICSSObject, jsx } from 'theme-ui';

type RoHeaderLogoProps = {
    align?: string,
    children?: React.ReactNode
};

const RoHeaderLogo = (props: RoHeaderLogoProps) => {
    const containerStyle: ThemeUICSSObject
    = (props.align && props.align === 'center') ?
                  {
                      textAlign: "center",
                      marginTop: '-1em'
                  } : {
                      textAlign: "right",
                      paddingRight: '1em',
                      marginTop: '-1em'
                  };
    return (
        <Container
            sx={containerStyle}>
            <Link href="/">
                <Image
                    width="67px"
                    height="100px"
                    src='/icons/RO logo.svg' />
                {props.children}
            </Link>
        </Container>
    );
};

export default RoHeaderLogo;
