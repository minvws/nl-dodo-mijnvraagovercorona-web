/** @jsx jsx */
import React from 'react';
import Link from 'next/link';
import { Heading, Image, Container, Button, jsx } from 'theme-ui';

const LandingHeader = () => {
    return (
        <header
        sx={{
            backgroundColor: 'headerBackground',
            fontFamily: 'heading',
            color: 'headerText',
            padding: '1em'
        }}>
            <Container
                sx={{
                    width: '100%',
                    margin: '-1em'
                }} >
            <Image
                src='/icons/RO logo.svg' />
            </Container>

            <Heading as='h5'>
            Reis tot 15 maart 2021 alleen noodzakelijk
            </Heading>
            <Heading as='h1'>
            Wat als je toch naar het buitenland gaat?
            </Heading>
            <Heading as='h2' sx={{fontWeight: '200'}}>
            Doe de check voor corona-richtlijnen en tips voor je thuisquarantaine.
            </Heading>
            <Container>
            <Link href='/advice'>
            <Button
                    sx={{
                        width: '100%',
                        padding: '0.8em',
                        marginTop: '1em',
                        fontSize: '1.2em'
                    }}>Doe de check</Button>

            </Link>
            </Container>
        </header>
    );
};

export default LandingHeader;
