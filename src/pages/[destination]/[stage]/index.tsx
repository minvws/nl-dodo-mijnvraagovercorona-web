/** @jsx jsx */
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { endOfDay, isAfter, startOfDay } from 'date-fns';

import { jsx, Container, Box } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import BodyContainer from 'components/structure/BodyContainer';
import TestBooking from 'components/results/TestBooking';
import ReminderCalendarInvite from 'components/TravelPlan/ReminderCalendarInvite';
import { FaqListShort } from 'components/faq/FaqList';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import { DialogLink, InternalLink } from 'components/Links';
import {
	parseDate,
	isMoreThanWeekBeforeDeparture,
	addDays,
} from 'utilities/dateUtils';
import { useDestination } from 'hooks/use-destination';
import { countries, RiskLevel } from 'config/countries';
import TravelPlanStage from 'components/TravelPlan/TravelPlanStage';
import TravelAdvicePanel from 'components/TravelPlan/TravelAdvicePanel';
import TravelInformationLink from 'components/TravelPlan/TravelInformationLink';
import { Dialog } from 'components/dialog';
import { NavLink } from 'components/nav-link';
import Feedback from 'components/feedback/Feedback';
import AdviceContext from 'components/advice/AdviceContext';
import { QuarantaineCard } from 'components/quarantaine-card';
import { ImageAlleenSamen } from 'components/image-alleen-samen';
import ExpansionPanel from 'components/structure/ExpansionPanel';

type Stage = 'voor-vertrek' | 'tijdens-je-reis' | 'na-thuiskomst';
type Color = 'yellow' | 'orange' | 'red';

type AdviceProps = {
	destination: string;
	stage: Stage;
};

// @TODO: Hopefully we can do this in an easier way.
const getPageTitle = (color: Color) => {
	let riskLevelTekst = '';
	if (color === 'red') riskLevelTekst = 'hoog ';

	return `Je bestemming heeft een ${riskLevelTekst}coronarisico`;
};

