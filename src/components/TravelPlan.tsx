/** @jsx jsx */
import React from 'react'
import { Container, Flex, Box, Heading, jsx } from 'theme-ui';
import TravelAdvicePanel from './content/TravelAdvicePanel';

type TravelPlanProps = {
    country: string,
    city?: string,
    fromDate: Date,
    toDate: Date
}

type AgendaEntryProps = {
    title: string,
    subHeading?: string,
    date: Date,
    children?: React.ReactNode
};

const formatDate = (date: Date) => {
    return date.toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' }).slice(0, -1);
}

const AgendaEntry = (props: AgendaEntryProps) => {


    return (
        <>
            <h3 sx={{
            }}>{props.title}</h3>
            <h4 sx={{
                paddingTop: '1em',
                float: 'right',
                fontSize: '14pt',
                textAlign: 'right',
                marginRight: '1em',
                marginTop: '-2em'
            }}>{formatDate(props.date)}</h4>
            {props.subHeading && <h4 sx={{
                fontWeight: 'normal',
                fontSize: '14pt',
                marginTop: 0
            }}>{props.subHeading}</h4>}
            {props.children}
        </>
    )
}

const TravelPlan = (props: TravelPlanProps) => {
    const addDays = (date: Date, days: number): Date => {
        const millis = 1000 * 60 * 60 * 24 * days;

        return new Date(date.getTime() + millis);
    }

    return (
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

        <AgendaEntry
            title="Vertrek"
            subHeading={props.city ? `${props.city}, ${props.country}`: props.country}
            date={props.fromDate}>
            <TravelAdvicePanel title="Oranje reisadvies"
                               subHeading="Totale reisduur">
                Meer informatie
            </TravelAdvicePanel>
            <TravelAdvicePanel title="Laat je testen"
                               subHeading="max 72u voor vertrek">
                Je mag alleen terugreizen met een negatieve testuitslag en verklaring.
                Meer informatie
            </TravelAdvicePanel>
        </AgendaEntry>

        <AgendaEntry
            title="Thuiskomst"
            subHeading="Start 10 dagen thuisquarantaine"
            date={props.toDate} />

        <AgendaEntry
            title="Einde thuisquarantaine"
            date={addDays(props.toDate, 10)} />

        </Container>
    )
}

export default TravelPlan;
