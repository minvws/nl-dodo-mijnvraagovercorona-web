/** @jsxImportSource theme-ui */
import React from 'react';
import { Container, Text, Themed, jsx } from 'theme-ui';
import { Module } from '@quarantaine/common';

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
				minWidth: ['200px'],
				maxWidth: ['100%', '80%'],
				margin: '0 auto',
			}}
			src={imageUrl}
			alt=""
		/>
		<Module
			styles={{
				[`margin${imageAlignment === 'left' ? 'Left' : 'Right'}`]: [
					undefined,
					'30px',
				],
			}}
		>
			{chapeau && (
				<Text as="div" variant="chapeau" sx={{ marginBlockStart: 0 }}>
					{chapeau}
				</Text>
			)}
			<Themed.h2>{title}</Themed.h2>
			{children}
		</Module>
	</Container>
);

SectionInformational.defaultProps = {
	imageAlignment: 'left',
};
