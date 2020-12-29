export const addDays = (date: Date, days: number): Date => {
    const millis = 1000 * 60 * 60 * 24 * days;

    return new Date(date.getTime() + millis);
};

export const formatShortDate = (date: Date): string => {
    return date.toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' })
        .slice(0, -1);
};

// based on https://tools.ietf.org/html/rfc5545
export const generateCalendarInvite = (date: Date): string => {
    const createTimeStamp = (d: Date) => d.toISOString().replace(/[^0-9TZ]/g, '');

    const beginTimeStamp = createTimeStamp(date);
    const endTimeStamp = createTimeStamp(new Date(date.getTime() + (30 * 60 * 1000)));
    return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${beginTimeStamp}@rijksoverheid.nl
DTSTAMP:${createTimeStamp(new Date())}
DTSTART:${beginTimeStamp}
DTEND:${endTimeStamp}
SUMMARY:Check opnieuw invullen
END:VEVENT
END:VCALENDAR`;
}
