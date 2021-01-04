/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';
import ContentPageHeader from 'components/ContentPageHeader';
import BodyContainer from 'components/BodyContainer';
import DataProtectionPanel from 'components/DataProtectionPanel'
import Footer from 'components/content/Footer';

type ContentPageProps = {
    title: string,
    titleImage?: string,
    children: React.ReactNode
}

const ContentPage = (props: ContentPageProps) => {
    return (
        <>
            <ContentPageHeader message={props.title} backgroundImage={props.titleImage} />

            <BodyContainer>
                <Container sx={{
                    paddingLeft: ['paddingMobile', 0],
                    paddingRight: ['paddingMobile', 0]
                }}>
                    { props.children }
                </Container>
            </BodyContainer>
            <DataProtectionPanel onlyDesktop={true} />
            <Footer />
        </>
    );
};

export default ContentPage;
