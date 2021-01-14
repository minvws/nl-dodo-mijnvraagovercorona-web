import { addDays as addDaysDateFns, isAfter, isBefore } from 'date-fns';

export const addDays = (date: Date, days: number): Date =>
	addDaysDateFns(date, days);

export const isMoreThanWeekBeforeDeparture = (date?: Date): boolean =>
	date !== undefined && isBefore(new Date(), addDaysDateFns(date, -7));

export const formatShortDate = (date?: Date): string =>
	date
		? date
				.toLocaleDateString('nl-NL', { month: 'short', day: 'numeric' })
				.replace('.', '')
		: '';

export const formatLongDate = (date: Date) =>
	date.toLocaleDateString('nl-nL', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

export const parseDate = (input: Date | string | string[]): Date => {
	if (input instanceof Date) {
		return input;
	}
	return new Date(Date.parse(input as string));
};

// based on https://tools.ietf.org/html/rfc5545
export const generateCalendarInvite = (
	message: string,
	longText: string,
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

	return encodeURI(
		[
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'BEGIN:VEVENT',
			`UID:${beginTimeStamp}@rijksoverheid.nl`,
			`DTSTAMP:${createTimeStamp(new Date())}`,
			`DTSTART:${beginTimeStamp}`,
			`DTEND:${endTimeStamp}`,
			`SUMMARY:${message}`,
			`DESCRIPTION:${longText}`,
			'END:VEVENT',
			'END:VCALENDAR',
			// Used as array notation and joined later only because of readability.
		].join('\n'),
	);
};
