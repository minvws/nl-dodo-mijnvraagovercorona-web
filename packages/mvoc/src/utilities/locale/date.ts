import { addDays, isBefore } from 'date-fns';

export const isMoreThanWeekBefore = (date?: Date): boolean =>
	date !== undefined && isBefore(new Date(), addDays(date, -7));

export const formatShortDate = (
	date: Date,
	locale: string,
	dayOfTheWeek: boolean,
): string =>
	date
		? date
				.toLocaleDateString(locale.replace('_', '-'), {
					month: 'short',
					day: 'numeric',
					...(dayOfTheWeek ? { weekday: 'short' } : {}),
				})
				.replace('.', '')
		: '';

export const formatDate = (date: Date, locale: string): string =>
	date
		? date
				.toLocaleDateString(locale.replace('_', '-'), {
					month: 'long',
					day: 'numeric',
					weekday: 'long',
				})
				.replace('.', '')
		: '';

export const formatLongDate = (date: Date, locale: string) =>
	date.toLocaleDateString(locale.replace('_', '-'), {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	});

export const formatToISO = (date: Date) =>
	`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
		-2,
	)}-${`0${date.getDate()}`.slice(-2)}`;
