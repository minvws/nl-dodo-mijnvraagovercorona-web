/** @jsx jsx */
import React, { useMemo, useState } from 'react';
import { Container, jsx } from 'theme-ui';
import { getAllCalendarInvites } from 'utilities/calendar-invite';
import { MenuButton, MenuItem, MenuList, Menu } from '@reach/menu-button';
import '@reach/menu-button/styles.css';
import { endOfDay, format } from 'date-fns';
import { formatLongDate } from 'utilities/dateUtils';
import { Dialog } from 'components/dialog';

interface ReminderCalendarInviteProps {
	title: string;
	inviteTitle: string;
	inviteText: string;
}

type SingleDayProps = ReminderCalendarInviteProps & { singleDay: Date };
type MultiDayProps = ReminderCalendarInviteProps & {
	fromDate: Date;
	toDate: Date;
};

const ReminderCalendarInvite = (props: SingleDayProps | MultiDayProps) => {
	const [showDialog, setShowDialog] = useState(false);

	const invites = useMemo(() => {
		const startDate = 'singleDay' in props ? props.singleDay : props.fromDate;
		const endDate =
			'singleDay' in props ? endOfDay(props.singleDay) : props.toDate;

		return getAllCalendarInvites({
			title: props.inviteTitle,
			description: props.inviteText,
			startDate,
			endDate,
		});
	}, [props]);

	return (
		<Container
			sx={{
				marginTop: '2em',
				backgroundImage: `url("/icons/Button Arrow.svg")`,
				backgroundRepeat: 'no-repeat',
				backgroundPosition: 'right 1em top 50%',
			}}
		>
			<Menu>
				<MenuButton
					sx={{
						backgroundColor: 'transparent',
						border: '1px solid',
						borderColor: 'header',
						color: '#000',
						textDecoration: 'none',
						borderRadius: '8px',
						paddingLeft: '70px',
						paddingTop: '0.7em',
						paddingBottom: '0.7em',
						backgroundImage: 'url("/icons/Calendar.svg")',
						backgroundRepeat: 'no-repeat',
						backgroundPositionY: 'center',
						backgroundPositionX: '1em',
						cursor: 'pointer',
						display: 'block',
						width: '100%',
						textAlign: 'left',
					}}
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
						{'singleDay' in props ? (
							<>{formatLongDate(props.singleDay)}</>
						) : (
							<>
								{formatLongDate(props.fromDate)} t/m{' '}
								{formatLongDate(props.toDate)}
							</>
						)}
					</span>
				</MenuButton>
				<MenuList
					sx={{
						boxShadow: '0px 4px 20px 4px rgba(0, 0, 0, 0.3)',
						borderRadius: '11px',
						border: 'none',
						fontSize: '16px',
						fontWeight: 'bold',
						span: {
							fontWeight: 'normal',
							fontStyle: 'italic',
							color: 'inputBorder',
							fontSize: '12px',
						},
						'[data-reach-menu-item]': {
							padding: '10px 24px',
							':hover,:focus': {
								backgroundColor: '#f0f0f0',
								color: 'text',
							},
						},
					}}
				>
					<MenuItem
						onSelect={() => {}}
						as="a"
						href={invites.ics}
						target="_blank"
						download={`${props.title}.ics`}
					>
						Apple
					</MenuItem>
					<MenuItem
						onSelect={() => {}}
						as="a"
						href={invites.google}
						target="_blank"
					>
						Google <span>(online)</span>
					</MenuItem>
					<MenuItem
						onSelect={() => {}}
						as="a"
						href={invites.office365}
						target="_blank"
						download={`${props.title}.ics`}
					>
						Office 365 <span>(online)</span>
					</MenuItem>
					<MenuItem
						onSelect={() => {}}
						as="a"
						href={invites.ics}
						target="_blank"
					>
						Outlook
					</MenuItem>
					<MenuItem
						onSelect={() => {}}
						as="a"
						href={invites.live}
						target="_blank"
					>
						Outlook.com <span>(online)</span>
					</MenuItem>
					<MenuItem onSelect={() => setShowDialog(true)}>Overig</MenuItem>
				</MenuList>
			</Menu>
			<Dialog
				title="Thuisquarantaine in agenda"
				isVisible={showDialog}
				closeDialog={() => setShowDialog(false)}
			>
				<p>
					Heb je een andere (digitale) agenda? Zet je thuisquarantaine er dan
					zelf in.
				</p>
			</Dialog>
		</Container>
	);
};

export default ReminderCalendarInvite;
