/** @jsx jsx */
import React from 'react'
import { Container, jsx } from 'theme-ui';
import TravelAdvicePanel from './TravelAdvicePanel';
import TravelPlanStage from './TravelPlanStage';
import TravelInformationLink from './TravelInformationLink';
import ReminderCalendarInvite from './ReminderCalendarInvite';
import { TravelSchemeEntry } from 'utilities/businessRules';
import { Advice } from 'services/AdviceService';

type TravelPlanProps = {
    advice: Advice
}

const TravelPlan = ({advice}: TravelPlanProps) => {
    const renderTravelPlanStage = (travelSchemeEntry: TravelSchemeEntry) => {
        return (
            <TravelPlanStage
                title={travelSchemeEntry.title}
                subHeading={travelSchemeEntry.subTitle}
                date={travelSchemeEntry.date}
                key={travelSchemeEntry.title}>

                {travelSchemeEntry.notes && travelSchemeEntry.notes.map(note => {
                    return (
                        <TravelAdvicePanel title={note.title} key={note.title}
                                           subHeading={note.subTitle}>
                            {note.link &&
                             <TravelInformationLink href={note.linkHref}
                                                    text={note.link} />}
                        </TravelAdvicePanel>
                    )
                })}
            </TravelPlanStage>);
    }
    return (
        <>
            <Container
                sx={{
                    borderLeft: '2px solid #f0d5e2',
                    paddingLeft: '1.8em',

                    h3: {
                        color: 'header',
                        marginBottom: 0,
                        '::before': {
                            marginLeft: '-39px',
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
                { advice.travelScheme.map(renderTravelPlanStage) }
            </Container>
            {
                advice.checkReminderInvite &&
                <>
                    <ReminderCalendarInvite
                        message="Zet 'Check opnieuw invullen' in je agenda"
                        date={advice.checkReminderInvite} />
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
            }

        </>
    )
}

export default TravelPlan;
