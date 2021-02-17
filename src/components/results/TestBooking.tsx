/** @jsx jsx */
import { CallToAction } from 'components/call-to-action/call-to-action';
import { NewTabIcon } from 'components/icons/NewTab';
import { TestAppointmentIcon } from 'components/icons/TestAppointment';
import ReminderCalendarInvite from 'components/TravelPlan/ReminderCalendarInvite';
import { useTranslation } from 'hooks/translation';
import { jsx } from 'theme-ui';
import { addDays, formatLongDate } from 'utilities/dateUtils';
import { TravelSchemeContentBlocks } from 'utilities/travel-advice/travel-advice';

export const CallGGD = ({
	callingIsOnlyOption,
}: {
	callingIsOnlyOption?: boolean;
}) => {
	const { t } = useTranslation();

	return (
		<>
			<p
				sx={{
					fontSize: ['bodyMobile', 'body'],
				}}
			>
				{callingIsOnlyOption ? (
					<>{t('afspraak_coronatest__call_ggd__calling_only_option')}</>
				) : (
					<>{t('afspraak_coronatest__call_ggd')}</>
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
				{t('afspraak_coronatest__call_ggd__no_data_shared')}
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
	const { t, t_s } = useTranslation();

	return (
		<div
			sx={{
				maxWidth: 'widgetMaxWidth',
				marginTop: ['10px'],
				paddingTop: !quarantaine ? '36px' : 0,
			}}
		>
			{contentBlocks.afspraak_coronatest__nog_niet_mogelijk && (
				<>
					<h2
						sx={{
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
							paddingTop: '36px',
						}}
					>
						{t_s('afspraak_coronatest__title')}
					</h2>
					<MakeOnlineAppointment
						appointmentNotPossibleTitle={t_s(
							'afspraak_coronatest__nog_niet_mogelijk_title',
						)}
						appointmentNotPossibleSubtitle={t_s(
							'afspraak_coronatest__nog_niet_mogelijk_subtitle',
						)}
						ggdCtaButtonText={t_s(
							'afspraak_coronatest__nog_niet_mogelijk_ggdCta',
						)}
					/>
				</>
			)}
			{contentBlocks.afspraak_coronatest__niet_online_wel_telefonisch && (
				<>
					<h2
						sx={{
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
							paddingTop: '36px',
						}}
					>
						{t_s('afspraak_coronatest__title')}
					</h2>
					<MakeOnlineAppointment
						appointmentNotPossibleTitle={t_s(
							'afspraak_coronatest__niet_online_wel_telefonisch_title',
						)}
						appointmentNotPossibleSubtitle={t_s(
							'afspraak_coronatest__niet_online_wel_telefonisch_subtitle',
						)}
						ggdCtaButtonText={t_s(
							'afspraak_coronatest__niet_online_wel_telefonisch_ggdCta',
						)}
					/>
					<CallGGD callingIsOnlyOption />
				</>
			)}
			{contentBlocks.afspraak_coronatest__online_en_telefonisch && (
				<>
					<h2
						sx={{
							color: 'header',
							fontSize: ['h2Mobile', 'h2'],
							paddingTop: '36px',
						}}
					>
						{t_s('afspraak_coronatest__title')}
					</h2>
					<MakeOnlineAppointment
						ggdCtaButtonText={t_s(
							'afspraak_coronatest__online_en_telefonisch_ggdCta',
						)}
					/>
					<CallGGD />
				</>
			)}
			{(contentBlocks.afspraak_coronatest__heb_je_klachten_na_5_dagen ||
				contentBlocks.afspraak_coronatest__heb_je_klachten_land_c) && (
				<>
					<MakeOnlineAppointment
						ggdCtaButtonText={t_s(
							'afspraak_coronatest__heb_je_klachten_na_5_dagen_of_land_c_ggdCta',
						)}
					/>
					<CallGGD />
				</>
			)}

			{contentBlocks.agenda__afspraak_coronatest && (
				<ReminderCalendarInvite
					title={t_s('agenda__afspraak_coronatest_title')}
					modalTitle={t_s('agenda__afspraak_coronatest_modal_title')}
					modalBody={t_s('agenda__afspraak_coronatest_modal_body')}
					inviteTitle={t_s('agenda__afspraak_coronatest_invite_title')}
					inviteText={t_s('agenda__afspraak_coronatest_invite_text', {
						appointmentDate: formatLongDate(addDays(toDate, 4)),
					})}
					singleDay={toDate}
				/>
			)}
		</div>
	);
};

export default TestBooking;
