/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';
import CopyParagraph from './CopyParagraph';

const CopySection = () => {
    return (
        <Container
            sx={{
                paddingTop: '3em',
                margin: '1em',
                color: 'header',
                p: {
                    fontSize: '16pt',
                    marginBottom: '2em',
                    lineHeight: '1.5em',
                    marginRight: '1.3em'
                },
                h3: {
                    margin: '0.1em 0',
                    fontSize: '24pt'
                },
                h6: {
                    fontSize: '14pt',
                    margin: '1.4em 0 0.5em 0'
                },
                img: {
                    marginLeft: '-2.2em'
                }
            }}>
            <CopyParagraph imageUrl="/images/Illustratie_Neem_het_virus_niet_meeRetina.svg"
                         imageAlignment="right">
                <h6>Waarom is dit belangrijk?</h6>
                <h3>Neem uit het buitenland het virus niet mee naar huis</h3>
                <p>
                    Wanneer je besmet raakt in het buitenland, kun je thuis anderen besmetten. Dit kan ook een andere variant zijn van het virus. Deze check helpt je de juiste keuzes te maken voor, tijdens en na je reis.
                </p>
            </CopyParagraph>
            <CopyParagraph imageUrl="/images/Illustratie_De_situatie_op_bestemmingRetina.svg"
                         imageAlignment="left">
                <h6>Hoe werkt het?</h6>
                <h3>Ontdek de situatie op je bestemming</h3>
                <p>
                    Op basis van je reisgegevens kijken we naar de actuele situatie op je bestemming. Zo kunnen we direct vertellen waar je rekening mee moet houden.
                </p>
            </CopyParagraph>
            <CopyParagraph imageUrl="/images/Illustratie_Mobiel_We_vertellen_je_hoe_het_zitRetina.svg"
                         imageAlignment="right">
                <h6>Het resultaat</h6>
                <h3>We vertellen je precies hoe het zit</h3>
                <p>
                    Na de check weet je welke richtlijnen bekend zijn voor je reisbestemming, wat je moet regelen voor je terugreis en thuiskomst.
                </p>
            </CopyParagraph>
            <CopyParagraph imageUrl="/images/Illustratie_We_helpen_je_op_wegRetina.svg"
                         imageAlignment="left">
                <h6>Het resultaat</h6>
                <h3>We helpen je op weg</h3>
                <p>
                    Ben je tijdens je reis in een gebied geweest met een oranje reisadvies? Vaak heb je voor je terugreis een negaieve testuitslag en verklaring nodig en moet je bij thuiskomst 10 dagen in thuisquarantaine. We helpen je met informatie en tips om alles goed te regelen.
                </p>
            </CopyParagraph>

        </Container>
    );
};

export default CopySection;
