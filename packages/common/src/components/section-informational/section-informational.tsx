/** @jsx jsx */
import React from 'react';
import { Container, Text, Styled, jsx } from 'theme-ui';

type SectionInformationalProps = {
	imageUrl?: string;
	imageAlignment: 'left' | 'right';
	id?: string;
	chapeau: string;
	title: string;
	content: string;
};

export const SectionInformational: React.FC<SectionInformationalProps> = ({
	id,
	imageAlignment,
	imageUrl,
	chapeau,
	title,
	content,
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
				imageAlignment === 'right' ? 'row' : 'row-reverse',
			],
		}}
	>
		<img
			sx={{ width: 200, maxWidth: '80%', margin: '0 auto' }}
			src={imageUrl}
			alt=""
		/>
		<div
			sx={{
				[`margin${imageAlignment === 'right' ? 'Left' : 'Right'}`]: [
					undefined,
					'30px',
				],
			}}
		>
			<Text variant="chapeau">{chapeau}</Text>
			<Styled.h2>{title}</Styled.h2>
			<Styled.p>{content}</Styled.p>
		</div>
	</Container>
);
