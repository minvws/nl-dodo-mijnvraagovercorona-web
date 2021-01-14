import {
	generateGoogleCalendarUrl,
	generateIcsUrl,
	generateOffice365Url,
	generateOutlookOnlineUrl,
	generateYahooCalendarUrl,
} from 'utilities/calendar-invite';

describe('Util: Calendar invite', () => {
	it('Should render a valid outlook invite url', () => {
		const outlook = generateOutlookOnlineUrl({
			title: 'Test title',
			description: 'Longer description',
			startDate: new Date(2021, 3, 3),
			endDate: new Date(2021, 3, 8, 14, 12),
		});

		expect(outlook).toMatchInlineSnapshot(
			`"https://outlook.live.com/calendar/0/deeplink/compose?rru=addevent&path=%2Fcalendar%2Faction%2Fcompose&startdt=2021-04-02T22:00:00.000Z&enddt=2021-04-08T12:12:00.000Z&subject=Test%20title&body=Longer%20description&location=&allday=false"`,
		);
	});

	it('Should render a valid office365 url', () => {
		const office365 = generateOffice365Url({
			title: 'Test title',
			description: 'Longer description',
			startDate: new Date(2021, 3, 3),
			endDate: new Date(2021, 3, 8, 14, 12),
		});

		expect(office365).toMatchInlineSnapshot(
			`"https://outlook.office365.com/calendar/0/deeplink/compose?rru=addevent&path=%2Fcalendar%2Faction%2Fcompose&startdt=2021-04-02T22:00:00.000Z&enddt=2021-04-08T12:12:00.000Z&subject=Test%20title&body=Longer%20description&location=&allday=false"`,
		);
	});

	it('Should render a ICS url', () => {
		const ics = generateIcsUrl({
			title: 'Test title',
			description: 'Longer description',
			startDate: new Date(2021, 3, 3),
			endDate: new Date(2021, 3, 8, 14, 12),
		});

		expect(ics).toMatchInlineSnapshot(
			`"data:text/calendar;charset=utf8,BEGIN:VCALENDAR%0AVERSION:2.0%0ABEGIN:VEVENT%0AUID:20210402T220000Z--Test%20title@rijksoverheid.nl%0ADTSTAMP:20210113%0ADTSTART:20210402T220000Z%0ADTEND:20210408T121200Z%0ASUMMARY:Test%20title%0ADESCRIPTION:Longer%20description%0AEND:VEVENT%0AEND:VCALENDAR"`,
		);
	});

	it('Should render a Google Calendar url', () => {
		const gcal = generateGoogleCalendarUrl({
			title: 'Test title',
			description: 'Longer description',
			startDate: new Date(2021, 3, 3),
			endDate: new Date(2021, 3, 8, 14, 12),
		});

		expect(gcal).toMatchInlineSnapshot(
			`"https://calendar.google.com/calendar/render?action=TEMPLATE&dates=20210402T220000Z%2F20210408T121200Z&text=Test%20title&details=Longer%20description&location=&allday=false"`,
		);
	});

	it('Should render a Yahoo Calendar url', () => {
		const ycal = generateYahooCalendarUrl({
			title: 'Test title',
			description: 'Longer description',
			startDate: new Date(2021, 3, 3),
			endDate: new Date(2021, 3, 8, 14, 12),
		});

		expect(ycal).toMatchInlineSnapshot(
			`"https://calendar.yahoo.com/?v=60&title=Test%20title&desc=Longer%20description&st=20210402T220000Z&et=20210408T121200Z"`,
		);
	});
});
