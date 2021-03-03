/** @jsx jsx */
import React from 'react';
import { Container, jsx } from 'theme-ui';

type BodyContainerProps = {
	children: React.ReactNode;
	className?: string;
	as?: React.ElementType;
	label?: string;
};

export const BodyContainer: React.FC<BodyContainerProps> = ({
	className,
	children,
	as,
}) => {
	return (
		<Container
			sx={{
				paddingY: 'mobilePadding',
				paddingX: ['mobilePadding', 'mobilePadding', 0],
				margin: '0 auto',
				maxWidth: 'maxWidthBody',
			}}
			className={className}
			as={as}
			aria-label={label}
		>
			{children}
		</Container>
	);
};
