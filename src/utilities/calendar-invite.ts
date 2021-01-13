import { format, formatISO } from 'date-fns';
import { parseDate } from './dateUtils';

// Maybe this can be done in a nicer way, but I didn't find any date method that would work
// with this format 😅
const createCalendarTimestamp = (d: Date) =>
	d
		// Convert to isue string
		.toISOString()
		// Remove any dashes, ., : etc and Z
		.replace(/[^0-9TZ]/g, '')
		// Remove final 0000's that are added
		.substr(0, 15) +
	// Add back Z for timezone
	'Z';

interface InviteParameters {
	title: string;
	description: string;
	startDate: Date;
	endDate: Date;
}
// @TODO: Do we want an all day invite, or a invite that blocks the whole day from 0.00 to 0.00
/** All urls are based on: https://datebook.dev/generators */
export const getAllCalendarInvites = (params: InviteParameters) => {
	return {
		live: generateOutlookOnlineUrl(params),
		office365: generateOffice365Url(params),
		yahoo: generateYahooCalendarUrl(params),
		google: generateGoogleCalendarUrl(params),
		ics: generateIcsUrl(params),
	};
};

const generateOutlookUrl = (
	{ title, description, startDate, endDate }: InviteParameters,
	platform: 'live' | 'office365',
) => {
	return [
		`https://outlook.${platform}.com/calendar/0/deeplink/compose?rru=addevent&path=%2Fcalendar%2Faction%2Fcompose`,
		`startdt=${startDate.toISOString()}`,
		`enddt=${endDate.toISOString()}`,
		`subject=${encodeURI(title)}`,
		`body=${encodeURI(description)}`,
		`location=`,
		`allday=false`,
	].join('&');
};

export const generateOutlookOnlineUrl = (params: InviteParameters) =>
	generateOutlookUrl(params, 'live');

export const generateOffice365Url = (params: InviteParameters) =>
	generateOutlookUrl(params, 'office365');

export const generateGoogleCalendarUrl = ({
	title,
	description,
	startDate,
	endDate,
}: InviteParameters) => {
	return [
		'https://calendar.google.com/calendar/render?action=TEMPLATE',
		`dates=${createCalendarTimestamp(startDate)}%2F${createCalendarTimestamp(
			endDate,
		)}`,
		`text=${encodeURI(title)}`,
		`details=${encodeURI(description)}`,
		'location=',
		'allday=false',
	].join('&');
};

export const generateYahooCalendarUrl = ({
	title,
	description,
	startDate,
	endDate,
}: InviteParameters) => {
	return [
		'https://calendar.yahoo.com/?v=60',
		`title=${encodeURI(title)}`,
		`desc=${encodeURI(description)}`,
		`st=${createCalendarTimestamp(startDate)}`,
		`et=${createCalendarTimestamp(endDate)}`,
	].join('&');
};

export const generateIcsUrl = ({
	title,
	description,
	startDate,
	endDate,
}: InviteParameters) => {
	const beginTimeStamp = createCalendarTimestamp(startDate);
	const endTimeStamp = createCalendarTimestamp(endDate);

	const params = encodeURI(
		[
			'BEGIN:VCALENDAR',
			'VERSION:2.0',
			'BEGIN:VEVENT',
			`UID:${beginTimeStamp}--${title}@rijksoverheid.nl`,
			`DTSTAMP:${format(new Date(), 'yyyyMMdd')}`,
			`DTSTART:${beginTimeStamp}`,
			`DTEND:${endTimeStamp}`,
			`SUMMARY:${title}`,
			`DESCRIPTION:${description}`,
			'END:VEVENT',
			'END:VCALENDAR',
			// Used as array notation and joined later only because of readability.
		].join('\n'),
	);

	return `data:text/calendar;charset=utf8,${params}`;
};
