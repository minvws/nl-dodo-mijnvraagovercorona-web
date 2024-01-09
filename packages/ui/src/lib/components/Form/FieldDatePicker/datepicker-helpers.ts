import type { DuetLocalizedText } from '@duetds/date-picker/dist/types/components/duet-date-picker/date-localization';

const DATE_FORMAT = /^(\d{1,2})\-(\d{1,2})\-(\d{4})$/;
export const adapter = {
	parse(value = '', createDate: any) {
		const matches = value.match(DATE_FORMAT);
		if (matches) {
			return createDate(matches[3], matches[2], matches[1]);
		}
	},
	format(date: Date) {
		return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
	},
};

export const datepickerTranslations = {
	nl_nl: {
		buttonLabel: 'Kies datum',
		placeholder: 'DD-MM-JJJJ',
		selectedDateMessage: 'Gekozen datum is',
		prevMonthLabel: 'Vorige maand',
		nextMonthLabel: 'Volgende maand',
		monthSelectLabel: 'Maand',
		yearSelectLabel: 'Jaar',
		closeLabel: 'Sluit venster',
		calendarHeading: 'Kies een datum',
		dayNames: [
			'Zondag',
			'Maandag',
			'Dinsdag',
			'Woensdag',
			'Donderdag',
			'Vrijdag',
			'Zaterdag',
		],
		monthNames: [
			'Januari',
			'Februari',
			'Maart',
			'April',
			'Mei',
			'Juni',
			'Juli',
			'Augustus',
			'September',
			'Oktober',
			'November',
			'December',
		],
		monthNamesShort: [
			'Jan',
			'Feb',
			'Maa',
			'Apr',
			'Mei',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Okt',
			'Nov',
			'Dec',
		],
	},
	en_gb: {
		buttonLabel: 'Choose date',
		placeholder: 'DD-MM-YYYY',
		selectedDateMessage: 'Selected date is',
		prevMonthLabel: 'Previous month',
		nextMonthLabel: 'Next month',
		monthSelectLabel: 'Month',
		yearSelectLabel: 'Year',
		closeLabel: 'Close window',
		calendarHeading: 'Choose a date',
		dayNames: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		],
		monthNames: [
			'January',
			'February',
			'March',
			'April',
			'May',
			'June',
			'July',
			'August',
			'September',
			'October',
			'November',
			'December',
		],
		monthNamesShort: [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec',
		],
	},
} as unknown as {
	[key: string]: DuetLocalizedText;
};
