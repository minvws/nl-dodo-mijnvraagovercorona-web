/** @jsx jsx */
import React from 'react';
import Link from 'next/link';
import { Styled, Heading, Container, jsx} from 'theme-ui';
import { useDesktopQuery } from 'hooks/useDesktopQuery';
import RoHeaderLogo from 'components/structure/RoHeaderLogo';

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
        color: 'header',
        backgroundImage: 'none',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right top',
        paddingBottom: ['33px', '31px'],
        paddingRight: ['auto', '300px', '400px']
    };
    if (!isDesktop) {
        const bgImg = `url("${props.backgroundImage || "/images/Koffer_MobielRetina.svg"}")`;
        headerStyles.backgroundImage = bgImg;
    }
    return (
        <header
            sx={headerStyles}>
            <RoHeaderLogo align='center'/>
            <Container sx={{
                maxWidth: 'maxWidthBody',
                paddingLeft: ['mobilePadding', 0],
                paddingRight: ['mobilePadding', 0],
                paddingTop: [0]
            }}>
                { props.secondaryMessage &&
                  <p sx={{
                      fontSize: 'chapeau',
                      fontFamily: 'heading',
                      fontWeight: 'bold',
                      marginTop: ['26px', '42px'],
                      maxWidth: '55%'
                  }}>
                      {props.secondaryMessage}
                  </p>
                }

                <Styled.h1
                    sx={{
                        marginTop: ['18px', '25px'],
                        marginBottom: ['14px', '16px'],
                        width: ['80%', '60%']
                    }}>
                    { props.message }
                </Styled.h1>
                { props.children }
            </Container>
        </header>
    );
};

export default ContentPageHeader;
