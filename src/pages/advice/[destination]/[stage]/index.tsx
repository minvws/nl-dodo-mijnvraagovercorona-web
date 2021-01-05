/** @jsx jsx */
import { GetServerSideProps, GetStaticPaths, GetStaticProps } from 'next';
import { jsx, Container, Button, Link, Image, Divider, Box } from 'theme-ui';

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
import { countries } from 'config/countries';

type AdviceProps = {
	destination: string;
	stage: 'voor-vertrek' | 'tijdens-je-reis' | 'na-thuiskomst';
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

const AdviceResult = ({ destination, stage }: AdviceProps) => {
	const router = useRouter();
	const country = useDestination(destination as string);
	const { van, tot } = router.query;

	const showPreperation = stage === 'voor-vertrek';
	const showCoronamelderApp =
		country?.riskLevel === 'high' || country?.riskLevel === 'medium';

	const showDeparture = stage === 'voor-vertrek' || stage === 'tijdens-je-reis';

	const showNegativeTestResult =
		country?.riskLevel === 'high' || country?.riskLevel === 'medium';
	const showNegativeTestDeclaration = country?.riskLevel === 'unknown';

	const showQuarantaine =
		country?.riskLevel === 'high' || country?.riskLevel === 'unknown';

	const showCheckAgain = stage === 'voor-vertrek'; // And if departure is further then a week away

	const showSymptoms = stage === 'na-thuiskomst';

	/**
	 *
	 * Preparation (Befpre)
	 * - Download Travel App
	 * - Coronamelder App (High, Medium)
	 *
	 * Departure (Before, During)
	 * - Color code based travel advice
	 * - Negative test result (High, Medium)
	 * - Negative test declaration (Unknown)
	 *
	 * Home
	 * - Start Q (High, Unknown)
	 * - Day 5 Q (High, Unknown)
	 *
	 * End Home Q (High, Unknown)
	 *
	 * Calender Check again (Before & If longer then 1 week from departure)
	 *
	 * Calendar for period of Home Q (High, Unknown)
	 *
	 * Corona Symptoms (After)
	 */

	return (
		<>
			<ContentPageHeader message={t.headerWarning}>
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
					{t.adviceMessages.map((message) => (
						<li key={message}>{message}</li>
					))}
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
					<TravelPlan advice={t} />
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
