/** @jsx jsx */
import { Container, jsx } from 'theme-ui';
import CopyParagraph from './CopyParagraph';

const CopySection = () => {
	return (
		<Container>
			<CopyParagraph
				imageUrl="/images/Illustratie_Neem_het_virus_niet_meeRetina.svg"
				imageAlignment="right"
			>
				<h4>Waarom is dit belangrijk?</h4>
				<h3>Neem uit het buitenland het virus niet mee naar huis</h3>
				<p className="large">
					Wanneer je besmet raakt in het buitenland, kun je thuis anderen
					besmetten. Ook met een andere, besmettelijkere variant van het virus.
					Deze check helpt je de juiste keuzes te maken voor, tijdens en na je
					reis.
				</p>
			</CopyParagraph>
			<CopyParagraph
				id="snel"
				imageUrl="/images/Illustratie_De_situatie_op_bestemmingRetina.svg"
				imageAlignment="left"
			>
				<h4>Hoe werkt het?</h4>
				<h3>Ontdek de situatie op je bestemming</h3>
				<p className="large">
					Op basis van je reisgegevens kijken we naar de actuele situatie op je
					bestemming. Zo kunnen we direct vertellen waar je rekening mee moet
					houden.
				</p>
			</CopyParagraph>
			<CopyParagraph
				id="actueel"
				imageUrl="/images/Illustratie_Mobiel_We_vertellen_je_hoe_het_zitRetina.svg"
				imageAlignment="right"
			>
				<h4>Het resultaat</h4>
				<h3>We vertellen je precies hoe het zit</h3>
				<p className="large">
					Na de check weet je welke richtlijnen bekend zijn voor je
					reisbestemming, wat je moet regelen voor je terugreis en thuiskomst.
				</p>
			</CopyParagraph>
			<CopyParagraph
				id="thuis-quarantaine"
				imageUrl="/images/Illustratie_We_helpen_je_op_wegRetina.svg"
				imageAlignment="left"
			>
				<h4>Het resultaat</h4>
				<h3>We helpen je op weg</h3>
				<p className="large">
					Ben je tijdens je reis in een gebied geweest met een oranje
					reisadvies? Vaak heb je voor je terugreis een negatieve testuitslag en
					verklaring nodig en moet je bij thuiskomst 10 dagen in
					thuisquarantaine. We helpen je met informatie en tips om alles goed te
					regelen.
				</p>
			</CopyParagraph>
		</Container>
	);
};

export default CopySection;
