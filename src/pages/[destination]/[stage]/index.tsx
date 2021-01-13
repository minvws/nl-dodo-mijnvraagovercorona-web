/** @jsx jsx */
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { isAfter } from 'date-fns';

import { jsx, Container, Box } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import BodyContainer from 'components/structure/BodyContainer';
import TestBooking from 'components/results/TestBooking';
import ReminderCalendarInvite from 'components/TravelPlan/ReminderCalendarInvite';
import FaqList from 'components/faq/FaqList';
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

	const showContactWithSymptoms = stage === 'na-thuiskomst';

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
						isAfter(fromDate as Date, new Date(2021, 2, 15)) ? (
							<li>
								Het is <strong>onzeker</strong> of reizen na 31 maart mogelijk
								is. Houd de berichtgeving van de overheid in de gaten.
							</li>
						) : (
							<li>
								Tot 31 maart <strong>niet reizen</strong>. Maak alleen echt
								noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld niet
								onder.
							</li>
						)
					) : (
						<li>
							Er is een {color === 'yellow' ? 'laag' : 'verhoogd'} risico dat je{' '}
							<strong>besmet</strong> bent geraakt
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
							Bereid je goed voor om{' '}
							<strong>10 dagen in thuisquarantaine te gaan</strong> na je reis.
							De situatie kan tijdens je reis veranderen.
						</li>
					)}
					{showQuarantaine && duringOrAfter && (
						<li>
							Het dringende advies is om{' '}
							<strong>10 dagen in thuisquarantaine te gaan.</strong>
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

							h3: {
								color: 'smallText',
								marginBottom: 0,
								'::before': {
									marginLeft: '-39px',
									marginRight: '2px',
									marginTop: '1px',
									paddingRight: '1em',
									display: 'inline-block',
									fill: 'gray',
									content:
										'url(\'data:image/svg+xml;charset=utf-8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle fill="rgb(240,213,226)" cx="50" cy="50" r="50"/></svg>\')',
									float: 'left',
									height: '1em',
									width: '1em',
								},
							},
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
								<>
									<TravelAdvicePanel title="Bereid jezelf goed voor">
										<Link href="/voorbereiding">
											<a
												sx={{
													color: 'text',
													textDecoration: 'underline',
													cursor: 'pointer',
												}}
											>
												Wat moet ik regelen?
											</a>
										</Link>
									</TravelAdvicePanel>
									<TravelAdvicePanel title="Tot en met dag 10">
										<DialogLink
											href=""
											onClick={(ev) => {
												ev.preventDefault();
												setShowDialog(true);
											}}
										>
											Mogelijke klachten
										</DialogLink>
										<Dialog
											title="Tot en met dag 10 - Mogelijke klachten"
											isVisible={showDialog}
											closeDialog={() => setShowDialog(false)}
										>
											<p>
												Uit het bron- en contactonderzoek van de GGD blijkt dat
												bij 99% van de contacten die klachten krijgt, dit
												gebeurt binnen 10 dagen na het laatste contact met
												iemand die besmet is met het virus.
											</p>
											<p>Krijg je klachten? Laat je dan testen bij de GGD.</p>
										</Dialog>
									</TravelAdvicePanel>
								</>
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
						<>
							<ReminderCalendarInvite
								title="Zet 'Check opnieuw invullen' in je agenda"
								inviteTitle="Reischeck invullen"
								inviteText="Je bent van plan bijna op reis te gaan. De situatie kan veranderd zijn. Doe daarom nog een keer de check op www.reizentijdenscorona.nl"
								date={addDays(new Date(fromDate), -7)}
							/>
							<Container
								sx={{
									paddingLeft: '2em',
									backgroundImage: 'url("/icons/Union.svg")',
									backgroundRepeat: 'no-repeat',
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
						</>
					)}

					{showContactWithSymptoms && <TestBooking />}

					<h2
						sx={{
							paddingTop: ['36px', '44px'],
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
						}}
					>
						Veelgestelde vragen
					</h2>
					<FaqList limit={5} country={country} />

					<InternalLink href={`/${country?.slug}/faq`}>
						Bekijk alle 10 veelgestelde vragen
					</InternalLink>

					<h2
						sx={{
							paddingTop: ['36px', '44px'],
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
						}}
					>
						Zo kom je de thuisquarantaine goed door
					</h2>
					<Box
						sx={{
							borderRadius: '11px',
							boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
							marginBottom: '10px',
							paddingTop: '11px',
							paddingBottom: '13px',
							paddingLeft: '115px',
							backgroundImage: 'url("/images/Banner_we_helpen_jeRetina.svg")',
							backgroundRepeat: 'no-repeat',
							backgroundPositionX: '-10px',
						}}
					>
						<h3
							sx={{
								color: 'secondaryHeader',
								fontSize: ['bodyMobile', 'body'],
								lineHeight: ['bodyMobile', 'body'],
							}}
						>
							Wat moet ik regelen voor mijn thuisquarantaine?
						</h3>
						<InternalLink href="/voorbereiding">Meer uitleg</InternalLink>
					</Box>
					{showQuarantaine && toDate && (
						<ReminderCalendarInvite
							title="Zet je thuisquarantaine in je agenda"
							inviteTitle="Thuisquarantaine"
							inviteText="Krijg je (lichte) klachten? Neem dan direct contact op met de GGD. Kijk voor tips over je thuisquarantaine op https://www.reizentijdenscorona.nl/voorbereiding"
							fromDate={toDate}
							toDate={addDays(toDate, 10)}
						/>
					)}
					<Feedback />
					<div sx={{ marginBottom: '65px' }} />
				</Container>
				<DataProtectionPanel />
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
