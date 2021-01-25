/** @jsx jsx */
import Feedback from 'components/feedback/Feedback';
import MetaTags from 'components/meta/MetaTags';
import PreparationPanel from 'components/preparations/PreparationPanel';
import PreparationPanelListItem from 'components/preparations/PreparationPanelListItem';
import { Content, Page } from 'components/structure/Page';
import { jsx } from 'theme-ui';

const PreparationsPage = () => {
	return (
		<>
			<MetaTags
				title="Online hulpmiddel | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Online hulpmiddel met checklist voor reizigers."
				url="/voorbereiding"
			/>

			<Page
				showBackLink="result"
				title="Wat moet je regelen voor het thuisblijven?"
				illustrationUrl="/images/Illustratie_We_helpen_je_op_weg_sidebar.svg"
				illustrationMobileUrl="/images/Illustratie_Mobiel_We_helpen_je_op_weg_sidebar.svg"
			>
				<Content>
					<p
						sx={{
							marginBottom: '35px',
							marginTop: 0,
							fontSize: 'smallText',
							color: '#6A6A6A',
							'::before': {
								content: '""',
								backgroundImage: 'url("/icons/Union.svg")',
								backgroundSize: '30px 30px',
								marginTop: '-5px',
								marginRight: '10px',
								float: 'left',
								height: '30px',
								width: '30px',
							},
						}}
					>
						Bewaar deze pagina bij je favorieten zodat je hem later nog eens
						kunt bekijken.
					</p>
					<PreparationPanel
						image="/images/Illustratie_Eten_en_drinkenRetina.svg"
						text="Heb je genoeg eten en drinken in huis voor 10 dagen?"
					>
						<ul>
							<PreparationPanelListItem text="Vraag familie, vrienden of buren om boodschappen voor je te doen" />
							<PreparationPanelListItem
								text="Bestel je boodschappen online"
								subtext="Bijna alle supermarkten bezorgen boodschappen. Ook kun je in sommige regio's rechtstreeks bij de boer bestellen."
							/>
							<PreparationPanelListItem
								text="Bestel dierenvoeding online"
								subtext="Bijna alle supermarkten verkopen basisproducten voor huisdieren. En de meeste dierspeciaalzaken hebben een online shop."
							/>
						</ul>
					</PreparationPanel>
					<PreparationPanel
						image="/images/Illustratie_ThuiswerkenRetina.svg"
						text="Kun je 10 dagen thuiswerken?"
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
							Op dit moment mogen ook kinderen t/m 12 jaar niet naar school, de
							opvang en bso. Ook mogen ze niet deelnemen aan binnenactiviteiten,
							waaronder sport.
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
							Jongeren van 13 t/m 17 jaar mogen net als volwassenen niet naar
							school of gaan sporten.
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
						image="/images/Illustratie_HondRetina.svg"
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
							<PreparationPanelListItem text="Regel een hondenuitlaatservice" />
						</ul>
					</PreparationPanel>
					<Feedback />
				</Content>
			</Page>
		</>
	);
};

export default PreparationsPage;
