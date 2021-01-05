/** @jsx jsx */
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { jsx, Container, Button, Link, Image, Divider, Box } from 'theme-ui';
import addWeeks from 'date-fns/add_weeks';
import isAfter from 'date-fns/is_after';

import ContentPageHeader from 'components/structure/ContentPageHeader';
import BodyContainer from 'components/structure/BodyContainer';
import TravelPlan from 'components/TravelPlan/TravelPlan';
import TestBooking from 'components/results/TestBooking';
import ReminderCalendarInvite from 'components/TravelPlan/ReminderCalendarInvite';
import FaqList from 'components/faq/FaqList';
import Panel from 'components/structure/Panel';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import { InternalLink } from 'components/Links';
import { parsePeriod } from 'utilities/pathUtils';
import { getAdvice, Advice } from 'services/AdviceService';
import { addDays } from 'utilities/dateUtils';
import { useRouter } from 'next/router';
import { useDestination } from 'hooks/use-destination';
import { countries, RiskLevel } from 'config/countries';
import TravelPlanStage from 'components/TravelPlan/TravelPlanStage';
import TravelAdvicePanel from 'components/TravelPlan/TravelAdvicePanel';
import TravelInformationLink from 'components/TravelPlan/TravelInformationLink';
import advice from 'pages/advice';

type Stage = 'voor-vertrek' | 'tijdens-je-reis' | 'na-thuiskomst';
type Color = 'yellow' | 'orange' | 'red';

type AdviceProps = {
	destination: string;
	stage: Stage;
};

const t = {
	headerWarning: 'Je gaat naar een hoog risicogebied',
	adviceMessages: [
		'Tot 15 maart niet reizen. Maak alleen echt noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld niet onder.',
		'Voor je terugreis naar Nederland heb je een negatieve testuitslag nodig.',
		'Bereid je goed voor om 10 dagen in thuisquarantaine te gaan na je reis. De situatie kan tijdens je reis veranderen.',
	],
	travelScheme: [
		{
			title: 'Voorbereiding',
			date: '', // today
			subTitle: 'Laat je niet verrassen',
			notes: [
				{
					title:
						'Blijf op de hoogte van de laatste ontwikkelingen op je bestemming',
					link: 'Download de reisapp',
					linkType: 'external',
					linkHref: '',
				},
				{
					conditions: ['coronaMelderCountry'],
					title: 'Wist je dat de CoronaMelder ook werkt in $$country',
					link: 'Meer informatie',
					linkType: 'external',
					linkHref: '',
				},
			],
		},
		{
			title: 'Vertrek',
			date: '', // van
			subTitle: '', // destination
			notes: [
				{
					title: 'Code $$colorCode',
					time: 'nu',
					link: 'Uitgebreid reisadvies',
					linkType: 'external',
					linkHref: '',
				},
				{
					title: 'Laat je testen',
					time: 'max 72u voor vertrek',
					subTitle: 'Je mag alleen terugreizen met een negatieve testuitslag',
					link: 'Meer informatie',
					linkType: 'external',
					linkHref: '',
				},
			],
		},
		{
			title: 'Thuiskomst',
			date: '', // tot
		},
	],
};

// @TODO: Hopefully we can do this in an easier way.
const getPageTitle = (stage: Stage, color: Color) => {
	let momentInTimeText = '';
	if (stage === 'voor-vertrek') momentInTimeText = 'gaat naar';
	if (stage === 'tijdens-je-reis') momentInTimeText = 'bent in';
	if (stage === 'na-thuiskomst') momentInTimeText = 'ging naar';

	let riskLevelTekst = '';
	if (color === 'yellow') riskLevelTekst = 'laag ';
	if (color === 'orange') riskLevelTekst = '';
	if (color === 'red') riskLevelTekst = 'hoog ';

	return `Je ${momentInTimeText} een ${riskLevelTekst} risicogebied`;
};

