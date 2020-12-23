/** @jsx jsx */
import React from 'react';
import Link from 'next/link';
import { Heading, Image, Container, Button, jsx } from 'theme-ui';
import RoHeaderLogo from '../components/RoHeaderLogo';

const LandingHeader = () => {
    return (
        <header
            sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'header',
                color: 'header',
                padding: '1em'
            }}>
            <RoHeaderLogo><></></RoHeaderLogo>
            <Container
                sx={{
                    paddingTop: '24px'
                }}>
                <Image
                    sx={{
                        float: 'right',
                        marginTop: '-115px',
                        marginRight: '-1em'
                    }}
                    src='/images/Koffer_MobielRetina.svg' />
                <Heading as='h4'
                         sx={{
                             width: '50%'
                         }}>
                    Reis tot 15 maart 2021 alleen noodzakelijk
                </Heading>
                <Heading as='h1'
                         sx={{
                             fontSize: 36,
                             paddingTop: '24px'
                         }}>
                    Wat als je toch naar het buitenland gaat?
                </Heading>
                <Heading
                    as='h2'
                    sx={{
                        fontWeight: 200,
                        paddingTop: '24px'
                    }}>
                    Doe de check voor corona-richtlijnen en tips voor je thuisquarantaine.
                </Heading>
            </Container>
            <Container>
                <Link href='/advice'>
                    <Button
                        sx={{
                            width: '100%',
                            padding: '0.8em',
                            marginTop: '1em',
                            fontSize: '1.2em',
                            fontFamily: 'body',
                            fontWieght: 'bold',
                            backgroundColor: 'button'
                        }}>Doe de check</Button>

                </Link>
            </Container>
        </header>
    );
};

export default LandingHeader;
