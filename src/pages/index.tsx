/** @jsx jsx */
import { jsx } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import StartCheckButton from 'components/home/StartCheckButton';
import HomePageNavigation from 'components/home/HomePageNavigation';
import BodyContainer from 'components/structure/BodyContainer';
import CopySection from 'components/home/CopySection';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import { ImageAlleenSamen } from 'components/image-alleen-samen';

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
				secondaryMessage="Ga niet op reis en boek geen reizen t/m 31 maart"
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
				<CopySection />
				<DataProtectionPanel />

				<ImageAlleenSamen />
			</BodyContainer>

			<Footer />
		</>
	);
};

export default Home;
