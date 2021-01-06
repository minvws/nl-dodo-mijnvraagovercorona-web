/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, Link, Image, Container } from 'theme-ui';
import DayPicker, { DateUtils } from 'react-day-picker';
import { useDesktopQuery } from 'hooks/useDesktopQuery';
import { formatShortDate } from 'utilities/dateUtils';
import BodyContainer from 'components/structure/BodyContainer';

import 'react-day-picker/lib/style.css';

type Range = {
	from: Date;
	to?: Date;
};

type PeriodSelectProps = {
	country: string;
	updatePage: ({ from, to }: Range) => void;
};

const generateMessage = ({ from, to }: Range) =>
	!from
		? 'Kies een datum'
		: !to
		? `${formatShortDate(from)} tot ...`
		: `${formatShortDate(from)} tot ${formatShortDate(to)}`;

const PeriodSelect = ({ country, updatePage }: PeriodSelectProps) => {
	const isDesktop = useDesktopQuery();
	const [range, setRange] = useState<Range | undefined>();
	const [message, setMessage] = useState<string>('');

	const handleDayClick = (day: any) => {
		// @ts-ignore An error where addDayToRange only excepts a completed range
		const nextRange = DateUtils.addDayToRange(day, range);

		setRange(nextRange);
	};

	React.useEffect(() => {
		if (range) {
			updatePage(range);
			setMessage(generateMessage(range));
		}
	}, [range]);

	const selectedDays: any = range?.from
		? range?.to
			? [range.from, { from: range.from, to: range.to }]
			: [range.from, { from: range.from }]
		: undefined;

	return (
		<>
			<Container
				sx={{
					backgroundColor: 'roHighlight',
					textAlign: 'center',
					color: 'white',
					paddingTop: '0.1em',
					paddingRight: [0, '300px', '400px'],
				}}
			>
				<Link
					href="/bestemming"
					sx={{
						position: 'absolute',
						left: '1em',
						marginTop: '1em',
						color: 'white',
					}}
				>
					<Image src="/icons/Back Arrow Big.svg" />
				</Link>
				<h3
					sx={{
						fontSize: '15pt',
						paddingTop: 0,
						marginTop: '0.5em',
						marginBottom: '0.4em',
					}}
				>
					<span sx={{ fontWeight: 'normal' }}>{country}</span>
				</h3>
				<h5
					sx={{
						fontSize: '14pt',
						fontWeight: 'normal',
						marginTop: '0.1em',
						paddingTop: 0,
						paddingBottom: '0.9em',
					}}
				>
					{message}
				</h5>
			</Container>
			<BodyContainer>
				<DayPicker
					sx={{
						width: '100%',
						fontSize: ['18px', '16px'],

						'.DayPicker-Months': {
							flexDirection: 'row',
						},

						'.DayPicker-Caption > div': {
							color: '#CA005D',
							fontWeight: 'bold',
							fontSize: '16px',
						},

						'.DayPicker-Weekday': {
							color: '#01689B',
							fontSize: '15px',
							fontWeight: 'bold',
						},

						'.DayPicker-Day': {
							padding: '0.75em',
						},

						'.DayPicker-Day--outside': {
							color: 'black',
							opacity: '.25',
						},

						'.DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside)': {
							backgroundColor: '#D11C6A',
							fontWeight: 'normal',
						},

						'.DayPicker-Day--selected:not(.DayPicker-Day--start):not(.DayPicker-Day--end):not(.DayPicker-Day--outside)': {
							backgroundColor: '#F6D4E3 !important',
							color: 'black',
							fontWeight: 'bold',
						},
					}}
					months={[
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
					]}
					weekdaysShort={['Z', 'M', 'D', 'W', 'D', 'V', 'Z']}
					firstDayOfWeek={1}
					className="Selectable"
					fixedWeeks={true}
					showOutsideDays={true}
					numberOfMonths={isDesktop ? 2 : 1}
					selectedDays={selectedDays}
					modifiers={
						range?.from && range?.to
							? { start: range.from, end: range.to }
							: { start: range?.from }
					}
					onDayClick={handleDayClick}
				/>
			</BodyContainer>
		</>
	);
};

export default PeriodSelect;
