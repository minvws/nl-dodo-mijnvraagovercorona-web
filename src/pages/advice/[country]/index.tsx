/** @jsx jsx */
import React, {useState} from 'react';
import { jsx, Container, Button } from 'theme-ui';
import { useRouter } from 'next/router';
import Link from 'next/link';
import AdviceHeader from '../../../components/advice/AdviceHeader';
import InternalLink from '../../../components/content/InternalLink';
import PeriodSelect from '../../../components/PeriodSelect';

const Period = () => {
    const router = useRouter();
    const { country } = router.query;

    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();

    const updateDate = (from: Date, to: Date) => {
        setFromDate(from);
        setToDate(to);
    };

    const resultLink = () => {
        const from = fromDate;
        const to = toDate;
        if (from != null && to != null) {
            const fromFormatted = from ? from.toISOString().substr(0, 10) : '';
            const toFormatted = to ? to.toISOString().substr(0, 10) : '';

            return `${country}/${fromFormatted}_${toFormatted}`;
        }
        return '';
    }

    const getCountry = (): string => "" + country;

    return (
        <>
            <AdviceHeader
                header="In welke periode ben of was je daar?"
                questionStage={2}
                totalStages={2}>
                <InternalLink href="">
                    Waarom vragen we dit?
                </InternalLink>
            </AdviceHeader>
            <Container>
            <PeriodSelect city={getCountry()} country={getCountry()}
                              onUpdate={updateDate}/>
              <Container sx={{padding: '1em'}}>
                { (country && fromDate && toDate) &&
                  <Link href={resultLink()}>
                      <Button sx={{
                           width: '100%',
                           padding: '0.8em',
                           fontSize: '1.2em',
                           fontFamily: 'body',
                           fontWeight: 'bold',
                           backgroundColor: 'button'
                           }}>Toon het resultaat</Button>
                  </Link>
                }
               </Container>
            </Container>
        </>
    )
};

export default Period;
