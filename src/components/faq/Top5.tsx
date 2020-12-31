/** @jsx jsx */
import { jsx, Link } from 'theme-ui';
import ExpansionPanel from '../ExpansionPanel';

const FAQTop5 = () => {
    return (
        <>
            <ExpansionPanel text="Wat houdt thuisquarantaine in?">
                Thuisquarantaine betekent dat je thuisblijft en geen bezoek ontvangt. Dit doe je als je risico hebt gelopen om met corona besmet te zijn. Door in thuisquarantaine te gaan voorkom je dat het coronavirus zich verder verspreidt.
            </ExpansionPanel>
            <hr/>
            <ExpansionPanel text="Wie moeten allemaal in thuisquarantaine?">
                Iedereen die in een gebied is geweest met een oranje reisadvies, waarbij geldt dat je bij thuiskomst in thuisquarantaine moet.
            </ExpansionPanel>
            <hr/>
            <ExpansionPanel text="Waarom heb ik een negatieve testuitslag en negatieve testverklaring nodig?">
                Dit is één van de Nederlandse maatregelen om de import en verspreiding van het coronavirus tegen te gaan.
                Je kan <Link href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/negatieve-covid-19-testverklaring">hier</Link> meer lezen
            </ExpansionPanel>
            <hr/>
            <ExpansionPanel text="Kan ik de 10 dagen thuisquarantaine inkorten?">
                Nee, als je in thuisquarantaine bent omdat je in een risicogebied bent geweest, dan moet je altijd de 10 dagen thuisquarantaine af maken.
            </ExpansionPanel>
            <hr/>
            <ExpansionPanel text="Welke eisen worden gesteld aan de negatieve testuitslag?">
                De negatieve testuitslag moet in het Engels, Duits, Frans, Spaans of Nederlands zijn. Het document wordt op 5 punten gecontroleerd:
                <ul>
                    <li>Type test: dit moet een moleculaire PCR-test zijn en een test op Sars-Cov-2/COVID-19. Een ander type test, inclusief een sneltest, is niet geldig;</li>
                    <li>Testresultaat: moet negatief (of niet gedetecteerd) zijn;</li>
                    <li>Voor- en achternaam: overeenkomstig met het paspoort;</li>
                    <li>Datum en tijd van afname van de test: De test is maximaal 72 uur oud bij aankomst in Nederland;</li>
                    <li>Gegevens instituut of laboratorium dat de test afnam.</li>
                </ul>
                Meer informatie kan je <Link href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/reizen-en-vakantie/inreizen-doorreizen-nederland-en-het-eu-inreisverbod/reizigers-van-binnen-de-eu-schengen">hier</Link> vinden
            </ExpansionPanel>
        </>
    );
}

export default FAQTop5;
