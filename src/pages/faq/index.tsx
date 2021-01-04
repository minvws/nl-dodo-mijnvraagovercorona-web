/** @jsx jsx */
import { jsx, Container, Link } from 'theme-ui';
import { Disclosure, DisclosureButton, DisclosurePanel } from "@reach/disclosure";
import FaqList from 'components/faq/FaqList';
import BodyContainer from 'components/structure/BodyContainer';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';

const FAQ = () => {
    return (
        <>
            <ContentPageHeader message="Veelgestelde vragen" backgroundImage="/images/Illustratie_Mobiel_Veelgestelde_vragenRetina.svg">
                <Link href="/advice" sx={{
                    position: 'absolute',
                    top: '20px',
                    textDecoration: 'none',
                    fontFamily: 'body',
                    verticalAlign: 'top',
                    '::before': {
                        display: 'block',
                        content: '""',
                        backgroundImage: `url("/icons/Refresh.svg")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '1.5em 1.5em',
                        float: 'left',
                        height: '1.5em',
                        width: '1.5em',
                        paddingRight: '0.5em'
                    }
                }}>
                    naar resultaat
                </Link>
                <div sx={{
                    marginBottom: '3em'
                }}></div>
            </ContentPageHeader>

            <BodyContainer>
                <Container sx={{
                    paddingLeft: ['mobilePadding', 0],
                    paddingRight: ['mobilePadding', 0]
                }}>
                    <FaqList />
                </Container>
            </BodyContainer>
            <DataProtectionPanel onlyDesktop={true} />
            <Footer />
        </>
    );
}

export default FAQ;
