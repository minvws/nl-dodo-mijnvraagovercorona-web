/** @jsxImportSource theme-ui */
import React from 'react';
import { Container, jsx, Themed } from 'theme-ui';

import { BodyContainer } from '@quarantaine/common';

interface HeroProps {
	title: string;
	titlePrefix?: string;
	illustrationUrl?: string;
	variant?: 'default' | 'breath';
}

export const Hero: React.FC<HeroProps> = ({
	children,
	title,
	titlePrefix,
	illustrationUrl = '/images/default-illustration.svg',
	variant = 'default',
}) => (
	<div
		sx={{
			backgroundColor: 'headerBackground',
			color: 'header',
			paddingBottom: variant === 'breath' ? ['32px', '128px'] : '32px',
		}}
	>
		<Container
			sx={{
				minHeight: '150px',
				position: 'relative',
				'::before': {
					content: '""',
					display: 'block',
					position: 'absolute',
					right: 0,
					top: ['0', 'initial'],
					bottom: ['initial', '-30px'],
					height: 'calc(100% + 80px)',
					width: ['120px', '400px'],
					backgroundImage: `url(${illustrationUrl})`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: ['right top', 'right bottom'],
					backgroundSize: 'contain',
				},
			}}
		>
			<BodyContainer sx={{ paddingY: 0, position: 'relative', zIndex: '2' }}>
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
				<Themed.h1
					sx={{
						marginTop: 0,
						marginBottom: 12,
						width: ['80%', '60%'],
						paddingRight: ['40px', 0],
					}}
				>
					{title}
				</Themed.h1>
				{children}
			</BodyContainer>
		</Container>
	</div>
);
