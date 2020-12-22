/** @jsx jsx */
import { useRouter } from 'next/router';
import { jsx, Container, Button } from 'theme-ui';
import AdviceHeader from '../../../../components/advice/AdviceHeader';

const AdviceResult = () => {
    const router = useRouter();
    const { country, dateRange } = router.query;
    return (
        <>
            <AdviceHeader
                header="Je was in een hoogrisicogebied"
            >
                <ul>
                    <li>Het aantal besmettingen op jouw bestemming was <strong>hoog</strong>.</li>
                    <li>Er is een verhoogd risico dat <strong>besmet</strong> bent geraakt.</li>
                    <li>Het dringend advies is om <strong>10 dagen in thuisquarantain te gaan</strong>.</li>
                </ul>
            </AdviceHeader>
            <div>{country}, {dateRange}</div>
        </>
    );
}

export default AdviceResult;
