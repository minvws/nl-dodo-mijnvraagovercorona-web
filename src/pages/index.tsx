/** @jsx jsx */
import CopySection from 'components/home/CopySection';
import HomePageNavigation from 'components/home/HomePageNavigation';
import StartCheckButton from 'components/home/StartCheckButton';
import MetaTags from 'components/meta/MetaTags';
import { Content, Hero, Page } from 'components/structure/Page';
import { jsx } from 'theme-ui';

const Home = () => {
	return (
		<>
			<MetaTags
				title="Quarantaine Reischeck COVID-19 | Rijksoverheid.nl"
				description="De check voor corona-richtlijnen en tips voor je thuisquarantaine."
				url="/"
			/>

			<Page
				title="Toch noodzakelijk naar het buitenland?"
				headerPrefix="Ga niet op reis en boek geen reizen t/m 31 maart"
			>
				<Hero>
					<h2
						sx={{
							fontWeight: 'light',
							width: ['80%', '549px'],
							fontSize: '26px',
							lineHeight: ['30px', '36px'],
							marginTop: 0,
							marginBottom: ['18px'],
							color: 'roHighlight',
						}}
					>
						Doe de check voor corona-richtlijnen en tips voor je
						thuisquarantaine.
					</h2>
					<StartCheckButton />
				</Hero>
				<Content>
					<HomePageNavigation />
					<CopySection />
				</Content>
			</Page>
		</>
	);
};

export default Home;
