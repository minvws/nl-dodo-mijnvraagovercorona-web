import {
	subWeeks,
	addDays as addDaysDateFns,
	isAfter,
	isBefore,
} from 'date-fns';

export const addDays = (date: Date, days: number): Date =>
	addDaysDateFns(date, days);

export const isMoreThanWeekBeforeDeparture = (date?: Date): boolean =>
	date !== undefined && isBefore(new Date(), subWeeks(date, 1));

export const formatShortDate = (date: Date): string =>
	date
		.toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' })
		.slice(0, -1);

export const parseDate = (input: Date | string | string[]): Date => {
	if (input instanceof Date) {
		return input;
	}
	return new Date(Date.parse(input as string));
};

// based on https://tools.ietf.org/html/rfc5545
export const generateCalendarInvite = (
	message: string,
	date: Date,
	endDate?: Date,
): string => {
	const createTimeStamp = (d: Date) =>
		d
			.toISOString()
			.replace(/[^0-9TZ]/g, '')
			.substr(0, 15);

	const beginTimeStamp = createTimeStamp(parseDate(date));
	let endTimeStamp = createTimeStamp(
		new Date(parseDate(date).getTime() + 30 * 60 * 1000),
	);
	if (endDate) {
		endTimeStamp = createTimeStamp(parseDate(endDate));
	}

	return `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//hacksw/handcal//NONSGML v1.0//EN
BEGIN:VEVENT
UID:${beginTimeStamp}@rijksoverheid.nl
DTSTAMP:${createTimeStamp(new Date())}
DTSTART:${beginTimeStamp}
DTEND:${endTimeStamp}
SUMMARY:${message}
END:VEVENT
END:VCALENDAR`;
};
