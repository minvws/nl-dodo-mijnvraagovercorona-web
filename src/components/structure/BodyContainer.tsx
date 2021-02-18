/** @jsx jsx */
import React from 'react';
import { Container, ThemeUICSSObject, jsx } from 'theme-ui';

type BodyContainerProps = {
	sx?: ThemeUICSSObject;
	children: React.ReactNode;
	className?: string;
};

export const BodyContainer: React.FC<BodyContainerProps> = (props) => {
	return (
		<Container
			sx={{
				paddingY: 'mobilePadding',
				paddingX: ['mobilePadding', 'mobilePadding', 0],
				margin: '0 auto',
				maxWidth: 'maxWidthBody',
			}}
			className={props.className}
		>
			{props.children}
		</Container>
	);
};
