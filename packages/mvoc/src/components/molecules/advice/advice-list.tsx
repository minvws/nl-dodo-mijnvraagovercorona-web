/** @jsxImportSource theme-ui */
import React from 'react';
import { jsx, Box } from 'theme-ui';
import { Advice, AdviceProps } from './advice';

export type AdviceListProps = {
	advices: AdviceProps[];
};

export const AdviceList: React.FC<AdviceListProps> = ({ advices }) => (
	<Box
		as="ul"
		sx={{
			display: 'grid',
			gridTemplateColumns: 'repeat(auto-fit, minmax(min(19rem, 100%), 1fr))',
			gap: '1rem',
			paddingInlineStart: 0,
			listStyle: 'none',
		}}
	>
		{advices.map((advice) => (
			<li key={advice.icon}>
				<Advice {...advice} />
			</li>
		))}
	</Box>
);
