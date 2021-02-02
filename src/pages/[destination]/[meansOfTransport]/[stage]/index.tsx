/** @jsx jsx */
import { useState, useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { endOfDay, startOfDay } from 'date-fns';

import { jsx, Container, Box } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import TestBooking from 'components/results/TestBooking';
import ReminderCalendarInvite from 'components/TravelPlan/ReminderCalendarInvite';
import { FaqListShort } from 'components/faq/FaqList';
import { DialogLink, InternalLink } from 'components/Links';
import { parseDate, addDays } from 'utilities/dateUtils';
import { useDestination } from 'hooks/use-destination';
import { countries, RiskLevel } from 'config/countries';
import TravelPlanStage from 'components/TravelPlan/TravelPlanStage';
import TravelAdvicePanel from 'components/TravelPlan/TravelAdvicePanel';
import TravelInformationLink from 'components/TravelPlan/TravelInformationLink';
import { Dialog } from 'components/dialog';
import Feedback from 'components/feedback/Feedback';
import AdviceContext, {
	MeansOfTransport,
	meansOfTransport,
	travelStage,
	TravelStage,
} from 'components/advice/AdviceContext';
import { getAdvicePath } from 'components/advice/utils';
import { Content, Hero, Page } from 'components/structure/Page';
import ExpansionPanel from 'components/structure/ExpansionPanel';
import { Card } from 'components/card';
import { cartesianProduct } from 'utilities/pathUtils';
import { getTravelSchemeContentBlocks } from 'utilities/travel-advice';

type Color = 'yellow' | 'orange' | 'red';

type AdviceProps = {
	destination: string;
	stage: TravelStage;
	meansOfTransport: MeansOfTransport;
};

// @TODO: Hopefully we can do this in an easier way.
const getPageTitle = (color: Color) => {
	let riskLevelTekst = '';
	if (color === 'red') riskLevelTekst = 'hoog ';

	return `Je bestemming heeft een ${riskLevelTekst}coronarisico`;
};

const AdviceResult = ({
	destination,
	stage,
	meansOfTransport,
}: AdviceProps) => {
	const { setFrom, setTo, setStage, setDestination } = useContext(
		AdviceContext,
	);
	const router = useRouter();
	const country = useDestination(destination as string);
	const { van, tot } = router.query;
	const fromDate: Date | undefined = van ? parseDate(van) : undefined;
	const toDate: Date | undefined = tot ? parseDate(tot) : undefined;
	const [showDialog, setShowDialog] = useState(false);

	// Gets show/hide booleans for all content blocks.
	const c = getTravelSchemeContentBlocks({
		fromDate,
		toDate,
		currentTravelStage: stage,
		currentCategory: country?.riskLevel,
		currentMeansOfTransport: meansOfTransport,
		coronaMelderCountry: country?.coronaMelderCountry,
		transportRestrictions: country?.transportRestrictions,
	});

	const duringOrAfter =
		stage === 'tijdens-je-reis' || stage === 'na-thuiskomst';

	const showQuarantaine =
		country?.riskLevel === RiskLevel.A_RISICOVOL ||
		country?.riskLevel === RiskLevel.D_EU_INREISVERBOD;

	// @TODO: Do this in a different place where it makes sense.
	let color: Color = 'red';
	if (country?.riskLevel === RiskLevel.B_RISICOVOL_INREISBEPERKINGEN) {
		color = 'orange';
	}
	if (country?.riskLevel === RiskLevel.C_VEILIGE_LIJST) {
		color = 'yellow';
	}

	/**
	 * Update the AdviceContext so when landing on a results page and skipping the period and destination pages
	 * will allow users to navigate back to the results page
	 */
	useEffect(() => {
		if (setFrom && van) setFrom(van);
		if (setTo && tot) setTo(tot);
		if (setStage && stage) setStage(stage);
		if (setDestination && destination) setDestination(destination);
	}, [destination, van, tot, stage]);

	return (
		<>
			<MetaTags
				title="Advies en actuele situatie bestemming | Quarantaine Reischeck | Rijksoverheid.nl"
				description="Advies op basis van actuele informatie over bestemming."
				url={
					getAdvicePath.result({
						destination,
						meansOfTransport,
						stage,
					}).pathname
				}
			/>

			<Page title={getPageTitle(color)} showBackLink="retry">
				<Hero>
					<ul
						sx={{
							paddingLeft: '17px',
							marginBottom: 0,
							fontFamily: 'body',
							color: 'text',
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
							listStyleImage: 'url("/icons/Polygon 6.svg")',
							'li:not(:last-child)': {
								marginBottom: '16px',
							},
						}}
					>
						{c.bullets__na_31maart_reizen_onzeker && (
							<li>
								Het is <strong>onzeker</strong> of reizen na 31 maart mogelijk
								is. Houd de berichtgeving van de overheid in de gaten.
							</li>
						)}
						{c.bullets__tm_31maart_niet_reizen && (
							<li>
								Tot en met 31 maart <strong>niet reizen</strong>. Maak alleen
								echt noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld
								niet onder.
							</li>
						)}
						{c.bullets__verhoogd_risico && (
							<li>
								Er is een verhoogd risico dat je <strong>besmet</strong> bent
								geraakt.
							</li>
						)}
						{c.bullets__laag_risico && (
							<li>
								Er is een laag risico dat je <strong>besmet</strong> bent
								geraakt
							</li>
						)}
						{c.bullets__na_reis_10dgn_thuisquarantaine && (
							<li>
								Je gaat na je reis <strong>10 dagen in thuisquarantaine</strong>
								. Bereid je goed voor. De situatie kan tijdens je reis
								veranderen.
							</li>
						)}
						{c.bullets__geen_thuisquarantaine && (
							<li>
								Je hoeft <strong>niet 10 dagen in thuisquarantaine</strong> na
								je reis. Deze situatie kan tijdens je reis veranderen.
							</li>
						)}
						{c.bullets__ga_10dgn_thuisquarantaine && (
							<li>
								Ga <strong>10 dagen in thuisquarantaine</strong>.
							</li>
						)}
					</ul>
				</Hero>
				<Content>
					{(c.banner__airboattravel_restriction ||
						c.banner__airtravel_restriction) && (
						<div sx={{ marginBottom: ['36px', '44px'] }}>
							<Card
								image="/images/Vliegtuig_streep.svg"
								imagePosition={{
									backgroundPositionX: '5px',
									backgroundPositionY: '22px',
								}}
								title={
									c.banner__airboattravel_restriction
										? 'Er geldt een vlieg- en aanmeerverbod vanuit je bestemming naar Nederland.'
										: 'Er geldt een vliegverbod vanuit je bestemming naar Nederland.'
								}
								href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/vliegverbod-en-aanmeerverbod"
								external
							/>
						</div>
					)}
					<h2
						sx={{
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
							marginTop: 0,
						}}
					>
						Jouw reisschema
					</h2>
					<Container
						sx={{
							borderLeft: '2px solid #f0d5e2',
							paddingLeft: '1.8em',
							maxWidth: 'widgetMaxWidth',
							margin: 0,
						}}
					>
						{(c.reisschema__downloadReisApp || c.reisschema__coronaMelder) && (
							<TravelPlanStage
								title="Voorbereiding"
								subHeading="Laat je niet verrassen"
								date={new Date()}
							>
								{c.reisschema__downloadReisApp && (
									<TravelAdvicePanel title="Blijf op de hoogte van de laatste ontwikkelingen op je bestemming">
										<TravelInformationLink
											href="https://www.nederlandwereldwijd.nl/documenten/vragen-en-antwoorden/reis-app-buitenlandse-zaken"
											text="Download de reisapp"
										/>
									</TravelAdvicePanel>
								)}
								{c.reisschema__coronaMelder && (
									<TravelAdvicePanel
										title={`Wist je dat de CoronaMelder ook werkt in ${country?.fullName}?`}
									>
										<TravelInformationLink
											href="https://www.coronamelder.nl/nl/faq/13-gebruik-app-uit-ander-land/"
											text="Meer informatie"
										/>
									</TravelAdvicePanel>
								)}
								{c.reisschema__voorbereidenThuisQuarantaine && (
									<TravelAdvicePanel title="Bereid je goed voor op je thuisquarantaine">
										<TravelInformationLink
											href="/voorbereiding"
											text="Meer informatie"
											internal
										/>
									</TravelAdvicePanel>
								)}
							</TravelPlanStage>
						)}

						<TravelPlanStage
							title="Vertrek"
							subHeading={country?.fullName}
							date={fromDate}
						>
							{c.reisschema__reisadvies && (
								<TravelAdvicePanel
									title="Code oranje"
									subHeading={duringOrAfter ? 'Totale reisduur' : 'Nu'}
								>
									Naast het coronarisico gelden er mogelijk inreisbeperkingen of
									veiligheidsrisico's in {country?.fullName}.
									<br />
									<TravelInformationLink
										href={`https://www.nederlandwereldwijd.nl/landen/${country?.slug}/reizen/reisadvies`}
										text="Uitgebreid reisadvies"
									/>
								</TravelAdvicePanel>
							)}
							{c.reisschema__pcrtest && (
								<TravelAdvicePanel
									title="Laat je testen"
									subHeading="Max 72u voor vertrek"
								>
									Je mag alleen terugreizen met een negatieve testuitslag.
									<br />
									<TravelInformationLink
										href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/negatieve-covid-19-testuitslag-aankomst-nederland"
										text="Meer informatie"
									/>
								</TravelAdvicePanel>
							)}
							{c.reisschame__pcrtest_en_verklaring && (
								<TravelAdvicePanel
									title="Laat je testen"
									subHeading="Max 72u voor vertrek"
								>
									Je mag alleen terugreizen met een negatieve testuitslag en
									testverklaring.
									<br />
									<TravelInformationLink
										href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/negatieve-covid-19-testuitslag-aankomst-nederland"
										text="Meer informatie"
									/>
								</TravelAdvicePanel>
							)}
							{c.reisschema__sneltest && (
								<TravelAdvicePanel
									title="Doe een sneltest"
									subHeading="Max 4u voor vertrek"
								>
									Je hebt voor je terugreis ook een negatieve sneltestuitslag
									nodig.
									<br />
									<TravelInformationLink
										href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/verplichte-negatieve-covid-19-testuitslagen/eisen-sneltest"
										text="Meer informatie"
									/>
								</TravelAdvicePanel>
							)}
							{c.reisschema__gezondheidsverklaring && (
								<TravelAdvicePanel title="Vul de gezondheidsverklaring in voor je vertrek">
									<TravelInformationLink
										href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/documenten/publicaties/2020/07/20/gezondheidsverklaring-reizigers-nederlands"
										text="Meer informatie"
									/>
								</TravelAdvicePanel>
							)}
						</TravelPlanStage>

						<TravelPlanStage
							title="Thuiskomst"
							subHeading={
								c.reisschema__thuisquarantaine
									? 'Start 10 dagen thuisquarantaine'
									: undefined
							}
							date={toDate}
						>
							{c.reisschema__thuisquarantaine && (
								<TravelAdvicePanel
									title="Mogelijk klachten"
									subHeading="Tot en met dag 10"
								>
									<DialogLink
										href=""
										onClick={(ev) => {
											ev.preventDefault();
											setShowDialog(true);
										}}
									>
										Meer informatie
									</DialogLink>
									<Dialog
										title="Mogelijk klachten"
										isVisible={showDialog}
										closeDialog={() => setShowDialog(false)}
									>
										<div
											sx={{
												h4: {
													color: 'smallText',
													fontSize: ['bodyMobile', 'body'],
													lineHeight: ['bodyMobile', 'body'],
													marginTop: '32px',
													marginBottom: '12px',
												},
												'h4 + p': {
													marginTop: '12px',
												},
											}}
										>
											<span
												sx={{
													fontSize: '24px',
													marginTop: '-20px',
													display: 'block',
												}}
											>
												Tot en met dag 10
											</span>
											<h4>Dag 1 tot en met 5</h4>
											<p>
												Als je besmet raakt met het coronavirus duurt het
												meestal 5 dagen voordat je klachten krijgt. Daarom kan
												je onbewust het coronavirus hebben en anderen besmetten.
												Blijf daarom thuis.
											</p>
											<ExpansionPanel text="Wat als ik klachten heb?">
												<p>
													Maak een testafspraak bij de GGD als je klachten hebt.
													Dit kan via{' '}
													<a
														href="https://www.coronatest.nl"
														target="_blank"
														rel="noopener noreferrer"
													>
														coronatest.nl
													</a>{' '}
													of bel naar 0800-1202. Houd je BSN bij je hand.
												</p>
											</ExpansionPanel>
											<ExpansionPanel text="Ik heb geen klachten op dag 5. Kan ik eerder uit quarantaine?">
												<p>
													Je kunt je vanaf dag 5 laten testen, ook als je geen
													klachten hebt. Als de testuitslag negatief is, mag je
													uit quarantaine. Krijg je na een negatieve testuitslag
													toch klachten, laat je dan opnieuw testen. Eerder dan
													de 5e dag testen heeft geen zin. Het kan zijn dat je
													dan te vroeg test om het virus aan te kunnen tonen.
												</p>
											</ExpansionPanel>
											<h4>Dag 5 tot en met 10</h4>
											<p>
												Niet iedereen krijgt binnen de eerste 5 dagen klachten.
												Na dag 5 kan je nog steeds onbewust het coronavirus
												hebben en anderen besmetten. Blijf daarom thuis. Uit het
												bron- en contactonderzoek van de GGD blijkt dat bij 99%
												van de contacten die klachten krijgt, dit gebeurt binnen
												10 dagen na het laatste contact met iemand die besmet is
												met het virus.
											</p>
											<ExpansionPanel text="Wat als ik klachten krijg?">
												<p>
													Maak een testafspraak bij de GGD als je klachten hebt.
													Dit kan via{' '}
													<a
														href="https://www.coronatest.nl"
														target="_blank"
														rel="noopener noreferrer"
													>
														coronatest.nl
													</a>{' '}
													of bel naar 0800-1202. Houd je BSN bij je hand.
												</p>
											</ExpansionPanel>
										</div>
									</Dialog>
								</TravelAdvicePanel>
							)}
						</TravelPlanStage>
						{c.reisschema__thuisquarantaine && (
							<TravelPlanStage
								title="Einde thuisquarantaine"
								date={toDate && addDays(toDate, 10)}
							/>
						)}
					</Container>
					{c.agenda__reischeck_opnieuw_invullen && fromDate && (
						<Box sx={{ marginTop: ['10px', '60px'] }}>
							<ReminderCalendarInvite
								title="Zet 'Reischeck opnieuw invullen' in je agenda"
								modalTitle="Reischeck opnieuw invullen in agenda"
								modalBody="Heb je een andere (digitale) agenda? Zet je reminder om de reischeck opnieuw in te vullen er dan zelf in."
								inviteTitle="Reischeck invullen"
								inviteText="Je bent van plan bijna op reis te gaan. De situatie kan veranderd zijn. Doe daarom nog een keer de reischeck op https://www.reizentijdenscorona.rijksoverheid.nl."
								singleDay={startOfDay(addDays(new Date(fromDate), -7))}
							/>
							<Container
								sx={{
									paddingLeft: '2em',
									paddingTop: '2px',
									paddingBottom: '2px',
									backgroundImage: 'url("/icons/Union.svg")',
									backgroundRepeat: 'no-repeat',
									backgroundPosition: '0 12px',
									backgroundSize: '30px 30px',
								}}
							>
								<p
									sx={{
										lineHeight: '1.4em',
									}}
								>
									De situatie kan veranderen. Doe daarom voor vertrek de check
									nog een keer.
								</p>
							</Container>
						</Box>
					)}
					{toDate && (
						<TestBooking
							contentBlocks={c}
							toDate={toDate}
							quarantaine={showQuarantaine}
						/>
					)}
					{c.banner__thuisquarantaine && (
						<>
							<h2
								sx={{
									paddingTop: ['36px', '44px'],
									color: 'header',
									fontSize: ['h2Mobile', 'h2'],
								}}
							>
								Zo kom je de thuisquarantaine goed door
							</h2>
							<Card
								image="/images/Banner_we_helpen_jeRetina.svg"
								imagePosition={{
									backgroundPositionX: '-10px',
								}}
								title="Wat moet ik regelen voor mijn thuisquarantaine?"
								href="/voorbereiding"
							/>
						</>
					)}
					{c.agenda__zet_thuisquarantaine_in_agenda && toDate && (
						<ReminderCalendarInvite
							title="Zet je thuisquarantaine in je agenda"
							modalTitle="Thuisquarantaine in agenda"
							modalBody="Heb je een andere (digitale) agenda? Zet je thuisquarantaine er dan zelf in."
							inviteTitle="Thuisquarantaine"
							inviteText="Krijg je (lichte) klachten? Maak direct een testafspraak op https://coranatest.nl of bel de GGD op 0800-1202. Kijk voor tips over je thuisquarantaine op https://reizentijdenscorona.rijksoverheid.nl/voorbereiding."
							fromDate={startOfDay(toDate)}
							toDate={endOfDay(addDays(toDate, 10))}
						/>
					)}
					<h2
						sx={{
							paddingTop: ['36px', '44px'],
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
						}}
					>
						Veelgestelde vragen
					</h2>
					<FaqListShort country={country} stage={stage} />
					<InternalLink href={`/${country?.slug}/faq`}>
						Bekijk alle veelgestelde vragen
					</InternalLink>
					<Feedback />
				</Content>
			</Page>
		</>
	);
};

export interface AdviceDestinationStageStaticProps {
	params: {
		destination: string;
		stage: string;
		meansOfTransport: MeansOfTransport;
	};
}

export const getStaticProps = async ({
	params,
}: AdviceDestinationStageStaticProps) => {
	return {
		props: {
			destination: params.destination,
			stage: params.stage,
			meansOfTransport: params.meansOfTransport,
		},
	};
};

export const getStaticPaths = () => ({
	paths: cartesianProduct(
		countries.map((country) => `${country.slug}`),
		travelStage.map((stage) => `${stage}`),
		meansOfTransport.map((means) => `${means}`),
	).map(([destination, stage, meansOfTransport]: string[]) => ({
		params: { destination, stage, meansOfTransport },
	})),
	fallback: false,
});

export default AdviceResult;
