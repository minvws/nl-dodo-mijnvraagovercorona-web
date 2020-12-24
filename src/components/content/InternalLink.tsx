/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import Link from 'next/link';

type InternalLinkProps = {
    href: string,
    children: React.ReactNode
}

const InternalLink = (props: InternalLinkProps) => {
    return (
        <Link href={props.href}>
            <a
                sx={{
                    display: 'block',
                    paddingTop: '1em',
                    fontSize: 20,
                    color: 'internalLink',
                    '::before': {
                        display: 'block',
                        content: '""',
                        backgroundImage: 'url("/icons/Link Arrow.svg")',
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
        </Link>
    );
};

export default InternalLink;
