/** @jsxImportSource theme-ui */
import React from 'react';
import { jsx, Themed, Box, Flex } from 'theme-ui';

export type AdviceProps = {
	icon?: string;
	title: string;
	subtitle?: string;
};

export const Advice: React.FC<AdviceProps> = ({ icon, title, subtitle }) => (
	<Flex
		sx={{
			gap: '0.5rem',
			alignItems: 'center',
		}}
	>
		{icon ? (
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
		) : null}
		<Box sx={{ flex: 1 }}>
			<Themed.p
				sx={{
					color: 'header',
					fontSize: ['bodyMobile', 'body'],
					fontWeight: 'bold',
					margin: 0,
				}}
			>
				{title}
			</Themed.p>
			{subtitle && (
				<Themed.p
					sx={{
						color: 'secondary',
						fontWeight: 'bold',
						fontSize: ['bodyMobile', 'body'],
						margin: 0,
					}}
				>
					{subtitle}
				</Themed.p>
			)}
		</Box>
	</Flex>
);
