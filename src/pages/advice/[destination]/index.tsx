/** @jsx jsx */
import React, {useState} from 'react';
import { jsx, Container, Button } from 'theme-ui';
import Link from 'next/link';
import AdviceHeader from 'components/advice/AdviceHeader';
import { InternalLink } from 'components/Links';
import PeriodSelect from 'components/advice/PeriodSelect';
import DataProtectionPanel from 'components/DataProtectionPanel';
import BodyContainer from 'components/structure/BodyContainer';
import Footer from 'components/structure/Footer';
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

            <PeriodSelect city={city} country={country}
                onUpdate={updateDate}/>
            <BodyContainer>
        { (fromDate && toDate && country) &&
          <div sx={{
              textAlign: 'right',
              paddingRight: 'mobilePadding',
              paddingTop: ['auto', '51px'],
              paddingBottom: ['auto', '63px']
          }}>
                <Link href={resultLink()}>
                    <Button sx={{
                        width: ['100%', 'auto'],
                        paddingLeft: ['auto', 'buttonPadding'],
                        paddingRight: ['auto', 'buttonPadding'],
                        paddingTop: ['16px', '15px'],
                        paddingBottom: ['16px', '15px'],
                        fontSize: ['buttonMobile', 'button'],
                        fontFamily: 'body',
                        fontWeight: 'bold',
                        backgroundColor: 'button'
                    }}>Toon het resultaat</Button>
                </Link>
            </div>
        }
            </BodyContainer>
            <DataProtectionPanel onlyDesktop={true} />
            <Footer onlyDesktop={true} />
        </>
    )
};

export async function getServerSideProps(context: any) {
    return { props: context.params };
};

export default Period;
