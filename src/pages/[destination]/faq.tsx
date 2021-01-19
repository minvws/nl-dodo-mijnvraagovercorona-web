/** @jsx jsx */
import React from 'react';

import { jsx, Container } from 'theme-ui';

import { countries } from 'config/countries';

import { useDestination } from 'hooks/use-destination';
import MetaTags from 'components/meta/MetaTags';
import { FaqListComplete } from 'components/faq/FaqList';
import BodyContainer from 'components/structure/BodyContainer';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import AdviceContext from 'components/advice/AdviceContext';
import Feedback from 'components/feedback/Feedback';
import { NavLink } from 'components/nav-link';
import { ImageAlleenSamen } from 'components/image-alleen-samen';

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

interface FAQProps {
	destination: string;
}

const FAQ = ({ destination }: FAQProps) => {
	const { from, to, stage } = React.useContext(AdviceContext);
	const country = useDestination(destination as string);

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
					<FaqListComplete country={country} />
					<Feedback />
					<ImageAlleenSamen />
				</Container>
			</BodyContainer>
			<DataProtectionPanel onlyDesktop={true} />
			<Footer />
		</>
	);
};

export interface FAQStaticProps {
	params: {
		destination: string;
	};
}

export const getStaticProps = async ({ params }: FAQStaticProps) => {
	return {
		props: {
			destination: params.destination,
		},
	};
};

export const getStaticPaths = () => ({
	paths: countries.map((country) => ({
		params: { destination: country.slug },
	})),
	fallback: false,
});

export default FAQ;
