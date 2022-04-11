/** @jsx jsx */
import React, { useMemo, useState } from 'react';
import { Container, jsx } from 'theme-ui';
import { getAllCalendarInvites } from './utils';
import { MenuButton, MenuItem, MenuList, Menu } from '@reach/menu-button';
import { endOfDay } from 'date-fns';
import { Appointment } from '../../icons/appointment';

import {
	Dialog,
	CallToAction,
	formatLongDate,
	Link,
	useLinkStyles,
} from '@quarantaine/common';

interface ReminderCalendarInviteProps {
	/**
	 * Modal is shown when user clicks "other calendar"
	 */
	modalTitle: string;
	/**
	 * Explanation shown when user clicks "other calendar"
	 */
	modalBody: string;
	/**
	 * Title for the invite, also used as filename for the ICS download.
	 */
	inviteTitle: string;
	/**
	 * Added as notes to the invite.
	 */
	inviteText: string;
	/**
	 * Used to get the correct translated date.
	 */
	locale: string;
	content: { tot_en_met: string; other_calendar: string };
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

export const SaveInCalendar: React.FC<SingleDayProps | MultiDayProps> = (
	props,
) => {
	const [showDialog, setShowDialog] = useState(false);
	const { locale, content } = props;
	const styles = useLinkStyles({ styledAs: 'button-secondary' });
	const dateText =
		'singleDay' in props ? (
			<>{formatLongDate(props.singleDay, locale)}</>
		) : (
			<>
				{formatLongDate(props.fromDate, locale)} {content.tot_en_met}{' '}
				{formatLongDate(props.toDate, locale)}
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
				marginTop: '16px',
			}}
			as="span"
		>
			<Menu>
				<MenuButton
					sx={{
						...styles,
						// These important styles are needed because
						// in SchemeBlocks these styles would otherwise be overridden
						// for all anchors and buttons.
						textDecoration: 'none !important',
						textAlign: 'left',
						color: '#01689B !important',
					}}
				>
					<span
						sx={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'left',
						}}
					>
						<span sx={{ mr: 12, svg: { width: 20, height: 18 } }}>
							<Appointment />
						</span>
						<span>{props.children}</span>
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
						{content.other_calendar}
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
