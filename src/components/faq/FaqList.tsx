/** @jsx jsx */
import React from 'react';
import Link from 'next/link';

import { jsx } from 'theme-ui';

import { FaqItem } from 'components/faq/FaqItem';

import { Country, RiskLevel } from 'config/countries';

interface FaqListProps {
	limit?: number;
	country: Country | null;
}

const faqs: {
	'voor-vertrek': {
		[key: string]: () => [string, React.ReactNode];
	};
	'tijdens-je-reis': {
		[key: string]: (
			showNegativeTestDeclaration?: boolean,
		) => [string, React.ReactNode];
	};
	'na-thuiskomst': {
		[key: string]: () => [string, React.ReactNode];
	};
} = {
	'voor-vertrek': {
		whatNecessary: () => [
			'Wat valt onder een noodzakelijke reis?',
			<p>
				Blijf in Nederland tot en met 31 maart en boek geen reizen.
				Uitzonderingen worden gemaakt voor werk in het buitenland met grote
				economische belangen en een (aanstaand) sterfgeval in de naaste
				omgeving. Vakantiereizen, familiebezoek of op vakantie naar een tweede
				huis zijn geen noodzakelijke reizen. Ook het fysiek bezoeken van een
				organisatie in het buitenland is in veel gevallen niet noodzakelijk.
			</p>,
		],
		whyRisk: () => [
			'Waarom is reizen naar het buitenland zo’n groot risico?',
			<p>
				Wanneer je besmet raakt in het buitenland, kun je thuis anderen
				besmetten. Ook met een andere, besmettelijkere variant van het virus. Ga
				niet op reis, blijf in Nederland en boek geen reizen.
			</p>,
		],
		whyQuarantine: () => [
			'Waarom moet ik na mijn reis in thuisquarantaine?',
			<p>
				Het kan 10 dagen duren voordat je klachten krijgt nadat je besmet bent
				met corona. Daarom is het belangrijk 10 dagen in thuisquarantaine te
				gaan. Er zijn ook mensen die helemaal geen klachten krijgen, maar wel
				besmet zijn met corona. Zij kunnen andere mensen besmetten als zij niet
				thuisblijven.
			</p>,
		],
		whatIsQuarantine: () => [
			'Wat houdt thuisquarantaine in?',
			<p>
				Thuisquarantaine betekent dat je thuisblijft en geen bezoek ontvangt.
				Dit doe je als je risico hebt gelopen om met corona besmet te zijn. Door
				in thuisquarantaine te gaan voorkom je dat het coronavirus zich verder
				verspreidt. Lees{' '}
				<Link href="/voorbereiding" passHref>
					<a
						sx={{
							color: 'text',
							textDecoration: 'underline',
							cursor: 'pointer',
						}}
					>
						hier
					</a>
				</Link>{' '}
				meer over wat je moet regelen voor je thuisquarantaine.
			</p>,
		],
		rulesVacination: () => [
			'Gelden er andere regels als je al gevaccineerd bent?',
			<p>
				Nee, ook als je gevaccineerd bent ga je in thuisquarantaine na je reis.
			</p>,
		],
		whoQuarantine: () => [
			'Wie moeten allemaal in thuisquarantaine?',
			<p>
				Iedereen die in een gebied is geweest met een oranje reisadvies, waarbij
				geldt dat je bij thuiskomst in thuisquarantaine moet.
			</p>,
		],
	},
	'tijdens-je-reis': {
		whyNegativeTest: (showNegativeTestDeclaration: boolean | undefined) =>
			showNegativeTestDeclaration
				? [
						'Waarom heb ik een negatieve testuitslag en een negatieve testverklaring nodig?',
						<p>
							U moet als reiziger uit een hoogrisicoland een negatieve
							testuitslag laten zien als u naar Nederland reist. Dit is omdat
							reizigers uit hoog-risicogebieden een risico vormen op de import
							en verspreiding van het coronavirus. De verplichte testuitslag
							vervangt nooit andere coronamaatregelen, zoals het inreisverbod,
							quarantaine of vaccinatie. Je kan{' '}
							<a
								href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/negatieve-covid-19-testuitslag-aankomst-nederland/negatieve-testuitslag-buiten-eu-en-schengen"
								target="_blank"
								rel="noopener noreferrer"
							>
								hier
							</a>{' '}
							meer lezen.
						</p>,
				  ]
				: [
						'Waarom heb ik een negatieve testuitslag nodig?',
						<p>
							U moet als reiziger uit een hoogrisicoland een negatieve
							testuitslag laten zien als u naar Nederland reist. Dit is omdat
							reizigers uit hoog-risicogebieden een risico vormen op de import
							en verspreiding van het coronavirus. De verplichte testuitslag
							vervangt nooit andere coronamaatregelen, zoals het inreisverbod,
							quarantaine of vaccinatie. Je kan{' '}
							<a
								href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/negatieve-covid-19-testuitslag-aankomst-nederland/negatieve-testuitslag-binnen-eu-en-schengen"
								target="_blank"
								rel="noopener noreferrer"
							>
								hier
							</a>{' '}
							meer lezen.
						</p>,
				  ],
		whichRequirements: () => [
			'Welke eisen worden gesteld aan de negatieve testuitslag?',
			<>
				<p>
					De negatieve testuitslag moet in het Engels, Duits, Frans, Spaans of
					Nederlands zijn. Het document wordt op 5 punten gecontroleerd:
				</p>
				<ul>
					<li>
						Type test: dit moet een moleculaire PCR-test zijn en een test op
						Sars-Cov-2/COVID-19. Een ander type test, inclusief een sneltest, is
						niet geldig;
					</li>
					<li>Testresultaat: moet negatief (of niet gedetecteerd) zijn;</li>
					<li>Voor- en achternaam: overeenkomstig met het paspoort;</li>
					<li>
						Datum en tijd van afname van de test: de test is maximaal 72 uur oud
						bij aankomst in Nederland;
					</li>
					<li>Gegevens instituut of laboratorium dat de test afnam.</li>
				</ul>
				<p>
					Meer informatie kan je{' '}
					<a
						href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/negatieve-covid-19-testuitslag-aankomst-nederland"
						target="_blank"
						rel="noopener noreferrer"
					>
						hier
					</a>{' '}
					vinden.
				</p>
				<p>
					De negatieve sneltestuitslag moet in het Engels, Duits, Frans,
					Italiaans, Portugees, Spaans of Nederlands zijn. Het document wordt op
					5 punten gecontroleerd:
				</p>
				<ul>
					<li>
						Type test: dit moet een sneltest (antigeen of LAMP-test) of PCR-test
						zijn.
					</li>
					<li>
						Testresultaat: moet negatief op SARS-CoV-2 (of niet gedetecteerd)
						zijn
					</li>
					<li>
						Voor- en achternaam: overeenkomstig met het paspoort. Datum en tijd
						van afname van de test: de test is maximaal 4 uur oud bij het aan
						boord gaan van het vliegtuig of de ferry. Voor transportmedewerkers
						geldt dat de test maximaal 24 uur oud is bij het aan boord gaan van
						de ferry.
					</li>
					<li>
						Op de testuitslag staat een logo of kenmerk van een instituut of
						arts.
					</li>
				</ul>
				<p>
					De testuitslag mag zowel op papier als digitaal worden getoond. Meer
					informatie kan je{' '}
					<a
						href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/verplichte-negatieve-covid-19-testuitslagen/eisen-sneltest"
						target="_blank"
						rel="noopener noreferrer"
					>
						hier
					</a>{' '}
					vinden.
				</p>
			</>,
		],
		howToGetTestresult: (showNegativeTestDeclaration: boolean | undefined) =>
			showNegativeTestDeclaration
				? [
						'Hoe kom ik aan een (negatieve) testuitslag en een negatieve testverklaring?',
						<>
							<p>
								Je kan een test laten afnemen bij een gevalideerd testcentrum
								(bv. laboratorium, arts, gezondheidsdienst, etc) op je
								reisbestemming. Lees{' '}
								<a
									href="https://www.nederlandwereldwijd.nl/documenten/vragen-en-antwoorden/waar-kan-ik-een-pcr-of-sneltest-laten-doen-in-het-buitenland"
									target="_blank"
									rel="noopener noreferrer"
								>
									hier
								</a>{' '}
								meer. Let erop dat de test voldoet aan de eisen die Nederland
								stelt hieraan. Zie hiervoor de andere veelgestelde vraag. De
								negatieve testverklaring is verplicht wanneer je van buiten de
								EU/Schengen gebied afreist naar Nederland.
							</p>
							<p>
								Meer informatie hierover kan je{' '}
								<a
									href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/negatieve-covid-19-testuitslag-aankomst-nederland/negatieve-testuitslag-buiten-eu-en-schengen"
									target="_blank"
									rel="noopener noreferrer"
								>
									hier
								</a>{' '}
								vinden.
							</p>
						</>,
				  ]
				: [
						'Hoe kom ik aan een (negatieve) testuitslag?',
						<p>
							Je kan een test laten afnemen bij een gevalideerd testcentrum (bv.
							laboratorium, arts, gezondheidsdienst, etc) op je reisbestemming.
							Lees{' '}
							<a
								href="https://www.nederlandwereldwijd.nl/documenten/vragen-en-antwoorden/waar-kan-ik-een-pcr-of-sneltest-laten-doen-in-het-buitenland"
								target="_blank"
								rel="noopener noreferrer"
							>
								hier
							</a>{' '}
							meer. Let erop dat de test voldoet aan de eisen die Nederland
							stelt hieraan. Zie hiervoor de andere veelgestelde vraag.
						</p>,
				  ],
		whatToDoPositive: () => [
			'Wat moet ik doen als de testuitslag voor terugkeer naar Nederland positief is?',
			<p>
				Blijf in uw accommodatie en vermijd contact met anderen. Neem ook
				contact op met de GGD in uw woonplaats in Nederland en volg de
				maatregelen of adviezen van de lokale gezondheidsautoriteiten. Mogelijk
				moeten ook uw huisgenoten en/of reisgenoten in quarantaine. Wanneer je
				geen klachten meer hebt en negatief test op corona, mag je terug naar
				Nederland reizen.
			</p>,
		],
	},
	'na-thuiskomst': {
		whyTenDays: () => [
			'Waarom moet ik 10 dagen in thuisquarantaine?',
			<p>
				Het kan 10 dagen duren voordat je klachten krijgt nadat je besmet bent
				met corona. Daarom is het belangrijk 10 dagen in thuisquarantaine te
				gaan. Na 10 dagen is de kans dat je nog coronaklachten krijgt erg klein.
				Je kan je thuisquarantaine verkorten door op dag 5 na thuiskomst een
				testafspraak in te plannen. Als de testuitslag negatief is, mag je uit
				quarantaine. Is de testuitslag positief? Blijf dan thuis en volg het
				advies van de GGD op.
			</p>,
		],
		negativeTestQuarantaine: () => [
			'Ik ben in het buitenland al (negatief) getest. Moet ik toch in thuisquarantaine?',
			<p>
				Ja. Testen is echt een momentopname. Het kan tot 10 dagen duren voordat
				je klachten krijgt. Het kan dus zijn dat je te vroeg bent getest in het
				buitenland. Daarom moet je bij terugkomst alsnog 10 dagen in
				thuisquarantaine. Je kan je thuisquarantaine verkorten door op dag 5 na
				thuiskomst een testafspraak in te plannen. Als de testuitslag negatief
				is, mag je uit quarantaine. Is de testuitslag positief? Blijf dan thuis
				en volg het advies van de GGD op.
			</p>,
		],
		testAgain: () => [
			'Ik ben in het buitenland al (negatief) getest. Moet ik weer getest worden?',
			<p>
				Ja. Testen is echt een momentopname. Het kan tot 10 dagen duren voordat
				je klachten krijgt. Het kan dus zijn dat je te vroeg bent getest in het
				buitenland. Daarom moet je bij terugkomst alsnog 10 dagen in
				thuisquarantaine. Je kan je thuisquarantaine verkorten door op dag 5 na
				thuiskomst een testafspraak in te plannen. Als de testuitslag negatief
				is, mag je uit quarantaine. Is de testuitslag positief? Blijf dan thuis
				en volg het advies van de GGD op.
			</p>,
		],
		canQuarantaineBeShortened: () => [
			'Kan ik de 10 dagen thuisquarantaine inkorten?',
			<p>
				Ja, dat kan. Je kan je thuisquarantaine verkorten door op dag 5 na
				thuiskomst een testafspraak in te plannen. Als de testuitslag negatief
				is, mag je uit quarantaine. Is de testuitslag positief? Blijf dan thuis
				en volg het advies van de GGD op.
			</p>,
		],
		protectOthers: () => [
			'Bescherm ik anderen door in thuisquarantaine te gaan?',
			<p>
				Ja, want als je niet in thuisquarantaine gaat terwijl je wel besmet bent
				met corona, kun je andere mensen besmetten. Bijvoorbeeld als je langs
				gaat bij familie of vrienden. Maar ook in de supermarkt of op straat.
				Ook al ben je zelf misschien niet ziek, andere mensen kunnen erg ziek
				worden van het coronavirus of er zelfs aan overlijden. Bovendien zorgt
				het hoge aantal coronabesmettingen voor teveel druk op de zorg.
			</p>,
		],
		myFamily: () => [
			'Mijn partner, kinderen of huisgenoot zijn niet mee op reis geweest. Moeten zij ook in thuisquarantaine?',
			<p>Nee, alleen de persoon die op reis is geweest moet in quarantaine.</p>,
		],
		testEarlier: () => [
			'Kan ik mij eerder laten testen?',
			<p>
				Nee, eerder dan de 5e dag testen heeft geen zin. Het kan dan namelijk
				zijn dat je te vroeg test om het virus aan te kunnen tonen in de neus-
				en keelholte. De meeste mensen die ziek worden krijgen binnen zeven
				dagen klachten. Twee dagen daarvoor kan een PCR-test het virus al
				aantonen.
			</p>,
		],
	},
};

