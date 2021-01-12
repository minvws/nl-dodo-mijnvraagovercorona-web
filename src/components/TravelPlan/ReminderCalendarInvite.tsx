/** @jsx jsx */
import React, { useMemo } from 'react';
import { Container, jsx } from 'theme-ui';
import { generateCalendarInvite } from 'utilities/dateUtils';

type ReminderCalendarInviteProps = {
	date?: Date | string;
	fromDate?: Date | string;
	toDate?: Date | string;
	title: string;
	inviteTitle: string;
	inviteText: string;
};

const parseDate = (input: Date | string | undefined): Date | undefined => {
	if (input instanceof Date) {
		return input;
	}
	return input ? new Date(Date.parse(input)) : undefined;
};

const ReminderCalendarInvite = (props: ReminderCalendarInviteProps) => {
	const date = parseDate(props.date);
	const fromDate = parseDate(props.fromDate);
	const toDate = parseDate(props.toDate);

	// const downloadLink = useMemo(() => {
	// 	let textContent = '';
	// 	if (date) {
	// 		textContent = generateCalendarInvite(
	// 			props.inviteTitle,
	// 			props.inviteText,
	// 			date,
	// 		);
	// 	} else if (fromDate && toDate) {
	// 		textContent = generateCalendarInvite(
	// 			props.inviteTitle,
	// 			props.inviteText,
	// 			fromDate,
	// 			toDate,
	// 		);
	// 	}
	// 	return `data:text/calendar;charset=utf8,${textContent}`;
	// }, [props.inviteTitle, props.inviteText, fromDate, toDate]);

	let dateStr = '';
	if (date) {
		dateStr = date.toLocaleDateString('nl-NL', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	} else if (fromDate && toDate) {
		const startSegment = fromDate.toLocaleDateString('nl-NL', {
			day: 'numeric',
			month: 'long',
		});
		const endSegment = toDate.toLocaleDateString('nl-NL', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
		dateStr = `${startSegment} t/m ${endSegment}`;
	}

	return (
		<Container
			sx={{
				marginTop: '2em',
			}}
		>
			<span
				sx={{
					backgroundColor: 'transparent',
					border: '1px solid',
					borderColor: 'header',
					color: '#000',
					textDecoration: 'none',
					borderRadius: '8px',
					paddingLeft: '4.5em',
					paddingTop: '0.7em',
					paddingBottom: '0.7em',
					backgroundImage: 'url("/icons/Calendar.svg")',
					backgroundRepeat: 'no-repeat',
					backgroundPositionY: 'center',
					backgroundPositionX: '1em',
					// cursor: 'pointer',
					display: 'block',
					width: '100%',
					textAlign: 'left',
				}}
				// download={`${props.inviteTitle}.ics`}
				// href={downloadLink}
			>
				<span
					sx={{
						display: 'block',
						fontSize: '19px',
						color: 'link',
						fontWeight: 'bold',
						width: '80%',
						margin: '3px 0',
					}}
				>
					{props.title}
				</span>
				<span
					sx={{
						display: 'block',
						margin: 0,
					}}
				>
					{dateStr}
				</span>
			</span>
		</Container>
	);
};

export default ReminderCalendarInvite;
