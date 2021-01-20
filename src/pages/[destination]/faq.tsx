/** @jsx jsx */
import React from 'react';

import { jsx } from 'theme-ui';
import { countries } from 'config/countries';
import { useDestination } from 'hooks/use-destination';
import MetaTags from 'components/meta/MetaTags';
import { FaqListComplete } from 'components/faq/FaqList';
import Feedback from 'components/feedback/Feedback';
import { Content, Page } from 'components/structure/Page';

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
	const country = useDestination(destination as string);

	return (
		<>
			<MetaTags
				title="Veelgestelde vragen | Quarantaine Reischeck | Reizentijdenscorona.nl"
				description="Overzicht van veelgestelde vragen over quarantaine en reizen."
				url="/faq"
			/>

			<Page
				title="Veelgestelde vragen"
				showBackLink="result"
				// backgroundImage="/images/Illustratie_Mobiel_Veelgestelde_vragenRetina.svg"
			>
				<Content>
					<FaqListComplete country={country} />
					<Feedback />
				</Content>
			</Page>
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
