/** @jsx jsx */
import { Box, jsx, Styled, Text } from 'theme-ui';
import { useRouter } from 'next/router';
import { parse, differenceInDays, addDays, format } from 'date-fns';

import {
	BodyContainer,
	CallToAction,
	Link,
	SaveInCalendar,
	MetaTags,
	getLocaleProperty,
	sanityClient,
	getPageQuery,
	InlineDialog,
} from '@quarantaine/common';

import { Page } from 'components/page';
import {
	QuarantaineOverviewBlock,
	QuarantaineOverviewBullet,
} from 'components/quarantine-overview';
import { GGDSpecialInstructions } from 'components/ggd-special-instructions';
import { getSituations } from 'utilities/situations';
import { PrinterIcon } from 'icons/printer';

interface QuarantainePlanDay {
	// vandaag, laatste contact, etc
	title: string;
	// dag 0, dag 4, of 'vandaag' waarmee de dag index dynamisch wordt.
	day: number | 'vandaag';
	// Deze type gaat waarschijnlijk een array met wysywig content worden,
	// die we daarna het sanity contentblock in gooien. Dan verandert deze type dus.
	bullets: React.FC[];
}
type QuarantainePlan = QuarantainePlanDay[];

interface ContentType {
	situationTitle: string;
	title: string;
	quarantineOverviewTitle: string;
	quarantainePlan: QuarantainePlan;
	quarantaineGidsButtonText: string;
	quarantaineGidsUrl: string;
	quarantaineGidsText: string;
	tot_en_met: string;
	other_calendar: string;
	calendar: {
		title: string;
		modalTitle: string;
		modalBody: string;
		inviteTitle: string;
		inviteText: string;
	};
	printCta: string;
	quarantaineDuration: number;
}
// @TODO: CMS
const pageSettings: ContentType = {
	situationTitle: 'Je hebt corona, met klachten',
	title: 'Ga direct in quarantaine en laat je testen',
	quarantineOverviewTitle: 'Dit is jouw thuisquarantaine overzicht:',
	quarantaineGidsButtonText: 'Download de Quarantainegids',
	quarantaineGidsUrl: 'https://www.rijksoverheid.nl',
	quarantaineGidsText:
		'In de Quarantainegids vind je hulp, tips en adviezen om je thuisquarantaineperiode zo goed en prettig mogelijk door te komen.',
	tot_en_met: 't/m',
	other_calendar: 'Andere agenda',
	calendar: {
		title: 'Zet je thuisquarantaine in je agenda',
		modalTitle: 'et je thuisquarantaine in je agenda',
		modalBody:
			'Heb je een andere (digitale) agenda? Zet je thuisquarantaine er dan zelf in.',
		inviteTitle: 'Thuisquarantaine',
		inviteText:
			'Krijg je (lichte) klachten? Maak direct een testafspraak op https://coronatest.nl of bel de GGD op 0800-1202. Kijk voor tips over je thuisquarantaine op https://reizentijdenscorona.rijksoverheid.nl/voorbereiding.',
	},
	printCta: 'Print jouw thuisquarantaineoverzicht',
	quarantaineDuration: 10,
	quarantainePlan: [
		{
			title: 'Laatste contact',
			day: 0,
			bullets: [],
		},
		{
			title: 'Vandaag',
			day: 'vandaag',
			bullets: [
				() => (
					<>
						<p>
							<strong>Ga direct in thuisquarantaine</strong> en vermijd contact
							met andere personen.{' '}
							<InlineDialog
								buttonText="Wat zijn de regels?"
								title="Wat zijn de regels tijdens thuisquarantaine?"
							>
								<ul>
									<li>
										<strong>Alleen de mensen die bij je wonen</strong> mogen
										samen met jou in huis zijn.
									</li>
									<li>
										<strong>Blijf zo veel mogelijk op 1,5 meter afstand</strong>{' '}
										van je huisgenoten. Dus niet knuffelen, niet zoenen en geen
										seks.
									</li>
									<li>
										Blijf zoveel mogelijk op je <strong>eigen kamer</strong> en{' '}
										<strong>slaap</strong> daar indien mogelijk{' '}
										<strong>alleen</strong>.
									</li>
									<li>
										<strong>Ontvang geen bezoek</strong>, behalve voor medische
										redenen (bijvoorbeeld de huisarts of iemand van de GGD).
									</li>
									<li>
										Heb je <strong>medische hulp</strong> nodig? Ga dan niet
										naar de huisarts of het ziekenhuis, maar bel de arts.
									</li>
									<li>
										Laat <strong>anderen boodschappen</strong> doen.
									</li>
									<li>
										<strong>Je mag in de tuin of op je balkon</strong> zitten.
									</li>
									<li>
										<strong> Werk thuis.</strong> Werk je in de zorg? Dan mag je
										alleen werken bij uitzondering en als je geen klachten hebt.
										Overleg dit altijd met de GGD of de bedrijfsarts.
									</li>
									<li>
										<strong>Reis niet</strong> met het openbaar vervoer of met
										een taxi.
									</li>
								</ul>
							</InlineDialog>
						</p>

						<p>
							<strong>Dus niet meer naar buiten,</strong> geen boodschappen doen
							en niet naar je werk.
						</p>
					</>
				),
				() => (
					<>
						<p>
							<strong>Laat je zo snel mogelijk testen</strong> op corona:
							<Link href="https://www.rijksoverheid.nl" external>
								maak nu een afspraak
							</Link>
						</p>

						<p>
							<strong>Is de testuitslag negatief?</strong> Dan mag je de
							thuisquarantaine beeindigen. Vermijd wel contact met kwetsbare
							personen tot en met dag 10 na het laatste coronacontact.
						</p>

						<p>
							<strong>Is de testuitslag positief?</strong> Dan heb je coroan. De
							GGD vertelt je meer en je moet{' '}
							<Link href="https://www.rijksoverheid.nl" external>
								in isolatie
							</Link>
							.
						</p>
					</>
				),
			],
		},
		{
			title: 'Einde',
			day: 10,
			bullets: [
				() => (
					<>
						<p>
							<strong>Geen klachten?</strong> Dan mag je je thuisquarantaine
							beeindigen.
						</p>
						<p>
							<strong>Heb je wel coronaklachten?</strong> Blijf thuis en
							<Link href="https://www.rijksoverheid.nl" external>
								laat je opnieuw testen
							</Link>
						</p>
					</>
				),
			],
		},
	],
};

