/** @jsx jsx */
import React from 'react';
import Link from 'next/link';

import { ThemeUICSSObject, Box, jsx } from 'theme-ui';
import theme from 'utilities/styling/theme';

interface Symbol {
	iconFile: string;
	width: string;
	height: string;
	position: string; // this should be a union type but it fails in compilation
	verticalShift: string;
	style?: any;
}

const AnchorSymbol = {
	iconFile: '/icons/Anker arrow.svg',
	width: '13px',
	height: '8px',
	position: 'left',
	verticalShift: '12px',
};

const InternalLinkSymbol = {
	iconFile: '/icons/Link Arrow.svg',
	width: '7px',
	height: '12px',
	position: 'left',
	verticalShift: '7px',
	style: {
		textDecoration: 'none',
		fontWeight: 'lighter',
	},
};

type LinkProps = {
	href: string;
	internal?: boolean;
	text?: string;
	onClick?: (event: any) => void;
	children?: React.ReactNode;
	sx?: ThemeUICSSObject;
};

const LinkWrapper = ({
	internal,
	href,
	children,
}: {
	internal?: boolean;
	href: string;
	children: React.ReactNode;
}) => (internal ? <Link href={href}>{children}</Link> : children);

const linkWithIcon = ({
	symbol,
	internal,
}: {
	symbol: Symbol;
	internal?: boolean;
}) => {
	const baseIconStyles: ThemeUICSSObject = {
		display: 'inline-block',
		content: '""',
		backgroundImage: `url("${symbol.iconFile}")`,
		backgroundSize: `${symbol.width} ${symbol.height}`,
		height: symbol.height,
		width: symbol.width,
		backgroundRepeat: 'no-repeat',
		position: 'absolute',
		marginTop: symbol.verticalShift,
	};

	const containerStyles: ThemeUICSSObject =
		symbol.position === 'left'
			? { '::before': baseIconStyles }
			: { '::after': baseIconStyles };
	return (props: LinkProps) => {
		return (
			<Box sx={containerStyles}>
				<LinkWrapper internal={internal} href={props.href}>
					<a
						sx={{
							fontSize: ['linkMobile', 'link'],
							fontWeight: 'bold',
							lineHeight: ['linkMobile', 'link'],
							paddingLeft: `calc(${symbol.width} + 14px)`,
							display: 'inline-block',
							color: 'link',
							':hover': {
								color: 'linkHover',
							},
							...symbol.style,
							...props.sx,
						}}
						onClick={props.onClick}
						href={props.href}
					>
						{props.text}
						{props.children}
					</a>
				</LinkWrapper>
			</Box>
		);
	};
};

export const AnchorLink = linkWithIcon({ symbol: AnchorSymbol });
export const InternalLink = linkWithIcon({
	symbol: InternalLinkSymbol,
	internal: true,
});
