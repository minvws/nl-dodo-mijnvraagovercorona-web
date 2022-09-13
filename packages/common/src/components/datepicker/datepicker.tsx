/** @jsxRuntime classic /
/** @jsx jsx */
import { useEffect, useMemo, useState } from 'react';
import DayPicker, {
	DateUtils,
	RangeModifier,
	Modifier,
	DayModifiers,
} from 'react-day-picker';
import { jsx } from 'theme-ui';
import { subMonths } from 'date-fns';

import { Navbar } from './components/navbar-element';

import { useDesktopQuery } from '@quarantaine/common';

export type DatepickerRangeDataType = RangeModifier;

interface DatepickerBaseProps {
	months: string[];
	weekdaysShort: string[];
	showPreviousMonth?: boolean;
	disabledDays?: Date[] | ((day: Date) => boolean);
}

interface DatepickerSlingedayProps extends DatepickerBaseProps {
	variant: 'singleDay';
	onDayClick: (day: Date) => void;
}

interface DatepickerRangeProps extends DatepickerBaseProps {
	variant?: 'range';
	onDayClick: (dates: DatepickerRangeDataType) => void;
}

type DatepickerProps = DatepickerSlingedayProps | DatepickerRangeProps;

export const Datepicker = (props: DatepickerProps) => {
	const isDesktop = useDesktopQuery();
	const [range, setRange] = useState<DatepickerRangeDataType>({
		from: undefined,
		to: undefined,
	});
	const [selectedDate, setSelectedDate] = useState<Date>();

	const handleDayClick = useMemo(
		() => (day: Date, { disabled }: DayModifiers) => {
			if (disabled) return;
			if (props.variant === 'range') {
				setRange((currentRange) => DateUtils.addDayToRange(day, currentRange));
			} else {
				setSelectedDate(day);
			}
		},
		[props.variant],
	);

	useEffect(() => {
		if (props.variant === 'range' && range.from) props.onDayClick(range);
		if (props.variant === 'singleDay' && selectedDate)
			props.onDayClick(selectedDate);
	}, [range, selectedDate, props.variant]);

	const selectedDays: Modifier | Modifier[] = useMemo(() => {
		if (props.variant === 'range') {
			return !range.from ? undefined : [range.from, range];
		} else {
			return selectedDate;
		}
	}, [props.variant, range, selectedDate]);

	return (
		<DayPicker
			navbarElement={Navbar}
			disabledDays={props.disabledDays}
			sx={{
				padding: [0, '20px 0'],
				width: '100%',
				fontSize: ['18px', '16px'],

				'.DayPicker-Months': {
					flexDirection: 'row',
				},

				'.DayPicker-wrapper': {
					paddingBottom: 0,
				},

				'.DayPicker-Caption > div': {
					color: '#CA005D',
					fontWeight: 'bold',
					fontSize: '16px',
					textAlign: ['center', 'left'],
				},

				'.DayPicker-Weekday': {
					color: '#01689B',
					fontSize: '15px',
					fontWeight: 'bold',
				},

				'.DayPicker-Month': {
					marginTop: ['10px'],
				},

				'.DayPicker-Day': {
					padding: '0.75em',
					borderRadius: '0 !important',
				},

				'.DayPicker-Day--today:not(.DayPicker-Day--selected)': {
					color: '#0E6999',
					backgroundColor: '#EEF7FB',
					borderRadius: '50% !important',
				},

				'.DayPicker-Day--outside': {
					color: 'black',
					opacity: '0',
					pointerEvents: 'none',
				},

				'.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
					backgroundColor: '#D11C6A',
					fontWeight: 'normal',
				},

				'&.daypicker--single-date .DayPicker-Day--selected:not(.DayPicker-Day--outside)': {
					backgroundColor: '#D11C6A',
					fontWeight: 'normal',
					borderRadius: '50% !important',
				},

				'&.daypicker--range .DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside)': {
					backgroundColor: '#F6D4E3 !important',
					color: 'black',
					fontWeight: 'bold',
				},
				'.DayPicker-Day--start': {
					borderTopLeftRadius: '50% !important',
					borderBottomLeftRadius: '50% !important',
				},
				'.DayPicker-Day--end': {
					borderTopRightRadius: '50% !important',
					borderBottomRightRadius: '50% !important',
				},
				'.DayPicker-Day:hover:not(.DayPicker-Day--selected)': {
					borderRadius: '50% !important',
				},
			}}
			months={props.months}
			month={
				props.showPreviousMonth && isDesktop
					? subMonths(new Date(), 1)
					: undefined
			}
			weekdaysShort={props.weekdaysShort}
			firstDayOfWeek={1}
			className={
				props.variant === 'range'
					? 'daypicker--range'
					: 'daypicker--single-date'
			}
			fixedWeeks={true}
			showOutsideDays={true}
			numberOfMonths={isDesktop ? 2 : 1}
			selectedDays={selectedDays}
			// The "?? undefined" is only to satisfy typescript, so null is converted to undefined.
			// The RangeModifier type provided by react-day-picker also says that from/to can be null,
			// where the modifier doesn't accept null as values (but would work with it..). Therefore
			// we convert it back to undefined if null.
			modifiers={
				props.variant === 'range'
					? { start: range?.from ?? undefined, end: range?.to ?? undefined }
					: undefined
			}
			onDayClick={handleDayClick}
		/>
	);
};

Datepicker.defaultProps = { variant: 'range' };