const getDateSinceEvent = (
	day: number | 'vandaag',
	todayDay: number,
	eventDate: Date,
) => {
	const daysSince = day === 'vandaag' ? todayDay : day;
	return format(addDays(eventDate, daysSince), 'dd MMMM');
};

const getDayLabel = (day: number | 'vandaag', todayDay?: number) => {
	if (day === 'vandaag') {
		return todayDay ? `dag ${todayDay}` : '';
	}

	return `dag ${day}`;
};

export default function Situatie() {
	const router = useRouter();

	const selectedLastEventDate = router.query.event
		? parse(`${router.query.event}`, 'dd-MM-yyyy', new Date())
		: undefined;

	const todayDay = selectedLastEventDate
		? differenceInDays(new Date(), selectedLastEventDate)
		: undefined;

	return (
		<>
			<MetaTags title={pageSettings.title} description="" url={router.asPath} />
			<Page
				title={pageSettings.title}
				headerPrefix={pageSettings.situationTitle}
				showRetryLink
			>
				<Box sx={{ backgroundColor: 'headerBackground', py: 'box' }}>
					<BodyContainer sx={{ paddingRight: [, '165px'] }}>
						<Styled.h2>{pageSettings.quarantineOverviewTitle}</Styled.h2>

						{pageSettings.quarantainePlan.map((day) => (
							<QuarantaineOverviewBlock
								key={day.title}
								// If no date is provided we show the "laatste contact", "vandaag" values as the main title.
								title={
									selectedLastEventDate && todayDay
										? getDateSinceEvent(
												day.day,
												todayDay,
												selectedLastEventDate,
										  )
										: day.title
								}
								subtitle={selectedLastEventDate ? `(${day.title})` : ''}
								day={getDayLabel(day.day, todayDay)}
							>
								{day.bullets.map((BulletContent, index) => (
									<QuarantaineOverviewBullet key={index}>
										{/* Zie comment in interface, zo gauw dit in Sanity zit,
                    wordt dit waarschijnlijk een wysywig content object, dan renderen
                    we hier niet dit component maar ContentBlock waar we dat content
                    object aan meegeven. */}
										<BulletContent />
									</QuarantaineOverviewBullet>
								))}
							</QuarantaineOverviewBlock>
						))}

						<Box sx={{ mt: 'box' }}>
							<GGDSpecialInstructions />
						</Box>
					</BodyContainer>
				</Box>
				<BodyContainer sx={{ mt: '32px' }}>
					<Box
						sx={{
							width: '380px',
							maxWidth: '100%',
							button: {
								background: 'transparent',
								p: 0,
								border: 0,
								width: '100%',
								mb: 'box',
								':hover, :focus': {
									'> span': {
										backgroundColor: '#fcfeff',
									},
								},
								'> span': {
									border: 'none',
									backgroundColor: '#eef7fB',
									transition: 'background 300ms ease-in-out',
									p: { fontWeight: 'normal', fontSize: '19px' },
									backgroundImage: 'none',
									padding: '14px',
								},
								svg: {
									width: '24px',
									height: '18px',
								},
							},
						}}
					>
						<Link
							styledAs="button"
							href={pageSettings.quarantaineGidsUrl}
							external
						>
							{pageSettings.quarantaineGidsButtonText}
						</Link>

						<Text variant="small">{pageSettings.quarantaineGidsText}</Text>

						<SaveInCalendar
							// @TODO: Locale
							locale="nl"
							content={{
								tot_en_met: pageSettings.tot_en_met,
								other_calendar: pageSettings.other_calendar,
							}}
							title={pageSettings.calendar.title}
							modalTitle={pageSettings.calendar.modalTitle}
							modalBody={pageSettings.calendar.modalBody}
							inviteTitle={pageSettings.calendar.inviteTitle}
							inviteText={pageSettings.calendar.inviteText}
							fromDate={new Date(12, 5, 2021)}
							toDate={new Date(18, 5, 2021)}
							hideDate
						/>
						<button onClick={() => window.print()}>
							<CallToAction icon={PrinterIcon}>
								<p>{pageSettings.printCta}</p>
							</CallToAction>
						</button>
					</Box>
				</BodyContainer>
			</Page>
		</>
	);
}

