/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, jsx } from 'theme-ui';

interface OwnProps {
	hideOnMobile?: boolean;
	hideOnDesktop?: boolean;
}

export const Aside: React.FC<OwnProps> = ({
	children,
	hideOnMobile,
	hideOnDesktop,
}) => {
	return (
		<Box
			as="aside"
			sx={{
				display: hideOnMobile
					? ['none', 'block']
					: hideOnDesktop
					? [, 'none']
					: 'block',
				margin: ['0 0 55px 0', '55px 0 55px auto'],
				paddingLeft: ['mobilePadding', 0, 0],
				paddingRight: ['mobilePadding', 'tabletPadding', 0],
				maxWidth: ['100%', '340px'],
				'> * ~ *': {
					marginBlockStart: '40px',
				},
			}}
		>
			{children}
		</Box>
	);
};
