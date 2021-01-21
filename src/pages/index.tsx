/** @jsx jsx */
import { jsx } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import StartCheckButton from 'components/home/StartCheckButton';
import HomePageNavigation from 'components/home/HomePageNavigation';
import BodyContainer from 'components/structure/BodyContainer';
import CopySection from 'components/home/CopySection';
import DataProtectionPanel from 'components/DataProtectionPanel';
import { ImageAlleenSamen } from 'components/image-alleen-samen';
import Footer from '../components/structure/Footer';

const Home = () => {
	return (
		<>
			<MetaTags
				title="Quarantaine Reischeck COVID-19 | Rijksoverheid.nl"
				description="De check voor corona-richtlijnen en tips voor je thuisquarantaine."
				url="/"
			/>

			<ContentPageHeader
				message="Toch noodzakelijk naar het buitenland?"
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
