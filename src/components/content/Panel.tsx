/** @jsx jsx */
import React from 'react';
import { Box, jsx } from 'theme-ui';

type PanelProps = {
    children: React.ReactNode
}

const Panel = (props: PanelProps) => {
    return (
        <Box
            sx={{
                borderRadius: '5px',
                boxShadow: '1px 1px 3px 3px #eee',
                margin: '1em',
                padding: '1em'
            }}>
        { props.children }
        </Box>
    );
};

export default Panel;
