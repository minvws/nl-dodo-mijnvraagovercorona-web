/** @jsx jsx */
import React from 'react';
import { Link, Button, jsx } from 'theme-ui';

const StartCheckButton = () => {
    return (
        <Link href='/advice'>
            <Button
                sx={{
                    width: ['100%', '25%'],
                    padding: '0.8em',
                    marginTop: '1.2em',
                    marginBottom: '1em',
                    fontSize: '1.2em',
                    fontFamily: 'body',
                    fontWeight: 'bold',
                    backgroundColor: 'button'
                }}>Doe de check</Button>
        </Link>
    );
};

export default StartCheckButton;
