/** @jsx jsx */
import React from 'react';
import { Button as ThemeUiButton, jsx } from 'theme-ui';

interface ButtonStyledProps {
	children: React.ReactNode;
	external?: boolean;
	href?: string;
}

const buttonStyles = {
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
};

export const ButtonStyled = ({ children }: ButtonStyledProps) => (
	<ThemeUiButton sx={buttonStyles} as="span">
		{children}
	</ThemeUiButton>
);

// @TODO: This file should contain only 1 exported styledButton.
// Using the as prop we can change the html element, which should automatically
// update the typings. This should work, but somehow gives typing errors..
// @see: https://reizentijdenscorona.atlassian.net/browse/RTC-77
export const ButtonStyledAsSubmit = ({ children }: ButtonStyledProps) => (
	<ThemeUiButton sx={buttonStyles} type="submit" as="button">
		{children}
	</ThemeUiButton>
);
