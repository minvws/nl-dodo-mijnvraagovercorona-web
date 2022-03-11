/** @jsx jsx */
import React from 'react';
import { jsx, Styled, Box, Flex } from 'theme-ui';

type AdviceProps = {
	icon: string;
	title: string;
	subtitle: string;
};

export const Advice: React.FC<AdviceProps> = ({ icon, title, subtitle }) => (
	<Box
		as="li"
		sx={{
			marginBottom: '18px',
			marginRight: '18px',
			display: ['block', 'inline-block'],
		}}
	>
		<Flex>
			<Box
				sx={{
					width: '65px',
					height: '65px',
					background: 'white',
					borderRadius: '50%',
					display: 'flex',
					padding: '15px',
				}}
			>
				<img src={icon} alt="" />
			</Box>
			<Box sx={{ flex: 1, paddingLeft: 8, alignSelf: 'center' }}>
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
	</Box>
);
