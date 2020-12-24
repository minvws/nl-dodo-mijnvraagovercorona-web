/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type AnchorLinkProps = {
    anchor: string,
    children: React.ReactNode
}

const AnchorLink = (props: AnchorLinkProps) => {
    return (
        <a
            href={`#${props.anchor}`}
            sx={{
                display: 'block',
                paddingLeft: '1em',
                paddingTop: '1em',
                fontSize: 20,
                color: 'internalLink',
                '::before': {
                    display: 'block',
                    content: '""',
                    backgroundImage: 'url("/icons/Anker arrow.svg")',
                    backgroundSize: '0.7em 0.7em',
                    float: 'left',
                    height: '0.7em',
                    width: '0.7em',
                    marginTop: '0.3em',
                    marginRight: '0.5em'
                }
            }}>
            { props.children }
        </a>
    );
};

export default AnchorLink;
