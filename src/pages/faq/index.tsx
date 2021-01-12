/** @jsx jsx */
import React from 'react';

import { jsx, Container } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import FaqList from 'components/faq/FaqList';
import BodyContainer from 'components/structure/BodyContainer';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import AdviceContext from 'components/advice/AdviceContext';
import Feedback from 'components/feedback/Feedback';
import { NavLink } from 'components/nav-link';

const generateResultLink = ({
	from,
	to,
	destination,
	stage,
}: {
	from?: string;
	to?: string;
	destination?: string;
	stage?: string;
}) => ({
	pathname: `/${destination}/${stage}`,
	query: { van: from, tot: to },
});

const FAQ = () => {
	const { from, to, stage, destination } = React.useContext(AdviceContext);

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
				{stage && destination && (
					<NavLink
						href={generateResultLink({
							from,
							to,
							stage,
							destination,
						})}
						icon="back"
					>
						naar resultaat
					</NavLink>
				)}
			</ContentPageHeader>

			<BodyContainer>
				<Container
					sx={{
						paddingLeft: ['mobilePadding', 0],
						paddingRight: ['mobilePadding', 0],
						paddingBottom: '80px',
					}}
				>
					<FaqList />
					<Feedback />
				</Container>
			</BodyContainer>
			<DataProtectionPanel onlyDesktop={true} />
			<Footer />
		</>
	);
};

export default FAQ;