interface SituatieStaticProps {
	params: { locale: 'nl' | 'en' };
}

export async function getStaticPaths() {
	const situations = await getSituations();

	return {
		paths: situations.map((situation) => ({
			params: {
				situatie: situation,
				locale: 'nl',
			},
		})),
		fallback: false,
	};
}

export const getStaticProps = async ({
	params: { locale },
}: SituatieStaticProps) => {
	const pageProjection = `{
		"metaData": {
			${getLocaleProperty({ name: 'title', path: 'metaData.title', locale })},
			${getLocaleProperty({
				name: 'description',
				path: 'metaData.description',
				locale,
			})},
		},
		"header": {
			${getLocaleProperty({ name: 'button', path: 'header.button', locale })},
			${getLocaleProperty({ name: 'pretitle', path: 'header.pretitle', locale })},
			${getLocaleProperty({ name: 'subtitle', path: 'header.subtitle', locale })},
			${getLocaleProperty({ name: 'title', path: 'header.title', locale })},
		},
		"uitleg": uitleg[]{
			"image": "/images/sanity/" + image.asset->originalFilename,
			${getLocaleProperty({ name: 'description', locale })},
			${getLocaleProperty({ name: 'pretitle', locale })},
			${getLocaleProperty({ name: 'title', locale })},
			"linklist": {
				${getLocaleProperty({ name: 'id', path: 'linklist.id', locale })},
				${getLocaleProperty({ name: 'usp', path: 'linklist.usp', locale })},
			},
		},
		url,
	}`;

	const { page, siteSettings } = await sanityClient.fetch(
		getPageQuery({
			site: 'reizen-tijdens-corona',
			type: 'landing-page',
			pageProjection,
			locale,
		}),
	);

	return {
		props: {
			page,
			siteSettings,
			locale,
		},
	};
};
