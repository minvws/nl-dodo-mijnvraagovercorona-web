/** @jsx jsx */
import { jsx, Container, Button, Link, Image } from 'theme-ui';
import LandingHeader from '../../../../components/LandingHeader';
import TravelPlan from '../../../../components/TravelPlan';
import Footer from '../../../../components/content/Footer';
import { parseDestination, parsePeriod } from '../../../../utilities/pathUtils';

type AdviceProps = {
    destination: string,
    dateRange: string
}

const AdviceResult = ({ destination, dateRange }: AdviceProps) => {
    const [fromDate, toDate] = parsePeriod(dateRange as string);
    const [country, city] = parseDestination(destination as string);
    const travelInPast = Date.now() > fromDate.getTime();

    return (
        <>
            <LandingHeader
                message={travelInPast ? "Je was in een hoogrisicogebied"
                       : "Je gaat naar een hoogrisicogebied" }>
                <Link href="/advice" sx={{
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
                        paddingRight: '0.5em'
                    }
                }}>
                    opnieuw
                </Link>
                <ul sx={{
                    fontFamily: 'body',
                    listStyleImage: 'url("/icons/Polygon 6.svg")',
                    marginLeft: '-1em',
                    lineSpacing: '2em',
                    fontSize: '14pt',
                    li: {
                        paddingTop: '1em'
                    }
                }}>
                    <li>Er is een verhoogd risico dat je <strong>besmet</strong> bent geraakt.</li>
                    <li>Reis je terug per vliegtuig of boot? Dan heb je een <strong>negatieve testuitslag en verklaring</strong> nodig.</li>
                    <li>Het dringend advies is om <strong>10 dagen in thuisquarantain te gaan</strong>.</li>
                </ul>
            </LandingHeader>
            <Container
                sx={{
                    padding: '1em',
                    marginTop: '1em',
                    color: 'header'
                }}>
                <h2>Jouw reisschema</h2>
                <TravelPlan country={country} city={city} fromDate={fromDate} toDate={toDate} />
            </Container>
            <Footer />
        </>
    );
}

export async function getServerSideProps(context: any) {
    return { props: context.params };
};

export default AdviceResult;
