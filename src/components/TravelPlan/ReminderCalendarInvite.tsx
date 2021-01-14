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
	modalTitle: string;
	modalBody: string;
	inviteTitle: string;
	inviteText: string;
}

type SingleDayProps = ReminderCalendarInviteProps & { singleDay: Date };
type MultiDayProps = ReminderCalendarInviteProps & {
	fromDate: Date;
	toDate: Date;
};

interface CalenderInviteMenuItemProps {
	onSelect?: () => void;
	href?: string;
	download?: string;
	icon: string;
}

const CalenderInviteMenuItem: React.FC<CalenderInviteMenuItemProps> = ({
	onSelect = () => {},
	icon,
	href,
	download,
	children,
}) => (
	<MenuItem
		onSelect={onSelect}
		as="a"
		download={download}
		{...(href
			? {
					href,
					target: '_blank',
					rel: 'noopener noreferrer',
			  }
			: {})}
		sx={{
			padding: '10px 24px',
			display: 'flex',
			alignItems: 'center',

			':hover,:focus': {
				backgroundColor: '#f0f0f0',
				color: 'text',
			},
		}}
	>
		<span sx={{ width: '40px' }}>
			<img src={icon} alt="" />
		</span>
		<span
			sx={{
				color: '#0E6999',
			}}
		>
			{children}
		</span>
	</MenuItem>
);

const ReminderCalendarInvite = (props: SingleDayProps | MultiDayProps) => {
	const [showDialog, setShowDialog] = useState(false);
	const dateText =
		'singleDay' in props ? (
			<>{formatLongDate(props.singleDay)}</>
		) : (
			<>
				{formatLongDate(props.fromDate)} t/m {formatLongDate(props.toDate)}
			</>
		);

	const inviteUrls = useMemo(() => {
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
						{dateText}
					</span>
				</MenuButton>
				<MenuList
					sx={{
						boxShadow: '0px 4px 20px 4px rgba(0, 0, 0, 0.3)',
						borderRadius: '11px',
						border: 'none',
						fontSize: '16px',
						fontWeight: 'bold',
					}}
				>
					<CalenderInviteMenuItem
						href={inviteUrls.ics}
						download={`${props.modalTitle}.ics`}
						icon="/icons/apple.svg"
					>
						Apple
					</CalenderInviteMenuItem>
					<CalenderInviteMenuItem
						href={inviteUrls.google}
						download={`${props.modalTitle}.ics`}
						icon="/icons/google.svg"
					>
						Google (online)
					</CalenderInviteMenuItem>
					<CalenderInviteMenuItem
						href={inviteUrls.office365}
						icon="/icons/office-365.svg"
					>
						Office (online)
					</CalenderInviteMenuItem>
					<CalenderInviteMenuItem
						href={inviteUrls.ics}
						download={`${props.modalTitle}.ics`}
						icon="/icons/outlook.svg"
					>
						Outlook
					</CalenderInviteMenuItem>
					<CalenderInviteMenuItem
						href={inviteUrls.live}
						icon="/icons/outlook-online.svg"
					>
						Outlook.com (online)
					</CalenderInviteMenuItem>
					<CalenderInviteMenuItem
						onSelect={() => setShowDialog(true)}
						icon="/icons/other-calendar.svg"
					>
						Een andere agenda
					</CalenderInviteMenuItem>
				</MenuList>
			</Menu>
			<Dialog
				title={props.modalTitle}
				isVisible={showDialog}
				closeDialog={() => setShowDialog(false)}
			>
				<p>{props.modalBody}</p>
				<p>
					{props.inviteTitle}: {dateText}
				</p>
			</Dialog>
		</Container>
	);
};

export default ReminderCalendarInvite;
