/** @jsx jsx */
import React from 'react';
import Link from 'next/link';

import { Link as ThemeLink, Button, jsx } from 'theme-ui';

const StartCheckButton = () => {
	return (
		<Link href="/bestemming" passHref>
			<ThemeLink>
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
			</ThemeLink>
		</Link>
	);
};

export default StartCheckButton;
