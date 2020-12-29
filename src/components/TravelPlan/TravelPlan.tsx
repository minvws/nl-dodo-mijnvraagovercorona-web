/** @jsx jsx */
import React from 'react'
import { Container, Flex, Box, Heading, jsx } from 'theme-ui';
import TravelAdvicePanel from './TravelAdvicePanel';
import TravelPlanStage from './TravelPlanStage';
import TravelInformationLink from './TravelInformationLink';
import ReminderCalendarInvite from './ReminderCalendarInvite';
import { addDays } from 'utilities/dateUtils';

type TravelPlanProps = {
    country: string,
    city?: string,
    fromDate: Date,
    toDate: Date
}

const TravelPlan = (props: TravelPlanProps) => {
    return (
        <>
        <Container
            sx={{
                borderLeft: '2px solid #f0d5e2',
                marginLeft: '1em',
                marginRight: '1em',
                paddingLeft: '1.8em',
                h3: {
                    marginBottom: 0,
                    '::before': {
                        marginLeft: 'calc(-2em - 2px)',
                        marginRight: '2px',
                        marginTop: '1px',
                        paddingRight: '1em',
                        display: 'inline-block',
                        fill: 'gray',
                        content: 'url(\'data:image/svg+xml;charset=utf-8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><circle fill="rgb(240,213,226)" cx="50" cy="50" r="50"/></svg>\')',
                        float: 'left',
                        height: '1em',
                        width: '1em'
                    }
                }
            }}>

        <TravelPlanStage
            title="Vertrek"
            subHeading={props.city ? `${props.city}, ${props.country}`: props.country}
        date={props.fromDate}>
        <TravelAdvicePanel title="Oranje reisadvies"
                           subHeading="Totale reisduur">
            <TravelInformationLink href=""
                                   text="Meer informatie" />

        </TravelAdvicePanel>
        <TravelAdvicePanel title="Laat je testen"
                           subHeading="max 72u voor vertrek">
            Je mag alleen terugreizen met een negatieve testuitslag en verklaring.
            Meer informatie
        </TravelAdvicePanel>
        </TravelPlanStage>

        <TravelPlanStage
            title="Thuiskomst"
            subHeading="Start 10 dagen thuisquarantaine"
            date={props.toDate} />

        <TravelPlanStage
            title="Einde thuisquarantaine"
            date={addDays(props.toDate, 10)} />
        </Container>
        <ReminderCalendarInvite date={new Date()} />

        <Container sx={{
            paddingLeft: '2em',
            backgroundImage: 'url("/icons/Union.svg")',
            backgroundRepeat: 'no-repeat'
        }}>
            <p sx={{
                lineHeight: '1.4em'
            }}>
                De situatie kan veranderen. Doe daarom voor vertrek de check nog een keer.
            </p>

        </Container>

        </>
    )
}

export default TravelPlan;