const AdviceResult = ({ destination, stage }: AdviceProps) => {
	const router = useRouter();
	const country = useDestination(destination as string);
	const { from, to } = router.query;

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

	const showCheckAgain = stage === 'voor-vertrek'; // And if departure is further then a week away

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
	 *
	 * Preparation (Befpre)
	 * - Download Travel App
	 * - Coronamelder App (A, B)
	 *
	 * Departure (Before, During)
	 * - Color code based travel advice
	 * - Negative test result (A / D / B)
	 * - Negative test declaration (D)
	 *
	 * Home
	 * - Start Q (A, D)
	 * - Day 5 Q (A, D)
	 *
	 * End Home Q (A, D)
	 *
	 * Calender Check again (Before & If longer then 1 week from departure)
	 *
	 * Calendar for period of Home Q (A, D)
	 *
	 * Corona Symptoms (After)
	 */

	return (
		<>
			<ContentPageHeader message={getPageTitle(stage, color)}>
				<Link
					href="/advice"
					sx={{
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
							paddingRight: '0.5em',
						},
					}}
				>
					opnieuw
				</Link>
				<ul
					sx={{
						paddingLeft: '17px',
						marginBottom: 0,
						fontFamily: 'body',
						fontSize: ['19px', '20px'],
						listStyleImage: 'url("/icons/Polygon 6.svg")',
						'li:not(:last-child)': {
							marginBottom: '16px',
						},
					}}
				>
					{/* RISK LEVEL */}
					{!duringOrAfter ? (
						<li>
							Tot 15 maart <strong>niet reizen</strong>. Maak alleen echt
							noodzakelijke reizen. Daar vallen vakanties bijvoorbeeld niet
							onder.
						</li>
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
							<strong>verklaring</strong>
							nodig.
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
								color: 'header',
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
								date="Vandaag"
							>
								<TravelAdvicePanel title="Blijf op de hoogte van de laatste ontwikkelingen op je bestemming">
									<TravelInformationLink href="" text="Download de reisapp" />
								</TravelAdvicePanel>
								<TravelAdvicePanel
									title={`Wist je dat de CoronaMelder ook werkt in ${country?.fullName}`}
								>
									<TravelInformationLink href="" text="Meer informatie" />
								</TravelAdvicePanel>
							</TravelPlanStage>
						)}

						<TravelPlanStage
							title="Vertrek"
							subHeading={country?.fullName}
							date={`${from}`}
						>
							<TravelAdvicePanel title="Code oranje">
								<TravelInformationLink href="" text="Uitgebreid reisadvies" />
							</TravelAdvicePanel>
						</TravelPlanStage>

						<TravelPlanStage
							title="Thuiskomst"
							subHeading="Start 10 dagen thuisquarantaine"
							date={`${to}`}
						>
							<TravelAdvicePanel title="Tot en met dag 6">
								<TravelInformationLink href="" text="Incubatietijd virus" />
							</TravelAdvicePanel>
							<TravelAdvicePanel title="Tot en met dag 10">
								<TravelInformationLink href="" text="Mogelijke klachten" />
							</TravelAdvicePanel>
						</TravelPlanStage>
					</Container>

					{advice.checkReminderInvite && (
						<>
							<ReminderCalendarInvite
								message="Zet 'Check opnieuw invullen' in je agenda"
								date={advice.checkReminderInvite}
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

					<TestBooking />

					<h2
						sx={{
							paddingTop: ['36px', '44px'],
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
						}}
					>
						Veelgestelde vragen
					</h2>
					<FaqList limit={5} />

					<InternalLink href="/faq">
						Bekijk alle 10 veelgestelde vragen
					</InternalLink>

					{/* {t.quarantineInvite && (
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
							<Box
								sx={{
									borderRadius: '11px',
									boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
									marginBottom: '10px',
									paddingTop: '11px',
									paddingBottom: '13px',
									paddingLeft: '115px',
									backgroundImage:
										'url("/images/Banner_we_helpen_jeRetina.svg")',
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
								<InternalLink href="/preparations">Meer uitleg</InternalLink>
							</Box>
							<ReminderCalendarInvite
								message="Zet je thuisquarantaine in je agenda"
								fromDate={addDays(t.quarantineInvite, -10)}
								toDate={new Date(t.quarantineInvite)}
							/>
							<div sx={{ marginBottom: '65px' }} />
						</>
					)} */}
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
	fallback: true,
});

export default AdviceResult;
