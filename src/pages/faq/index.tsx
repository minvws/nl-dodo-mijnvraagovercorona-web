/** @jsx jsx */
import { jsx, Container, Link } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import FaqList from 'components/faq/FaqList';
import BodyContainer from 'components/structure/BodyContainer';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';

const FAQ = () => {
	return (
		<>
			<MetaTags
				title="Veelgestelde vragen | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Overzicht van veelgestelde vragen over quarantaine en reizen."
				url="/faq"
			/>

			<ContentPageHeader
				message="Veelgestelde vragen"
				backgroundImage="/images/Illustratie_Mobiel_Veelgestelde_vragenRetina.svg"
			>
				<Link
					href="/bestemming"
					sx={{
						position: 'absolute',
						top: '20px',
						textDecoration: 'none',
						fontFamily: 'body',
						verticalAlign: 'top',
						'::before': {
							display: 'block',
							content: '""',
							backgroundImage: `url("/icons/Refresh.svg")`,
							backgroundRepeat: 'no-repeat',
							backgroundSize: '1.5em 1.5em',
							float: 'left',
							height: '1.5em',
							width: '1.5em',
							paddingRight: '0.5em',
						},
					}}
				>
					naar resultaat
				</Link>
				<div
					sx={{
						marginBottom: '3em',
					}}
				></div>
			</ContentPageHeader>

			<BodyContainer>
				<Container
					sx={{
						paddingLeft: ['mobilePadding', 0],
						paddingRight: ['mobilePadding', 0],
					}}
				>
					<FaqList />
				</Container>
			</BodyContainer>
			<DataProtectionPanel onlyDesktop={true} />
			<Footer />
		</>
	);
};

export default FAQ;