const AdviceResult = ({ destination, stage }: AdviceProps) => {
	const { setFrom, setTo, setStage, setDestination } = useContext(
		AdviceContext,
	);
	const router = useRouter();
	const country = useDestination(destination as string);
	const { van, tot } = router.query;
	const fromDate: Date | undefined = van ? parseDate(van) : undefined;
	const toDate: Date | undefined = tot ? parseDate(tot) : undefined;
	const [showDialog, setShowDialog] = useState(false);

	const showPreperation = stage === 'voor-vertrek';
	const showCoronamelderApp = country?.coronaMelderCountry;

	const showDeparture = stage === 'voor-vertrek' || stage === 'tijdens-je-reis';
	const duringOrAfter =
		stage === 'tijdens-je-reis' || stage === 'na-thuiskomst';

	const showNegativeTestResult =
		country?.riskLevel === RiskLevel.A_RISICOVOL ||
		country?.riskLevel === RiskLevel.B_RISICOVOL_INREISBEPERKINGEN;

	const showNegativeTestDeclaration =
		country?.riskLevel === RiskLevel.D_EU_INREISVERBOD;

	const showQuarantaine =
		country?.riskLevel === RiskLevel.A_RISICOVOL ||
		country?.riskLevel === RiskLevel.D_EU_INREISVERBOD;

	const showSecondCheckCalenderInvite =
		stage === 'voor-vertrek' && isMoreThanWeekBeforeDeparture(fromDate);

	const showContactWithSymptoms = duringOrAfter;

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
				title="Advies en actuele situatie bestemming | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Advies op basis van actuele informatie over bestemming."
				url={`/${destination}/${stage}`}
			/>

			<ContentPageHeader message={getPageTitle(color)}>
				<NavLink href="/" icon="refresh">
					opnieuw
				</NavLink>
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
					{/* RISK LEVEL */}
					{!duringOrAfter ? (
						isAfter(fromDate as Date, new Date(2021, 3, 1)) ? (
							<li>
								Het is <strong>onzeker</strong> of reizen na 31 maart mogelijk
								is. Houd de berichtgeving van de overheid in de gaten.
							</li>
						) : (
							<li>
								Tot en met 31 maart <strong>niet reizen</strong>. Maak alleen
								echt noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld
								niet onder.
							</li>
						)
					) : (
						<li>
							Er is een {color === 'yellow' ? 'laag' : 'verhoogd'} risico dat je{' '}
							<strong>besmet</strong> bent geraakt.
						</li>
					)}

					{/* NEGATIVE TEST RESULT / DECLARATION */}
					{showNegativeTestResult && (
						<li>
							Voor je terugreis naar Nederland heb je een{' '}
							<strong>negatieve testuitslag</strong> nodig.
						</li>
					)}
					{showNegativeTestDeclaration && (
						<li>
							Voor je terugreis naar Nederland heb je een{' '}
							<strong>negatieve testuitslag</strong> en{' '}
							<strong>verklaring</strong> nodig.
						</li>
					)}

					{/* QUARANTAINE */}
					{!showQuarantaine && (
						<li>
							Je hoeft <strong>niet 10 dagen in thuisquarantaine</strong> na je
							reis. Deze situatie kan tijdens je reis veranderen.
						</li>
					)}
					{showQuarantaine && showPreperation && (
						<li>
							Je gaat na je reis <strong>10 dagen in thuisquarantaine</strong>.
							Bereid je goed voor. De situatie kan tijdens je reis veranderen.
						</li>
					)}
					{showQuarantaine && duringOrAfter && (
						<li>
							Ga <strong>10 dagen in thuisquarantaine</strong>.
						</li>
					)}
				</ul>
			</ContentPageHeader>

			<BodyContainer>
				<Container
					sx={{
						paddingLeft: ['mobilePadding', 0],
						paddingRight: ['mobilePadding', 0],
					}}
				>
					<h2
						sx={{
							paddingTop: ['36px', '44px'],
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
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
						{stage === 'voor-vertrek' && (
							<TravelPlanStage
								title="Voorbereiding"
								subHeading="Laat je niet verrassen"
								date={new Date()}
							>
								<TravelAdvicePanel title="Blijf op de hoogte van de laatste ontwikkelingen op je bestemming">
									<TravelInformationLink
										href="https://www.nederlandwereldwijd.nl/documenten/vragen-en-antwoorden/reis-app-buitenlandse-zaken"
										text="Download de reisapp"
									/>
								</TravelAdvicePanel>
								{showCoronamelderApp && (
									<TravelAdvicePanel
										title={`Wist je dat de CoronaMelder ook werkt in ${country?.fullName}?`}
									>
										<TravelInformationLink
											href="https://www.coronamelder.nl/nl/faq/13-gebruik-app-uit-ander-land/
"
											text="Meer informatie"
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
							{showNegativeTestResult && (
								<TravelAdvicePanel
									title="Laat je testen"
									subHeading="Max 72u voor vertrek"
								>
									Je mag alleen terugreizen met een negatieve testuitslag
									<br />
									<TravelInformationLink
										href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/negatieve-covid-19-testuitslag-aankomst-nederland"
										text="Meer informatie"
									/>
								</TravelAdvicePanel>
							)}
							{showNegativeTestDeclaration && (
								<TravelAdvicePanel
									title="Laat je testen"
									subHeading="Max 72u voor vertrek"
								>
									Je mag alleen terugreizen met een negatieve testuitslag en
									testverklaring
									<br />
									<TravelInformationLink href="" text="Meer informatie" />
								</TravelAdvicePanel>
							)}
						</TravelPlanStage>

						<TravelPlanStage
							title="Thuiskomst"
							subHeading={
								showQuarantaine ? 'Start 10 dagen thuisquarantaine' : undefined
							}
							date={toDate}
						>
							{showQuarantaine && (
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
						{showQuarantaine && (
							<TravelPlanStage
								title="Einde thuisquarantaine"
								date={toDate && addDays(toDate, 10)}
							/>
						)}
					</Container>

					{showSecondCheckCalenderInvite && fromDate && (
						<Box sx={{ marginTop: ['10px', '60px'] }}>
							<ReminderCalendarInvite
								title="Zet 'Reischeck opnieuw invullen' in je agenda"
								modalTitle="Reischeck opnieuw invullen in agenda"
								modalBody="Heb je een andere (digitale) agenda? Zet je reminder om de reischeck opnieuw in te vullen er dan zelf in."
								inviteTitle="Reischeck invullen"
								inviteText="Je bent van plan bijna op reis te gaan. De situatie kan veranderd zijn. Doe daarom nog een keer de reischeck op https://www.reizentijdenscorona.nl."
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

					{showContactWithSymptoms && toDate && <TestBooking toDate={toDate} />}

					<h2
						sx={{
							paddingTop: ['36px', '44px'],
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
						}}
					>
						Zo kom je de thuisquarantaine goed door
					</h2>

					<QuarantaineCard />

					{showQuarantaine && toDate && (
						<ReminderCalendarInvite
							title="Zet je thuisquarantaine in je agenda"
							modalTitle="Thuisquarantaine in agenda"
							modalBody="Heb je een andere (digitale) agenda? Zet je thuisquarantaine er dan zelf in."
							inviteTitle="Thuisquarantaine"
							inviteText="Krijg je (lichte) klachten? Maak direct een testafspraak op https://coranatest.nl of bel de GGD op 0800-1202. Kijk voor tips over je thuisquarantaine op https://reizentijdenscorona.nl/voorbereiding."
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
				</Container>
				<DataProtectionPanel />
				<ImageAlleenSamen />
			</BodyContainer>
			<Footer />
		</>
	);
};

export interface AdviceDestinationStageStaticProps {
	params: {
		destination: string;
		stage: string;
	};
}

export const getStaticProps = async ({
	params,
}: AdviceDestinationStageStaticProps) => {
	return {
		props: {
			destination: params.destination,
			stage: params.stage,
		},
	};
};

export const getStaticPaths = () => ({
	paths: countries.reduce(
		(
			paths: Array<{ params: { destination: string; stage: string } }>,
			country,
		) => {
			const stages = ['voor-vertrek', 'tijdens-je-reis', 'na-thuiskomst'];

			return [
				...paths,
				...stages.map((stage) => ({
					params: { destination: country.slug, stage },
				})),
			];
		},
		[],
	),
	fallback: false,
});

export default AdviceResult;
