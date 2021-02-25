/** @jsx jsx */
import React from 'react';
import { Image, Container, jsx } from 'theme-ui';

type CopyParagraphProps = {
	imageUrl?: string;
	imageAltText?: string;
	children?: React.ReactNode;
	imageAlignment?: 'left' | 'right';
	id?: string;
};

export const CopyParagraph = ({
	id,
	imageAlignment,
	imageUrl,
	children,
}: CopyParagraphProps) => (
	<Container
		id={id}
		as="section"
		sx={{
			display: 'grid',
			columnGap: '29px',
			gridTemplateColumns: ['1fr', '1fr 1fr'],
			marginBottom: '60px',
			paddingLeft: ['mobilePadding', 0],
			paddingRight: ['mobilePadding', 0],
		}}
	>
		<div
			sx={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				order: ['initial', imageAlignment === 'right' ? 2 : 1],
			}}
		>
			{imageUrl && <Image src={imageUrl} alt="" />}
		</div>
		<div
			sx={{
				order: ['initial', imageAlignment === 'right' ? 1 : 2],
				width: ['100%', '433px'],
			}}
		>
			{children}
		</div>
	</Container>
);
