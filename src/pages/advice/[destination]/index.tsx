/** @jsx jsx */
import React, {useState} from 'react';
import { jsx, Container, Button } from 'theme-ui';
import Link from 'next/link';
import AdviceHeader from 'components/advice/AdviceHeader';
import InternalLink from 'components/content/InternalLink';
import PeriodSelect from 'components/advice/PeriodSelect';
import BodyContainer from 'components/BodyContainer';
import { formatPeriod, parseDestination } from 'utilities/pathUtils';

const Period = (props: any) => {
    const [country, city] = parseDestination(props.destination as string);

    const [fromDate, setFromDate] = useState<Date>();
    const [toDate, setToDate] = useState<Date>();

    const updateDate = (from: Date, to?: Date) => {
        setFromDate(from);
        setToDate(to);
    };

    const resultLink = () => `${props.destination}/${formatPeriod(fromDate as Date, toDate as Date)}`;

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
            <BodyContainer>
            <PeriodSelect city={city} country={country}
                              onUpdate={updateDate}/>
              <Container sx={{padding: '1em'}}>
                { (fromDate && toDate && country) &&
                  <Link href={resultLink()}>
                      <Button sx={{
                          width: ['100%', '25%'],
                          float: 'right',
                           padding: '0.8em',
                           fontSize: '1.2em',
                           fontFamily: 'body',
                           fontWeight: 'bold',
                           backgroundColor: 'button'
                           }}>Toon het resultaat</Button>
                  </Link>
                }
               </Container>
            </BodyContainer>
        </>
    )
};

export async function getServerSideProps(context: any) {
    return { props: context.params };
};

export default Period;
