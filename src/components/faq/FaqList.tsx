/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';
import FaqItem from 'components/faq/FaqItem';

type FaqListProps = {
	limit?: number;
};

const faqs: Array<[string, any]> = [
	[
		'Wat houdt thuisquarantaine in?',
		<p>
			Thuisquarantaine betekent dat je thuisblijft en geen bezoek ontvangt. Dit
			doe je als je risico hebt gelopen om met corona besmet te zijn. Door in
			thuisquarantaine te gaan voorkom je dat het coronavirus zich verder
			verspreidt.
		</p>,
	],
	[
		'Wie moeten allemaal in thuisquarantaine?',
		<p>
			Iedereen die in een gebied is geweest met een oranje reisadvies, waarbij
			geldt dat je bij thuiskomst in thuisquarantaine moet.
		</p>,
	],
	[
		'Waarom heb ik een negatieve testuitslag en negatieve testverklaring nodig?',
		<p>
			Dit is een van de Nederlandse maatregelen om de import en verspreiding van
			het coronavirus tegen te gaan. Je kan{' '}
			<a
				href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/negatieve-covid-19-testverklaring"
				target="_blank"
				rel="noopener noreferrer"
			>
				hier
			</a>{' '}
			meer lezen
		</p>,
	],
	[
		'Kan ik de 10 dagen thuisquarantaine inkorten?',
		<p>
			Nee, als je in thuisquarantaine bent omdat je in een risicogebied bent
			geweest, dan moet je altijd de 10 dagen thuisquarantaine af maken.
		</p>,
	],
	[
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
					Datum en tijd van afname van de test: De test is maximaal 72 uur oud
					bij aankomst in Nederland;
				</li>
				<li>Gegevens instituut of laboratorium dat de test afnam.</li>
			</ul>
			<p>
				Meer informatie kan je{' '}
				<a
					href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/reizigers-van-binnen-de-eu-schengen"
					target="_blank"
					rel="noopener noreferrer"
				>
					hier
				</a>{' '}
				vinden
			</p>
		</>,
	],
	[
		'Hoe kom ik aan een (negatieve) testuitslag en een negatieve testverklaring?',
		<>
			<p>
				Je kan een test laten afnemen bij een gevalideerd testcentrum (bv.
				laboratorium, arts, gezondheidsdienst, etc) op je reisbestemming. Let
				erop dat de test voldoet aan de eisen die Nederland stelt hieraan. Zie
				hiervoor de andere veelgestelde vraag. De negatieve testverklaring is
				verplicht wanneer je van buiten de EU/Schengen gebied afreist naar
				Nederland.
			</p>
			<p>
				Meer informatie hierover kan je{' '}
				<a
					href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/reizigers-van-buiten-de-eu-schengen"
					target="_blank"
					rel="noopener noreferrer"
				>
					hier
				</a>{' '}
				vinden
			</p>
		</>,
	],
	[
		'Ik heb nergens last van, waarom moet ik in thuisquarantaine?',
		<p>
			Het kan 10 dagen duren voordat je klachten krijgt nadat je besmet bent met
			corona. Daarom is het belangrijk 10 dagen in thuisquarantaine te gaan. Er
			zijn ook mensen die helemaal geen klachten krijgen, maar wel besmet zijn
			met corona. Zij kunnen andere mensen besmetten als zij niet thuisblijven.
		</p>,
	],
	[
		'Bescherm ik anderen door in thuisquarantaine te gaan?',
		<p>
			Ja, want als je niet in thuisquarantaine gaat terwijl je wel besmet bent
			met corona, kun je andere mensen besmetten. Bijvoorbeeld als je langs gaat
			bij familie of vrienden. Maar ook in de supermarkt of op straat. Ook al
			ben je zelf misschien niet ziek, andere mensen kunnen erg ziek worden van
			het coronavirus of er zelfs aan overlijden. Bovendien zorgt het hoge
			aantal coronabesmettingen voor teveel druk op de zorg.
		</p>,
	],
	[
		'Waarom moet ik 10 dagen in thuisquarantaine?',
		<p>
			Het kan 10 dagen duren voordat je klachten krijgt nadat je besmet bent met
			corona. Daarom is het belangrijk 10 dagen in thuisquarantaine te gaan. Na
			10 dagen is de kans dat je nog coronaklachten krijgt erg klein.
		</p>,
	],
	[
		'Mijn partner, kinderen of huisgenoot zijn niet mee op reis geweest. Moeten zij ook in thuisquarantaine?',
		<p>Nee, alleen de persoon die op reis is geweest moet in quarantaine.</p>,
	],
	[
		'Ik ben in het buitenland al (negatief) getest. Moet ik toch in thuisquarantaine?',
		<p>
			Ja. Testen is echt een momentopname. Het kan tot 10 dagen duren voordat je
			klachten krijgt. Het kan dus zijn dat je te vroeg bent getest in het
			buitenland. Daarom moet je bij terugkomst alsnog 10 dagen in
			thuisquarantaine.
		</p>,
	],
];

const FaqList = ({ limit = faqs.length }: FaqListProps) => {
	return (
		<div
			sx={{
				paddingBottom: '20px',
			}}
		>
			{faqs.slice(0, limit).map(([title, content]) => (
				<FaqItem key={title} title={title}>
					{content}
				</FaqItem>
			))}
		</div>
	);
};

export default FaqList;
