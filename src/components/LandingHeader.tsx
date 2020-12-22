/** @jsx jsx */
import React from 'react';
import { Button, jsx } from 'theme-ui';

const LandingHeader = () => {
    return (
        <header
            sx={{
                backgroundColor: 'headerBackground',
                fontFamily: 'heading',
                color: 'headerText'
            }}>
            <h5>Reis tot 15 maart 2021 alleen noodzakelijk</h5>
            <h1>Wat als je toch naar het buitenland gaat?</h1>
            <h2 sx={{fontWeight: 'normal'}}>Doe de check voor corona-richtlijnen en tips voor je thuisquarantaine.</h2>
            <Button>Doe de check</Button>

        </header>
    )
};

export default LandingHeader;
