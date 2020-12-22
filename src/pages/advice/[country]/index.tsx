/** @jsx jsx */
import { jsx, Container, Button } from 'theme-ui';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdviceHeader from '../../../components/advice/AdviceHeader';
import ExpandingInfoPanel from '../../../components/ExpandingInfoPanel';
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';

const Period = () => {
    const router = useRouter();
    const { country } = router.query;
    return (
        <>
            <AdviceHeader
                header="In welke periode ben of was je daar?"
                questionStage={2}
                totalStages={2}>
                <ExpandingInfoPanel title="Waarom vragen we dit?"   />
            </AdviceHeader>
            <Container>
                <h5>{country}</h5>
                <DayPicker
                    numberOfMonths={2}
                />

                <Link
                    href={`${country}/2020-12-02_2020-12-22`}>
                <Button
                    sx={{
                        width: '100%',
                        padding: '0.8em',
                        marginTop: '1em',
                        fontSize: '1.2em'
                    }}>Toon het resultaat</Button>
                </Link>
            </Container>
        </>
    )
};

export default Period;
