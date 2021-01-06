/** @jsx jsx */
import React from 'react';
import Link from 'next/link';

import { jsx, Container } from 'theme-ui';

import MetaTags from 'components/meta/MetaTags';
import FaqList from 'components/faq/FaqList';
import BodyContainer from 'components/structure/BodyContainer';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import AdviceContext from 'components/advice/AdviceContext';
import { RetryLink } from 'components/Links';

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
					<Link
						href={generateResultLink({
							from,
							to,
							stage,
							destination,
						})}
						passHref
					>
						<RetryLink>naar resultaat</RetryLink>
					</Link>
				)}
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
