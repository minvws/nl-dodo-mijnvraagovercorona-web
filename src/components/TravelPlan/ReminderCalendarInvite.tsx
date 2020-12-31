/** @jsx jsx */
import React from 'react';
import { Container, jsx  } from 'theme-ui';
import { generateCalendarInvite } from 'utilities/dateUtils';

type ReminderCalendarInviteProps = {
    date?: Date | string,
    fromDate?: Date | string,
    toDate?: Date | string,
    message: string
}

const parseDate = (input: Date | string | undefined): Date | undefined => {
    if (input instanceof Date) {
        return input;
    }
    return input ? new Date(Date.parse(input)) : undefined;
};

const ReminderCalendarInvite = (props: ReminderCalendarInviteProps) => {
    const date = parseDate(props.date);
    const fromDate = parseDate(props.fromDate);
    const toDate = parseDate(props.toDate);

    const downloadCalendarInvite = () => {
        let textContent = '';
        if (date) {
            textContent = generateCalendarInvite(props.message, date);
        } else if (fromDate && toDate) {
            textContent = generateCalendarInvite(props.message, fromDate, toDate);
        }
        // seems like a hacky technique - look at this again

        const element = document.createElement('a');
        const file = new Blob([textContent],
                              {type: 'text/plain;charset=utf-8'});
        element.href = URL.createObjectURL(file);
        element.download = `${props.message}.ics`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    }

    let dateStr = '';
    if (date) {
        dateStr = date.toLocaleDateString('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'});
    } else if (fromDate && toDate) {
        const startSegment = fromDate.toLocaleDateString('nl-NL', {day: 'numeric', month: 'long'});
        const endSegment = toDate.toLocaleDateString('nl-NL', {day: 'numeric', month: 'long', year: 'numeric'});
        dateStr = `${startSegment} t/m ${endSegment}`;
    }

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
                    {props.message}
                </h4>
                <p sx={{
                    margin: 0
                }}>{ dateStr }</p>
            </div>
        </Container>
    );
};

export default ReminderCalendarInvite;
