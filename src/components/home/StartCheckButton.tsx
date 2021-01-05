/** @jsx jsx */
import React from 'react';
import { Link, Button, jsx } from 'theme-ui';

const StartCheckButton = () => {
	return (
		<Link href="/bestemming">
			<Button
				sx={{
					paddingRight: ['auto', 'buttonPadding'],
					paddingLeft: ['auto', 'buttonPadding'],
					borderRadius: '5px',
					minWidth: ['100%', '0'],
					height: 'buttonHeight',
					fontSize: ['buttonMobile', 'button'],
					lineHeight: ['buttonMobile', 'button'],
					fontFamily: 'heading',
					backgroundColor: 'button',
					':hover': {
						backgroundColor: 'buttonHover',
					},
				}}
			>
				Doe de check
			</Button>
		</Link>
	);
};

export default StartCheckButton;
