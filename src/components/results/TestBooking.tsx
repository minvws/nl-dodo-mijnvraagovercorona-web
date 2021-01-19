/** @jsx jsx */
import { CallToAction } from 'components/call-to-action/call-to-action';
import { AppointmentIcon } from 'components/icons/Appointment';
import { NewTabIcon } from 'components/icons/NewTab';
import { TestAppointmentIcon } from 'components/icons/TestAppointment';
import ReminderCalendarInvite from 'components/TravelPlan/ReminderCalendarInvite';
import { differenceInDays, isBefore } from 'date-fns';
import { jsx, SxProps } from 'theme-ui';
import { addDays, formatLongDate } from 'utilities/dateUtils';

const CallGGD = ({ quarantaineDay }: { quarantaineDay: number }) => {
	return (
		<>
			<p
				sx={{
					fontSize: ['bodyMobile', 'body'],
				}}
			>
				{quarantaineDay < 4 ? (
					<>
						Het kan al wel telefonisch via <strong>0800-1202</strong>. Houd je
						burgerservicenummer (BSN) bij de hand.
					</>
				) : (
					<>
						Of bel <strong>0800-1202</strong>. Houd je burgerservicenummer (BSN)
						bij de hand.
					</>
				)}
			</p>
			<p
				sx={{
					fontSize: 'smallText',
					color: '#6E6E6E',
					'::before': {
						content: '""',
						backgroundImage: 'url("/icons/Privacy Protection.svg")',
						backgroundSize: '30px 30px',
						marginTop: '-5px',
						marginRight: '10px',
						float: 'left',
						height: '30px',
						width: '30px',
					},
				}}
			>
				We delen geen gegevens met de GGD
			</p>
		</>
	);
};

const CtaToGGDWebsite: React.FC = ({ children }) => (
	<a
		href="https://coronatest.nl/ik-wil-me-laten-testen/een-online-afspraak-maken"
		target="_blank"
		rel="noopener noreferrer"
		sx={{
			textDecoration: 'none',
			display: 'block',
		}}
	>
		<CallToAction icon={TestAppointmentIcon}>
			<p>
				{children}
				<NewTabIcon sx={{ marginLeft: 10 }} />
			</p>
		</CallToAction>
	</a>
);

interface MakeOnlineAppointmentProps extends TestBookingProps {
	quarantaineDay: number;
	isDuringTravel: boolean;
}

const MakeOnlineAppointment = ({
	toDate,
	quarantaineDay,
	isDuringTravel,
}: MakeOnlineAppointmentProps) => {
	const appointmentPossible = quarantaineDay > 3;

	return (
		<div
			sx={{
				position: 'relative',
				maxWidth: 'widgetMaxWidth',
			}}
		>
			{!appointmentPossible && (
				<p
					sx={{
						position: 'absolute',
						left: 0,
						top: 0,
						right: 0,
						bottom: 0,
						backgroundColor: 'rgba(255, 255, 255, 0.95)',
						margin: '1px',
						borderRadius: '11px',
						padding: '0 24px',
						textAlign: 'center',
						fontSize: 'chapeau',
						lineHeight: 'chapeau',
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						color: '#545454',
					}}
				>
					<strong>
						Je kunt nog geen {!isDuringTravel && 'online '} afspraak maken
					</strong>
					{isDuringTravel &&
						'Dit kan telefonisch op dag 1 van je thuisquarantaine of online vanaf dag 4.'}
					{!isDuringTravel && 'Dit kan op dag 4 van je thuisquarantaine.'}
				</p>
			)}
			<CtaToGGDWebsite>
				{quarantaineDay > 5 && 'Heb je klachten? '}
				Maak direct een afspraak op de website van de GGD
			</CtaToGGDWebsite>
		</div>
	);
};

interface TestBookingProps {
	toDate: Date;
}

const TestBooking = ({ toDate }: TestBookingProps) => {
	const isDuringTravel = isBefore(new Date(), toDate);
	// We add 1 to the difference of days since 0 days difference is your return date, which is day 1.
	// That makes for example 9 days AFTER your return date day 10.
	const quarantaineDay = differenceInDays(new Date(), toDate) + 1;

	return (
		<div sx={{ maxWidth: 'widgetMaxWidth', marginTop: ['10px', '60px'] }}>
			{quarantaineDay <= 5 && (
				<h2 sx={{ color: 'header', fontSize: ['h2Mobile', 'h2'] }}>
					Laat je testen op dag 5 van je thuisquarantaine
				</h2>
			)}
			<MakeOnlineAppointment
				toDate={toDate}
				quarantaineDay={quarantaineDay}
				isDuringTravel={isDuringTravel}
			/>

			<CallGGD quarantaineDay={quarantaineDay} />
			{isDuringTravel && (
				<ReminderCalendarInvite
					title="Zet 'Afspraak maken coronatest' in je agenda"
					modalTitle="Afspraak maken coronatest in agenda"
					modalBody="Heb je een andere (digitale) agenda? Zet je reminder om een afspraak voor de coronatest te maken er dan zelf in."
					inviteTitle="Afspraak maken coronatest"
					inviteText={`Bel de GGD op telefoonnummer 0800-1202 voor het maken van een testafspraak op ${formatLongDate(
						addDays(toDate, 4),
					)}. Houd je BSN nummer bij de hand.`}
					singleDay={toDate}
				/>
			)}
		</div>
	);
};

export default TestBooking;
