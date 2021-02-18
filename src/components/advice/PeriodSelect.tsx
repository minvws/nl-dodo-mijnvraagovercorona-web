/** @jsx jsx */
import React, { useState } from 'react';
import { jsx, Link as ThemeLink, Image, Container, Box } from 'theme-ui';
import DayPicker, { DateUtils, NavbarElementProps } from 'react-day-picker';

import { formatShortDate } from 'utilities/dateUtils';

import { BodyContainer } from 'components/structure';
import { ScreenReaderOnly } from 'components/screen-reader-only';
import { Chevron } from 'components/icons';
import { Link } from 'components/link';

import { useSanityPageContent } from 'hooks/translation';
import { useDesktopQuery } from 'hooks/useDesktopQuery';

import 'react-day-picker/lib/style.css';

type Range = {
	from: Date;
	to?: Date;
};

type PeriodSelectProps = {
	country: string;
	updatePage: ({ from, to }: Range) => void;
};

const Navbar = ({
	nextMonth,
	previousMonth,
	onPreviousClick,
	onNextClick,
	localeUtils,
}: NavbarElementProps) => {
	const months = localeUtils.getMonths();
	const prev = months[previousMonth.getMonth()];
	const next = months[nextMonth.getMonth()];

	return (
		<div
			sx={{
				position: 'absolute',
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				top: 8,
				left: 0,
				svg: { width: ['16px', '10px'] },
				path: { fill: 'smallText' },
				button: {
					border: 'none',
					backgroundColor: 'transparent',
					// This makes sure that if a user quickly taps the button,
					// the mobile browsers won't see this as a "double tap to zoom".
					touchAction: 'manipulation',
				},
			}}
		>
			<button
				sx={{
					paddingLeft: 10,
					paddingRight: 0,
					svg: { transform: 'rotate(180deg)' },
				}}
				onClick={() => onPreviousClick()}
			>
				<span aria-hidden>
					<Chevron />
				</span>
				<ScreenReaderOnly>{prev}</ScreenReaderOnly>
			</button>
			<button
				sx={{ paddingRight: 10, paddingLeft: 0 }}
				onClick={() => onNextClick()}
			>
				<ScreenReaderOnly>{next}</ScreenReaderOnly>
				<span aria-hidden>
					<Chevron />
				</span>
			</button>
		</div>
	);
};

interface PeriodePage {
	button: string;
	dagen: string[];
	terugTekst: string;
	datumKiesTekst: string;
	datumTussenTekst: string;
	maanden: string[];
}

const generateMessage = ({
	from,
	to,
	datumKiesTekst,
	datumTussenTekst,
}: Range & { datumKiesTekst: string; datumTussenTekst: string }) =>
	!from
		? datumKiesTekst
		: !to
		? `${formatShortDate(from)} ${datumTussenTekst} ...`
		: `${formatShortDate(from)} ${datumTussenTekst} ${formatShortDate(to)}`;

export const PeriodSelect = ({ country, updatePage }: PeriodSelectProps) => {
	const isDesktop = useDesktopQuery();
	const [range, setRange] = useState<Range | undefined>();
	const [message, setMessage] = useState<string>('');
	const page: PeriodePage = useSanityPageContent();

	const handleDayClick = (day: any) => {
		// @ts-ignore An error where addDayToRange only excepts a completed range
		const nextRange = DateUtils.addDayToRange(day, range);
		setRange(nextRange);
	};

	React.useEffect(() => {
		if (range) {
			updatePage(range);
			setMessage(
				generateMessage({
					...range,
					datumKiesTekst: page.datumKiesTekst,
					datumTussenTekst: page.datumTussenTekst,
				}),
			);
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
					paddingX: ['17px'],
				}}
			>
				<Box
					sx={{
						maxWidth: 'maxWidthBody',
						margin: '0 auto',
						position: 'relative',
						padding: '14px 0',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						flexDirection: 'column',
					}}
				>
					<Link href="/bestemming">
						<ThemeLink
							sx={{
								position: 'absolute',
								left: 0,
								top: '50%',
								transform: 'translateY(-50%)',
								color: 'white',
							}}
						>
							<Image src="/icons/Back Arrow Big.svg" alt={page.terugTekst} />
						</ThemeLink>
					</Link>
					<h3
						sx={{
							fontSize: '15pt',
							paddingTop: 0,
							marginTop: 0,
							marginBottom: 0,
						}}
					>
						<span sx={{ fontWeight: 'normal' }}>{country}</span>
					</h3>
					{message && (
						<h5
							sx={{
								fontSize: '14pt',
								fontWeight: 'normal',
								marginTop: '0.1em',
								marginBottom: 0,
								paddingTop: 0,
							}}
						>
							{message}
						</h5>
					)}
				</Box>
			</Container>
			<BodyContainer>
				<DayPicker
					navbarElement={Navbar}
					sx={{
						padding: [0, '70px 0 30px 0'],
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
						},

						'.DayPicker-Day--today:not(.DayPicker-Day--selected)': {
							color: '#0E6999',
							backgroundColor: '#EEF7FB',
							borderRadius: '50% !important',
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
					months={page.maanden}
					weekdaysShort={page.dagen}
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
