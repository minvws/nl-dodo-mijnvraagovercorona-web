/** @jsx jsx */
import React from 'react';
import Link from 'next/link';
import { Button, jsx } from 'theme-ui';

type Props = {
	href: string;
	external?: boolean;
	children: React.ReactNode;
};

const LinkWrapper = ({ href, external, children }: Props) =>
	external ? (
		<a href={href} target="_blank" rel="noopener noreferrer">
			{children}
		</a>
	) : (
		<Link href={href}>{children}</Link>
	);

const PrimaryButton = ({ href, external, children }: Props) => (
	<LinkWrapper href={href} external={external}>
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
			{children}
		</Button>
	</LinkWrapper>
);

export default PrimaryButton;
