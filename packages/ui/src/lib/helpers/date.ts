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

export const formatDateToISO = (date: Date) =>
	`${date.getFullYear()}-${`0${date.getMonth() + 1}`.slice(
		-2,
	)}-${`0${date.getDate()}`.slice(-2)}`;
