/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';

const withIcon = (WrappedComponent: React.ComponentType,
                  symbolFile: string,
                  symbolSize: string = '1em',
                  verticalShift: string = '0.4em') => {
    return (props: any) => {
        return (
            <Container sx= {{
                padding: '0 1em',
                '::before': {
                    display: 'block',
                    content: '""',
                    backgroundImage: `url("${symbolFile}")`,
                    backgroundSize: `${symbolSize} ${symbolSize}`,//'0.7em 0.7em',
                    float: 'left',
                    height: symbolSize,
                    width: symbolSize,
                    marginTop: verticalShift,
                    marginLeft: '-1em'
                }
            }}>
                <WrappedComponent {...props} />
            </Container>
        );
    }
};

type LinkProps = {
    href?: string,
    children?: React.ReactNode,
};

const AnchorLink = (props: LinkProps) => {
    return (
        <a href={`#${props.href}`}
           sx={{
               display: 'inline-block',
               paddingLeft: '0.5em',
               lineHeight: '1.3em',
               paddingBottom: '0.8em',
               fontSize: '14pt',
               fontWeight: 'bold'
           }}>
            { props.children }
        </a>
    );
};

const SafetyInfo = (props: any) => {
    return (
        <Container sx={{
            fontSize: '14pt',
            paddingBottom: '1.3em',
            lineHeight: '1.3em',
            marginLeft: '1.7em',
            width: '90%'
        }}>
            { props.children }
        </Container>
    );
}

const InternalLink = (props: LinkProps) => {
    return (
        <a href={`${props.href}`}
           sx={{
               display: 'inline-block',
               paddingLeft: '0.2em',
               lineHeight: '1.3em',
               paddingBottom: '0.8em',
               fontSize: '14pt',
               textDecoration: 'none',
               textAlign: 'center'
           }}>
            { props.children }
        </a>
    );
}


export const AnchorLinkItem = withIcon(AnchorLink, '/icons/Anker arrow.svg', '14px');
export const SafetyInfoItem = withIcon(SafetyInfo, '/icons/Privacy Protection.svg', '35px', '0.1em');
export const InternalLinkItem = withIcon(InternalLink, '/icons/Link Arrow.svg', '14px', '0.3em');
