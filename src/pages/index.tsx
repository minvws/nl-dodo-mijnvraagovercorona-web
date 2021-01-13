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
				description="De check voor corona-richtlijnen en tips voor je thuisquarantaine."
				url="/"
			/>

			<ContentPageHeader
				message="Wat als je toch naar het buitenland moet?"
				secondaryMessage="Reis tot 15 maart 2021 alleen noodzakelijk"
			>
				<h2
					sx={{
						fontWeight: 'light',
						width: ['80%', '549px'],
						fontSize: '26px',
						lineHeight: ['30px', '36px'],
						marginTop: 0,
						marginBottom: ['18px'],
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

				<a
					href="https://www.rijksoverheid.nl/onderwerpen/coronavirus-covid-19/coronavirus-beeld-en-video/communicatiemiddelen-campagne"
					target="_blank"
					rel="noopener noreferrer"
				>
					<img
						sx={{
							width: '360px',
							maxWidth: '80%',
							margin: '20px auto 40px auto',
							display: 'block',
						}}
						src="/images/logo-alleen-samen.svg"
					/>
				</a>
			</BodyContainer>

			<Footer />
		</>
	);
};

export default Home;
