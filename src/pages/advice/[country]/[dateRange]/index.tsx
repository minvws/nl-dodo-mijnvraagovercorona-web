/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx, Container, Button } from 'theme-ui';
import LandingHeader from '../../../../components/LandingHeader';
import TravelPlan from '../../../../components/TravelPlan';

const parseDateRange = (rangeStr: (string | string[] | undefined)): Date[] => {
    if (!rangeStr) {
        return [new Date(), new Date()];
    }
    const input = Array.isArray(rangeStr) ? rangeStr[0] : rangeStr;
    return input.split('_').map(Date.parse).map(timestamp => new Date(timestamp));
}

const AdviceResult = () => {
    const router = useRouter();
    const { country, dateRange } = router.query;
    const [fromDate, toDate] = parseDateRange(dateRange);
    const travelInPast = Date.now() > fromDate.getTime();

    return (
        <>
            <LandingHeader
                message={travelInPast ? "Je was in een hoogrisicogebied"
                       : "Je gaat naar een hoogrisicogebied" }>
                <ul sx={{
                    fontFamily: 'body',
                    listStyleImage: 'url("/icons/Polygon 6.svg")',
                    marginLeft: '-1em',
                    paddingTop: '1em',
                    lineSpacing: '2em'
                }}>
                    <li>Het aantal besmettingen op jouw bestemming was <strong>hoog</strong>.</li>
                    <li>Er is een verhoogd risico dat <strong>besmet</strong> bent geraakt.</li>
                    <li>Het dringend advies is om <strong>10 dagen in thuisquarantain te gaan</strong>.</li>
                </ul>
            </LandingHeader>
            <Container
                sx={{
                    padding: '1em',
                    color: 'header'
                }}>
                <h2>Jouw reisschema</h2>
                <TravelPlan destination={country as string} fromDate={fromDate} toDate={toDate} />
            </Container>
        </>
    );
}

export default AdviceResult;
