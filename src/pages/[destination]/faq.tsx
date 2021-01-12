/** @jsx jsx */
import React from 'react';
import Link from 'next/link';

import { jsx, Container, Link as ThemeLink } from 'theme-ui';

import { countries } from 'config/countries';

import { useDestination } from 'hooks/use-destination';
import MetaTags from 'components/meta/MetaTags';
import FaqList from 'components/faq/FaqList';
import BodyContainer from 'components/structure/BodyContainer';
import ContentPageHeader from 'components/structure/ContentPageHeader';
import DataProtectionPanel from 'components/DataProtectionPanel';
import Footer from 'components/structure/Footer';
import AdviceContext from 'components/advice/AdviceContext';
import Feedback from 'components/feedback/Feedback';

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
					<Link
						href={generateResultLink({
							from,
							to,
							stage,
							destination,
						})}
						passHref
					>
						<ThemeLink
							sx={{
								position: 'absolute',
								top: '30px',
								textDecoration: 'none',
								fontFamily: 'body',
								verticalAlign: 'top',
								color: 'copyHeading',
								fontWeight: 700,
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								'::before': {
									display: 'block',
									content: '""',
									backgroundImage: `url("/icons/Refresh.svg")`,
									backgroundRepeat: 'no-repeat',
									backgroundSize: '1.5em 1.5em',
									height: '1.5em',
									width: '1.5em',
									paddingRight: '0.5em',
								},
							}}
						>
							naar resultaat
						</ThemeLink>
					</Link>
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
					<FaqList country={country} />
					<Feedback />
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
