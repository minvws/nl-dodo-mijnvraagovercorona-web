/** @jsx jsx */
import React from 'react'
import { Container, Flex, jsx } from 'theme-ui';

type TravelPlanProps = {
    destination: string,
    fromDate: Date,
    toDate: Date
}

const TravelPlan = (props: TravelPlanProps) => {
    const formatDate = (date: Date) => {
        const monthNames = ['jan', 'feb', 'mar', 'apr', 'mei', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'dec' ];
        return `${date.getDate()} ${monthNames[date.getMonth()]}`;
    }

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
                    marginBottom: '0px',
                    '::before': {
                        marginLeft: 'calc(-2em - 1px)',
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
                },
                h4: {
                    marginTop: '0',
                    fontWeight: 'lighter',
                    fontSize: '29'
                }
            }}>

            <h3>Vertrek</h3>
            <h4>{props.destination}</h4>
            <p>{ formatDate(props.fromDate) }</p>

            <h3>Thuiskomst</h3>
            <h4>Start 10 dagen thuisquaranataine</h4>
            <p>{ formatDate(props.toDate) }</p>

            <h3>Einde thuisquarantaine</h3>
            <p>{ formatDate(addDays(props.toDate, 10)) }</p>
        </Container>
    )
}

export default TravelPlan;
