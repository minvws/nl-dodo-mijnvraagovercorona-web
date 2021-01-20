/** @jsx jsx */
import { subDays } from 'date-fns';

import { jsx, Container } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import BodyContainer from 'components/structure/BodyContainer';
import TestBooking from 'components/results/TestBooking';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import { NavLink } from 'components/nav-link';
import Feedback from 'components/feedback/Feedback';
import { ImageAlleenSamen } from 'components/image-alleen-samen';

const NoAdvice = () => (
	<>
		<MetaTags
			title="Advies en actuele situatie bestemming | Quarantaine Reischeck | Reizentijdenscorona.nl"
			description="Advies op basis van actuele informatie over bestemming."
			url="/geen-advies"
		/>

		<ContentPageHeader message="Helaas, we kunnen je geen advies geven">
			<NavLink href="/" icon="refresh">
				opnieuw
			</NavLink>
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
					Toch <strong>noodzakelijk</strong> naar het buitenland? Doe de check
					opnieuw.
				</li>
				<li>
					Heb je klachten? <strong>Laat je dan testen</strong>.
				</li>
			</ul>
		</ContentPageHeader>

		<BodyContainer>
			<Container
				sx={{
					paddingLeft: ['mobilePadding', 0],
					paddingRight: ['mobilePadding', 0],
				}}
			>
				<TestBooking toDate={subDays(new Date(), 11)} quarantaine={false} />
				<Feedback />
			</Container>
			<DataProtectionPanel />
			<ImageAlleenSamen />
		</BodyContainer>
		<Footer />
	</>
);

export default NoAdvice;
