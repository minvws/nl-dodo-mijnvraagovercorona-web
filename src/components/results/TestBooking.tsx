/** @jsx jsx */
import { CallToAction } from 'components/call-to-action/call-to-action';
import { NewTabIcon } from 'components/icons/NewTab';
import { TestAppointmentIcon } from 'components/icons/TestAppointment';
import ReminderCalendarInvite from 'components/TravelPlan/ReminderCalendarInvite';
import { differenceInDays, isAfter } from 'date-fns';
import { jsx } from 'theme-ui';
import { addDays, formatLongDate } from 'utilities/dateUtils';
import { TravelSchemeContentBlocks } from 'utilities/travel-advice/travel-advice';

export const CallGGD = ({
	callingIsOnlyOption,
}: {
	callingIsOnlyOption?: boolean;
}) => {
	return (
		<>
			<p
				sx={{
					fontSize: ['bodyMobile', 'body'],
				}}
			>
				{callingIsOnlyOption ? (
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

interface MakeOnlineAppointmentProps {
	appointmentNotPossibleTitle?: string;
	appointmentNotPossibleSubtitle?: string;
	ggdCtaButtonText: string;
}

export const MakeOnlineAppointment = ({
	appointmentNotPossibleSubtitle,
	appointmentNotPossibleTitle,
	ggdCtaButtonText,
}: MakeOnlineAppointmentProps) => {
	return (
		<div
			sx={{
				position: 'relative',
				maxWidth: 'widgetMaxWidth',
			}}
		>
			{Boolean(appointmentNotPossibleTitle) && (
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
					<strong>{appointmentNotPossibleTitle}</strong>
					{appointmentNotPossibleSubtitle}
				</p>
			)}
			<CtaToGGDWebsite>{ggdCtaButtonText}</CtaToGGDWebsite>
		</div>
	);
};

interface TestBookingProps {
	toDate: Date;
	quarantaine: boolean;
	contentBlocks: TravelSchemeContentBlocks;
}

const TestBooking = ({
	toDate,
	quarantaine,
	contentBlocks,
}: TestBookingProps) => {
	const isAfterTravel = isAfter(new Date(), toDate);
	// We add 1 to the difference of days since 0 days difference is your return date, which is day 1.
	// That makes for example 9 days AFTER your return date day 10.
	// Returns -1 as quarantaineDay if user has NOT yet returned.
	const quarantaineDay = isAfterTravel
		? differenceInDays(new Date(), toDate) + 1
		: -1;

	return (
		<div
			sx={{
				maxWidth: 'widgetMaxWidth',
				marginTop: ['10px'],
				paddingTop: !quarantaine ? '36px' : 0,
			}}
		>
			{quarantaineDay <= 5 && (
				<h2
					sx={{
						color: 'header',
						fontSize: ['h2Mobile', 'h2'],
						paddingTop: '36px',
					}}
				>
					Verkort je thuisquarantaine door je te laten testen op dag 5
				</h2>
			)}

			{contentBlocks.afspraak_coronatest__nog_niet_mogelijk && (
				<MakeOnlineAppointment
					appointmentNotPossibleTitle="Je kunt nog geen afspraak maken"
					appointmentNotPossibleSubtitle="Dit kan telefonisch op dag 1 van je thuisquarantaine of online vanaf dag 4"
					ggdCtaButtonText="Maak direct een afspraak op de website van de GGD"
				/>
			)}
			{contentBlocks.afspraak_coronatest__niet_online_wel_telefonisch && (
				<>
					<MakeOnlineAppointment
						appointmentNotPossibleTitle="Je kunt nog geen online afspraak maken"
						appointmentNotPossibleSubtitle="Dit op dag 4 van je thuisquarantaine"
						ggdCtaButtonText="Maak direct een afspraak op de website van de GGD"
					/>
					<CallGGD callingIsOnlyOption />
				</>
			)}
			{contentBlocks.afspraak_coronatest__online_en_telefonisch && (
				<>
					<MakeOnlineAppointment ggdCtaButtonText="Maak direct een afspraak op de website van de GGD" />
					<CallGGD />
				</>
			)}
			{contentBlocks.afspraak_coronatest__heb_je_klachten_after_5_days && (
				<>
					<MakeOnlineAppointment ggdCtaButtonText="Heb je klachten? Maak direct een afspraak op de website van de GGD" />
					<CallGGD />
				</>
			)}

			{contentBlocks.agenda__afspraak_coronatest && (
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