const isNegativeTestDeclarationNeeded = (country: Country | null) =>
	country?.riskLevel === RiskLevel?.C_VEILIGE_LIJST ||
	country?.riskLevel === RiskLevel?.D_EU_INREISVERBOD;

const FaqList = ({
	stage,
	country,
}: {
	stage: 'voor-vertrek' | 'tijdens-je-reis' | 'na-thuiskomst';
	country: Country | null;
}) => {
	const showNegativeTestDeclaration = isNegativeTestDeclarationNeeded(country);

	return (
		<div sx={{ marginBottom: '36px', ':last-child': { marginBottom: 0 } }}>
			{Object.keys(faqs[stage]).map((key: string) => {
				const [title, children] = faqs[stage][key](showNegativeTestDeclaration);

				return (
					<FaqItem title={title} key={title}>
						{children}
					</FaqItem>
				);
			})}
		</div>
	);
};

const FaqListContainer = ({ children }: { children: React.ReactNode }) => (
	<div
		sx={{
			paddingBottom: '20px',
		}}
	>
		{children}
	</div>
);

export const FaqListShort = ({
	country,
	stage,
}: {
	country: Country | null;
	stage: 'voor-vertrek' | 'tijdens-je-reis' | 'na-thuiskomst';
}) => {
	const showNegativeTestDeclaration = isNegativeTestDeclarationNeeded(country);
	const shortListFaqs = {
		'voor-vertrek': [
			faqs['voor-vertrek'].whatNecessary(),
			faqs['voor-vertrek'].whyRisk(),
			faqs['voor-vertrek'].whyQuarantine(),
			faqs['voor-vertrek'].whatIsQuarantine(),
			faqs['tijdens-je-reis'].whyNegativeTest(showNegativeTestDeclaration),
		],
		'tijdens-je-reis': [
			faqs['tijdens-je-reis'].whyNegativeTest(showNegativeTestDeclaration),
			faqs['tijdens-je-reis'].whichRequirements(),
			faqs['tijdens-je-reis'].howToGetTestresult(showNegativeTestDeclaration),
			faqs['tijdens-je-reis'].whatToDoPositive(),
			faqs['voor-vertrek'].whyQuarantine(),
		],
		'na-thuiskomst': [
			faqs['na-thuiskomst'].whyTenDays(),
			faqs['na-thuiskomst'].negativeTestQuarantaine(),
			faqs['na-thuiskomst'].canQuarantaineBeShortened(),
			faqs['na-thuiskomst'].testEarlier(),
			faqs['voor-vertrek'].rulesVacination(),
		],
	};

	return (
		<FaqListContainer>
			{shortListFaqs[stage].map(([title, children]) => (
				<FaqItem title={title} key={title}>
					{children}
				</FaqItem>
			))}
		</FaqListContainer>
	);
};

export const FaqListComplete = ({ country }: FaqListProps) => (
	<FaqListContainer>
		<h3 sx={{ color: '#CA005D', marginTop: 0, marginBottom: '0' }}>
			Voorbereiding
		</h3>
		<FaqList stage="voor-vertrek" country={country} />
		<h3 sx={{ color: '#CA005D', marginTop: 0, marginBottom: '0' }}>
			Tijdens de reis
		</h3>
		<FaqList stage="tijdens-je-reis" country={country} />
		<h3 sx={{ color: '#CA005D', marginTop: 0, marginBottom: '0' }}>
			Thuiskomst
		</h3>
		<FaqList stage="na-thuiskomst" country={country} />
	</FaqListContainer>
);
