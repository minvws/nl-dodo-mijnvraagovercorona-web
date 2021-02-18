/** @jsx jsx */
import React from 'react';

import { jsx } from 'theme-ui';

import { FaqItem } from 'components/faq/FaqItem';
import { ContentBlock } from 'components/content-block';

export type Faqs = {
	reference: string;
	reisfase: string;
	vraag: string;
	antwoord: Array<Object>;
}[];

interface FaqListProps {
	faqs: Faqs;
}

const FaqList = ({ faqs }: { faqs: Faqs }) => (
	<div sx={{ marginBottom: '36px', ':last-child': { marginBottom: 0 } }}>
		{faqs.map((faq) => (
			<FaqItem title={faq.vraag} key={faq.vraag}>
				<ContentBlock content={faq.antwoord} />
			</FaqItem>
		))}
	</div>
);

const FaqListContainer = ({ children }: { children: React.ReactNode }) => (
	<dl
		sx={{
			paddingBottom: '20px',
			margin: 0,
		}}
	>
		{children}
	</dl>
);

export const FaqListShort = ({ faqs }: { faqs: Faqs }) => (
	<FaqListContainer>
		{faqs.map((faq) => (
			<FaqItem title={faq.vraag} key={faq.vraag}>
				<ContentBlock content={faq.antwoord} />
			</FaqItem>
		))}
	</FaqListContainer>
);

export const FaqListComplete = ({ faqs }: FaqListProps) => (
	<FaqListContainer>
		<h3 sx={{ color: '#CA005D', marginTop: 0, marginBottom: '0' }}>
			Voorbereiding
		</h3>
		<FaqList faqs={faqs.filter((faq) => faq.reisfase === 'voorbereiding')} />
		<h3 sx={{ color: '#CA005D', marginTop: 0, marginBottom: '0' }}>
			Tijdens de reis
		</h3>
		<FaqList faqs={faqs.filter((faq) => faq.reisfase === 'tijdensDeReis')} />
		<h3 sx={{ color: '#CA005D', marginTop: 0, marginBottom: '0' }}>
			Thuiskomst
		</h3>
		<FaqList faqs={faqs.filter((faq) => faq.reisfase === 'thuiskomst')} />
	</FaqListContainer>
);
