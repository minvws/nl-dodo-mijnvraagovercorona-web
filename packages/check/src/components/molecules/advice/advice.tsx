/** @jsx jsx */
import React from 'react';
import { jsx, Styled, Box, Flex } from 'theme-ui';

export type AdviceProps = {
	icon: string;
	title: string;
	subtitle?: string;
};

export const Advice: React.FC<AdviceProps> = ({ icon, title, subtitle }) => (
	<Flex
		as="li"
		sx={{
			gap: '0.5rem',
			alignItems: 'center',
		}}
	>
		<Box
			sx={{
				display: 'flex',
				padding: '1rem',
				borderRadius: '50%',
				background: 'white',
				'& > img': {
					blockSize: '1.75rem',
					inlineSize: '1.75rem',
					objectFit: 'contain',
				},
			}}
		>
			<img src={icon} alt="" />
		</Box>
		<Box sx={{ flex: 1 }}>
			<Styled.p
				sx={{
					color: 'header',
					fontSize: ['bodyMobile', 'body'],
					fontWeight: 'bold',
					margin: 0,
				}}
			>
				{title}
			</Styled.p>
			{subtitle && (
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
			)}
		</Box>
	</Flex>
);
