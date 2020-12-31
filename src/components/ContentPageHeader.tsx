/** @jsx jsx */
import React from 'react';
import Link from 'next/link';
import { Heading, Container, jsx} from 'theme-ui';
import { useDesktopQuery } from 'hooks/useDesktopQuery';
import RoHeaderLogo from '../components/RoHeaderLogo';

type ContentPageProps = {
    message: string,
    secondaryMessage?: string,
    backgroundImage?: string,
    children?: React.ReactNode
}

const ContentPageHeader = (props: ContentPageProps) => {
    const isDesktop = useDesktopQuery();

    let headerStyles = {
        backgroundColor: 'headerBackground',
        fontFamily: 'header',
        color: 'header',
        padding: 'standard'
    };
    if (!isDesktop) {
        const bgImg = `url("${props.backgroundImage || "/images/Koffer_MobielRetina.svg"}")`;
        headerStyles.backgroundImage = bgImg;
        headerStyles.backgroundRepeat = 'no-repeat';
        headerStyles.backgroundPosition = 'right top';
    }
    return (
        <header
            sx={headerStyles}>
            <RoHeaderLogo align='center'/>
            <Container sx={{
                width: ['100%', '1040px']
            }}>
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

export default ContentPageHeader;
