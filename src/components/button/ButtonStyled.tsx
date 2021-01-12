/** @jsx jsx */
import React from 'react';
import { Button, jsx } from 'theme-ui';

interface ButtonStyledProps {
	children: React.ReactNode;
	external?: boolean;
	href?: string;
}

export const ButtonStyled = ({ children }: ButtonStyledProps) => (
	<Button
		sx={{
			paddingRight: ['auto', 'buttonPadding'],
			paddingLeft: ['auto', 'buttonPadding'],
			borderRadius: '5px',
			minWidth: ['100%', '0'],
			height: 'buttonHeight',
			fontSize: ['buttonMobile', 'button'],
			lineHeight: '51px',
			fontFamily: 'heading',
			backgroundColor: 'button',

			':hover': {
				backgroundColor: 'buttonHover',
			},
		}}
		as="span"
	>
		{children}
	</Button>
);
