/** @jsx jsx */
import React from 'react';
import { Container, ThemeUICSSObject, jsx } from 'theme-ui';

type BodyContainerProps = {
	sx?: ThemeUICSSObject;
	children: React.ReactNode;
};

const BodyContainer = (props: BodyContainerProps) => {
	return (
		<Container
			sx={{
				paddingRight: ['mobilePadding', '420px', '400px'],
				paddingLeft: ['mobilePadding'],
			}}
		>
			<Container
				sx={{
					maxWidth: 'maxWidthBody',
					...props.sx,
				}}
			>
				{props.children}
			</Container>
		</Container>
	);
};

export default BodyContainer;
