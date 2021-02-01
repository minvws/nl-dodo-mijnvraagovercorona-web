/** @jsx jsx */
import { jsx } from 'theme-ui';
import MetaTags from 'components/meta/MetaTags';
import { CallGGD, MakeOnlineAppointment } from 'components/results/TestBooking';
import Feedback from 'components/feedback/Feedback';
import { Content, Hero, Page } from 'components/structure/Page';

const NoAdvice = () => {
	return (
		<>
			<MetaTags
				title="Advies en actuele situatie bestemming | Quarantaine Reischeck | Rijksoverheid.nl"
				description="Advies op basis van actuele informatie over bestemming."
				url="/geen-advies"
			/>

			<Page title="Helaas, we kunnen je geen advies geven" showBackLink="retry">
				<Hero>
					<ul
						sx={{
							paddingLeft: '17px',
							marginBottom: 0,
							fontFamily: 'body',
							color: 'text',
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
							listStyleImage: 'url("/icons/Polygon 6.svg")',
							'li:not(:last-child)': {
								marginBottom: '16px',
							},
						}}
					>
						<li>
							Er zijn meer dan <strong>10 dagen verstreken</strong> sinds je
							thuiskomst.
						</li>
						<li>
							Je <strong>thuisquarantaine periode is voorbij</strong>.
						</li>
						<li>
							Toch <strong>noodzakelijk</strong> naar het buitenland? Doe de
							check opnieuw.
						</li>
						<li>
							Heb je klachten? <strong>Laat je dan testen</strong>.
						</li>
					</ul>
				</Hero>

				<Content>
					<div
						sx={{
							maxWidth: 'widgetMaxWidth',
							marginTop: ['10px'],
						}}
					>
						<MakeOnlineAppointment ggdCtaButtonText="Heb je klachten? Maak direct een afspraak op de website van de GGD" />
						<CallGGD />
					</div>
					<Feedback />
				</Content>
			</Page>
		</>
	);
};

export default NoAdvice;
