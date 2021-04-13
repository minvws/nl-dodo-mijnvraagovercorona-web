/** @jsx jsx */
import React from 'react';
import { Container, jsx, Styled } from 'theme-ui';

import { BodyContainer } from '@quarantaine/common';

interface HeroProps {
	title: string;
	titlePrefix?: string;
}

export const Hero: React.FC<HeroProps> = ({ children, title, titlePrefix }) => (
	<div
		sx={{
			backgroundColor: 'headerBackground',
			color: 'header',
			paddingBottom: '36px',
		}}
	>
		<Container>
			<BodyContainer sx={{ paddingY: 0 }}>
				{titlePrefix && (
					<span
						sx={{
							fontSize: 'chapeau',
							fontWeight: 'bold',
							color: 'smallText',
							marginBottom: '25px',
							display: 'block',
							maxWidth: '60%',
						}}
					>
						{titlePrefix}
					</span>
				)}
				<Styled.h1
					sx={{
						marginTop: 0,
						marginBottom: 12,
						width: ['80%', '60%'],
					}}
				>
					{title}
				</Styled.h1>
				{children}
			</BodyContainer>
		</Container>
	</div>
);
