/** @jsx jsx */
import { jsx, Container, Link, Image } from 'theme-ui';
import ContentPageHeader from '../../components/ContentPageHeader';
import PreparationPanel from '../../components/preparations/PreparationPanel';
import PreparationPanelListItem from '../../components/preparations/PreparationPanelListItem';
import Footer from '../../components/content/Footer';

const PreparationsPage = () => {
    return (
        <>
            <ContentPageHeader message="Wat moet je regelen voor het thuisblijven?" backgroundImage="/images/Banner_we_helpen_jeRetina.svg">
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
            </ContentPageHeader>

            <Container>
                <span>Bewaar deze pagina bij je favorieten zodat je hem later nog eens kunt bekijken</span>

                <PreparationPanel
                    text="Heb je genoeg eten en drinken in huis voor 10 dagen?"
                    image="/images/Illustratie_De_situatie_op_bestemmingRetina.svg"
                >
                    <ul>
                        <PreparationPanelListItem
                            text="Vraag familie, vrienden of buren om boodschappen voor je te doen"
                        />
                        <PreparationPanelListItem
                            text="Bestel je boodschappen online"
                            subtext="Bijna alle supermarketen bezorgen boodschappen. Ook kun je in sommige regio's rechtstreeks bij de boer bestellen."
                        />
                        <PreparationPanelListItem
                            text="Bestel dierenvoeding online"
                            subtext="Bijna alle supermarkten verkopen basisproducten voor huisdieren. En de meeste dierspeciaalzaken hebben een online shop."
                        />
                    </ul>
                </PreparationPanel>
                <PreparationPanel
                    text="Kun je 10 dagen thuiswerken?"
                    image="/images/Illustratie_ThuiswerkenRetina.svg"
                >
                    <ul>
                        <PreparationPanelListItem
                            text="Overleg met je baas"
                            subtext="Kijk of je werk (tijdelijk) anders in kunt richten zodat je thuis kunt werken. Kun je tijdelijk met een collega ruilen?"
                        />
                        <PreparationPanelListItem
                            text="Zorg voor een fijne werkplek"
                            subtext="Vraag je werkgever of je een stoel of monitor kunt lenen. Ook een goede koptelefoon kan helpen om je thuis goed te kunnen concentreren."
                        />
                        <PreparationPanelListItem
                            text="Regel een oefendag"
                            subtext="Controleer of al je programma's werken en of je toegang hebt tot alle bestanden."
                        />
                    </ul>
                </PreparationPanel>
                <PreparationPanel
                    text="Is alles geregeld voor de jonge kinderen?"
                    image="/images/Illustratie_Is_alles_geregeld_voor_kinderenRetina.svg"
                >
                    <p>
                    Kinderen t/m 12 jaar mogen niet naar de opvang, school en bso. Ook mogen ze niet deelnemen aan binnenactiviteiten, waaronder sport.
                    </p>
                    <ul>
                        <PreparationPanelListItem
                            text="Buitenspelen en -sporten"
                            subtext="Zolang je kind geen klachten heeft mogen ze wel buitenspelen en buitensporten. Contact houden met vrienden en klasgenoten is belangrijk."
                        />
                        <PreparationPanelListItem
                            text="Regel een fijne plek voor je kind om huiswerk te maken"
                            subtext="Zorg voor een rustige omgeving waar ze zich goed kunnen concentreren."
                        />
                        <PreparationPanelListItem
                            text="Buren of ouders van klasgenootjes"
                            subtext="Heb je geen contactgegevens? Vraag de opvang of school of zij kunnen helpen contact te leggen met andere ouders."
                        />
                    </ul>
                </PreparationPanel>
                <PreparationPanel
                    text="Is alles geregeld voor de oudere kinderen?"
                    image="/images/Illustratie_Oudere_kinderenRetina.svg"
                >
                    <p>
                        Jongeren van 13 t/m 17 jaar mogen net als volwassenen niet naar school of gaan sporten.
                    </p>
                    <ul>
                        <PreparationPanelListItem
                            text="Regel een fijne studeerplek voor je kind"
                            subtext="Heb je geen laptop of computer? Vaak kun je er via school één lenen om online les te volgen."
                        />
                        <PreparationPanelListItem
                            text="Regel andere manier van contact met vrienden"
                            subtext="Organiseer een video-call met vrienden of speel een online game. Contact houden met vrienden en klasgenoten is belangrijk."
                        />
                        <PreparationPanelListItem
                            text="Virtueel sporten"
                            subtext="Een trainer wil mogelijk meedenken over oefeningen die in de tuin, op het balkon of in de woonkamer gedaan kunnen worden."
                        />
                    </ul>
                </PreparationPanel>
                <PreparationPanel
                    text="Is je medicijnvoorraad op orde? Weet je wie je moet bellen als er iets misgaat?"
                    image="/images/Illustratie_MedicijnenRetina.svg"
                >
                    <ul>
                        <PreparationPanelListItem
                            text="Laat de apotheek je medicijnen bezorgen"
                            subtext=" Elke apotheek heeft een bezorgdienst. Je kunt de apotheek daarom altijd bellen en hierom vragen."
                        />
                        <PreparationPanelListItem
                            text="Verzamel alle telefoonnummers van je zorgverleners"
                            subtext="Zorg dat je weet wie je kunt bellen als er iets gebeurt. Vaak kan het telefonisch worden opgelost."
                        />
                    </ul>
                </PreparationPanel>
                <PreparationPanel
                    text="Wat ga je doen met je bezoek?"
                    image="/images/Illustratie_BezoekRetina.svg"
                >
                    <ul>
                        <PreparationPanelListItem
                            text="Spreek online af met familie en vrienden"
                            subtext="Ook zonder dat je op bezoek kan zijn er allerlei mogelijkheden om af te spreken. Denk aan videobellen of via de computer."
                        />
                        <PreparationPanelListItem
                            text="Daag je vrienden of familie uit voor een online spel"
                            subtext="Een online escaperoom, samen bridgen of Fortnite. Het maakt niet uit wat jullie leuk vinden. Er is voor iedereen wat."
                        />
                        <PreparationPanelListItem
                            text="Ga naar de thuisbioscoop"
                            subtext="Veel bioscopen en filmaanbieders bieden de mogelijkheid om gratis thuis film te kijken. Bestel je popcorn online en ga maar lekker zitten!"
                        />
                    </ul>
                </PreparationPanel>
                 <PreparationPanel
                     text="Hoe zorg je voor voldoende beweging en ontspanning?"
                     image="/images/Illustratie_BewegingRetina.svg"
                 >
                     <ul>
                         <PreparationPanelListItem
                             text="Online fitness of yoga"
                             subtext="Op YouTube staan een heleboel oefeningen. En er bestaan platforms waar je een abonnement kunt afsluiten voor online les."
                         />
                         <PreparationPanelListItem
                             text="Sporten via de spelcomputer"
                             subtext="Tennissen, dansen of voetballen, zolang het je even afleidt van het thuisblijven, telt het allemaal mee."
                         />
                         <PreparationPanelListItem
                             text="Maak van je huis een sportschool"
                             subtext="Met lege flessen gevuld met water kun je gewichtheffen, een trap is een mooie step. Doe allemaal mee!"
                         />
                     </ul>
                 </PreparationPanel>
                 <PreparationPanel
                     text="Heb je alles geregeld voor je hond?"
                     image=""
                 >
                     <ul>
                         <PreparationPanelListItem
                             text="Vraag familie of vrienden om de hond uit te laten"
                             subtext="Zolang je 1,5m afstand houdt, hoef je je geen zorgen te maken dat familie of vrienden besmet raken als ze de hond op komen halen."
                         />
                         <PreparationPanelListItem
                             text="Mensen in de buurt die ook een hond hebben"
                             subtext="Buurtkinderen vinden het vaak heel leuk om de hond uit te laten."
                         />
                         <PreparationPanelListItem
                             text="Regel een hondenuitlaatservice"
                         />
                     </ul>
                 </PreparationPanel>
            </Container>

            <Footer />
        </>
    );
}

export default PreparationsPage;
