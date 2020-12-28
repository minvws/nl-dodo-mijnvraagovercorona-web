/** @jsx jsx */
import React from 'react';
import Link from 'next/link';
import { Heading, Container, jsx } from 'theme-ui';
import RoHeaderLogo from '../components/RoHeaderLogo';

type LandingHeaderProps = {
    message: string,
    secondaryMessage?: string,
    children?: React.ReactNode
}

const LandingHeader = (props: LandingHeaderProps) => {
    return (
        <header
            sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'header',
                color: 'header',
                padding: '1em',
                backgroundImage: 'url("/images/Koffer_MobielRetina.svg")',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right top'
            }}>
            <RoHeaderLogo align='center'/>
            <Container>
                { props.secondaryMessage &&
                  <Heading as='h4'
                           sx={{
                               paddingTop: '24px',
                               width: '50%'
                           }}>
                      {props.secondaryMessage}
                  </Heading>
                }

                <Heading as='h1'
                         sx={{
                             fontSize: 36,
                             paddingTop: '24px',
                             width: '80%'
                         }}>
                    { props.message }
                </Heading>
                { props.children }
            </Container>
        </header>
    );
};

export default LandingHeader;
