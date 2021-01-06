/** @jsx jsx */
import { jsx } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import StartCheckButton from 'components/home/StartCheckButton';
import HomePageNavigation from 'components/home/HomePageNavigation';
import BodyContainer from 'components/structure/BodyContainer';
import CopySection from 'components/home/CopySection';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from '../components/structure/Footer';
import { useDesktopQuery } from 'hooks/useDesktopQuery';

const Home = () => {
	const isDesktop = useDesktopQuery();

	return (
		<>
			<MetaTags
				title="Quarantaine Reischeck COVID-19 | Reizentijdenscorona.nl"
				description="De check voor corona-richtlijnen en tips voor je thuis quarantaine."
				url="/"
			/>

			<ContentPageHeader
				message="Wat als je toch naar het buitenland moet?"
				secondaryMessage="Reis tot 15 maart 2021 alleen noodzakelijk"
			>
				<h2
					sx={{
						fontWeight: 'lighter',
						width: ['80%', '549px'],
						fontSize: '26px',
						marginTop: 0,
						marginBottom: ['28px', '23px'],
						letterSpacint: '0.00265em',
					}}
				>
					Doe de check voor corona-richtlijnen en tips voor je thuisquarantaine.
				</h2>
				<StartCheckButton />
			</ContentPageHeader>

			<HomePageNavigation />

			<BodyContainer>
				<DataProtectionPanel />
				<CopySection />
			</BodyContainer>

			<Footer />
		</>
	);
};

export default Home;
