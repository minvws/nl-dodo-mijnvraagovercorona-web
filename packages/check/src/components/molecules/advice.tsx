/** @jsx jsx */
import React from 'react';
import { jsx, Styled, Box, Flex } from 'theme-ui';

type AdviceProps = {
	icon: string;
	title: string;
	subtitle: string;
};

export const Advice: React.FC<AdviceProps> = ({ icon, title, subtitle }) => (
	<Flex
		as="li"
		sx={{
			gap: '0.5rem',
		}}
	>
		<Box
			sx={{
				display: 'flex',
				blockSize: '4rem',
				inlineSize: '4rem',
				padding: '1rem',
				borderRadius: '50%',
				background: 'white',
			}}
		>
			<img src={icon} alt="" />
		</Box>
		<Box sx={{ flex: 1, alignSelf: 'center' }}>
			<Styled.p
				sx={{
					color: 'heading',
					fontSize: ['bodyMobile', 'body'],
					margin: 0,
				}}
			>
				{title}
			</Styled.p>
			<Styled.p
				sx={{
					color: 'secondary',
					fontWeight: 'bold',
					fontSize: ['bodyMobile', 'body'],
					margin: 0,
				}}
			>
				{subtitle}
			</Styled.p>
		</Box>
	</Flex>
);
