/** @jsx jsx */
import React from 'react';
import { Container, jsx  } from 'theme-ui';
import { generateCalendarInvite } from 'utilities/dateUtils';

type ReminderCalendarInviteProps = {
    date: Date
}

const ReminderCalendarInvite = (props: ReminderCalendarInviteProps) => {

    const downloadCalendarInvite = () => {
        // seems like a hacky technique - look at this again
        const element = document.createElement('a');
        const file = new Blob([generateCalendarInvite(props.date)],
                              {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = 'herinnering.ics';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    const formattedDate = props.date.toLocaleDateString('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'});

    return (

        <Container sx={{
            marginTop: '2em',
            backgroundImage: `url("/icons/Button Arrow.svg")`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right 1em top 50%'
        }}>
            <div  sx={{
                border: '1px solid',
                borderColor: 'header',
                borderRadius: '8px',
                paddingLeft: '4.5em',
                paddingTop: '0.7em',
                paddingBottom: '0.7em',
                backgroundImage: 'url("/icons/Calendar.svg")',
                backgroundRepeat: 'no-repeat',
                backgroundPositionY: 'center',
                backgroundPositionX: '1em',
                cursor: 'pointer',
            }} onClick={downloadCalendarInvite}>
                <h4 sx={{
                    fontSize: '15pt',
                    width: '80%',
                    margin: 0
                }}>
                    Zet 'Check opnieuw invullen' in je agenda
                </h4>
                <p sx={{
                    margin: 0
                }}>{ formattedDate }</p>
            </div>
        </Container>
    );
};

export default ReminderCalendarInvite;
