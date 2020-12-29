/** @jsx jsx */
import { jsx, Container, Link, Image } from 'theme-ui';
import LandingHeader from '../../components/LandingHeader';
import PreparationPanel from '../../components/preparations/PreparationPanel';
import PreparationPanelListItem from '../../components/preparations/PreparationPanelListItem';
import Footer from '../../components/content/Footer';

const PreparationsPage = () => {
    return (
        <>
            <LandingHeader message="Wat moet je regelen vor het thuisblijven?" backgroundImage="/images/Banner_we_helpen_jeRetina.svg">
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
            </LandingHeader>

            <Container>
                <span>Bewaar deze pagina bij je favorieten zodad je hem later nog eens kunt bekijken</span>

                <PreparationPanel
                    text="Heb je genoeg eten en drinken in huis voor 10 dagen?"
                    image="url(/images/Illustratie_De_situatie_op_bestemmingRetina.svg)"
                >
                    <ul>
                        <PreparationPanelListItem
                            text="Vraag familie, vrienden of buren om boodschappen voor je te doen"
                        />
                        <PreparationPanelListItem
                            text="Bestel je broodscheppen online"
                            subtext="Bijna alle supermarketen bezorgen broodscheppen. Ook kun je in sommige regio's rechtstreeks bij de boer bestellen."
                        />
                        <PreparationPanelListItem
                            text="Bestel dierenvoeding online"
                            subtext="Bijna alle supermarketen verkopen basisproducten voor huisdieren. En de meeste dierspeciaalzaken hebben een online shop."
                        />
                    </ul>
                </PreparationPanel>
            </Container>

            <Footer />
        </>
    );
}

export default PreparationsPage;
