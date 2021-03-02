/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';

type BodyContainerProps = {
	children: React.ReactNode;
	className?: string;
};

export const BodyContainer: React.FC<BodyContainerProps> = ({className, children}) => {
	return (
		<Container
			sx={{
				paddingY: 'mobilePadding',
				paddingX: ['mobilePadding', 'mobilePadding', 0],
				margin: '0 auto',
				maxWidth: 'maxWidthBody',
			}}
			className={className}
		>
			{children}
		</Container>
	);
};
