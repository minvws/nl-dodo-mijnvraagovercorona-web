/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

type AnchorLinkProps = {
    anchor: string,
    children: React.ReactNode
}

const AnchorLink = (props: AnchorLinkProps) => {
    return (
        <div
            sx={{
                display: 'block',
                paddingTop: '1em',
                fontSize: 20,
                color: 'internalLink',
                '::before': {
                    display: 'inline-block',
                    content: '""',
                    backgroundImage: 'url("/icons/Anker arrow.svg")',
                    backgroundSize: '0.7em 0.7em',
                    float: 'left',
                    height: '0.7em',
                    width: '0.7em',
                    marginTop: '0.3em',
                    marginRight: '1.5em',
                    marginLeft: '1em'
                }
            }}>
            <a href={`#${props.anchor}`}>
                { props.children }
            </a>
        </div>
    );
};

export default AnchorLink;
