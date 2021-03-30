/** @jsx jsx */
import React from 'react';
import { Container, Text, Styled, jsx } from 'theme-ui';

type SectionInformationalProps = {
	imageUrl?: string;
	imageAlignment?: 'left' | 'right';
	id?: string;
	chapeau?: string;
	title: string;
};

export const SectionInformational: React.FC<SectionInformationalProps> = ({
	id,
	imageAlignment,
	imageUrl,
	chapeau,
	title,
	children,
}) => (
	<Container
		id={id}
		as="section"
		sx={{
			marginBottom: '38px',
			marginTop: '30px',
			display: 'flex',
			alignItems: ['flex-start', 'center'],
			flexDirection: [
				'column',
				imageAlignment === 'left' ? 'row' : 'row-reverse',
			],
		}}
	>
		<img
			sx={{
				width: ['auto', 200],
				maxWidth: ['100%', '80%'],
				margin: '0 auto',
			}}
			src={imageUrl}
			alt=""
		/>
		<div
			sx={{
				[`margin${imageAlignment === 'left' ? 'Left' : 'Right'}`]: [
					undefined,
					'30px',
				],
			}}
		>
			{chapeau && <Text variant="chapeau">{chapeau}</Text>}
			<Styled.h2>{title}</Styled.h2>
			{children}
		</div>
	</Container>
);

SectionInformational.defaultProps = {
	imageAlignment: 'left',
};
