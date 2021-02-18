/** @jsx jsx */
import React from 'react';
import { ThemeUICSSObject, Box, jsx, Link as ThemeLink } from 'theme-ui';

import { Link as LocaleLink } from 'components/link';

interface Symbol {
	iconFile: string;
	width: string;
	height: string;
	position: string; // this should be a union type but it fails in compilation
	verticalShift: string;
	style?: any;
}

const noSymbol = {
	iconFile: '',
	width: '0',
	height: '0',
	position: 'left',
	verticalShift: '0',
};

const anchorSymbol = {
	iconFile: '/icons/Anker arrow.svg',
	width: '13px',
	height: '8px',
	position: 'left',
	verticalShift: '12px',
};

const arrowLinkSymbol = {
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

const dialogSymbol = {
	iconFile: '/icons/Question.svg',
	width: '16px',
	height: '16px',
	position: 'right',
	verticalShift: '2px',
	style: {
		paddingLeft: 0,
		color: 'text',
		fontSize: 'chapeau',
		lineHeight: 'chapeau',
		fontWeight: '500',
		':hover,:focus': {
			color: 'text',
		},
	},
};

type LinkProps = {
	href: string;
	external?: boolean;
	text?: string;
	onClick?: (event: any) => void;
	children?: React.ReactNode;
	lang?: string;
	sx?: ThemeUICSSObject;
	className?: string;
};

type LinkBaseProps = LinkProps & {
	symbol: Symbol;
	ref?: React.RefObject<HTMLAnchorElement>;
};

const LinkWrapper = ({
	external,
	href,
	children,
}: {
	external?: boolean;
	href: string;
	children: React.ReactNode;
}) =>
	!external ? <LocaleLink href={href}>{children}</LocaleLink> : <>{children}</>;

const LinkBase = React.forwardRef((props: LinkBaseProps, ref) => {
	const baseIconStyles: ThemeUICSSObject = {
		display: 'inline-block',
		content: '""',
		backgroundImage: `url("${props.symbol.iconFile}")`,
		backgroundSize: `${props.symbol.width} ${props.symbol.height}`,
		height: props.symbol.height,
		width: props.symbol.width,
		backgroundRepeat: 'no-repeat',
		position: 'absolute',
		marginTop: props.symbol.verticalShift,
	};

	const containerStyles: ThemeUICSSObject =
		props.symbol.position === 'left'
			? { '::before': baseIconStyles }
			: { '::after': baseIconStyles };

	/**
	 * I need lessons in Typescript 🙈
	 */
	const optionalRef: any = ref ? { ref } : {};

	return (
		<Box sx={containerStyles}>
			<LinkWrapper external={props.external} href={props.href}>
				<a
					sx={{
						fontSize: ['linkMobile', 'link'],
						fontWeight: 'bold',
						lineHeight: ['linkMobile', 'link'],
						paddingLeft: `calc(${props.symbol.width} + 14px)`,
						display: 'inline-block',
						color: 'link',
						':hover': {
							color: 'linkHover',
						},
						...props.symbol.style,
						...props.sx,
					}}
					onClick={props.onClick}
					href={props.href}
					lang={props.lang}
					hrefLang={props.lang}
					className={props.className}
					{...(props.external
						? {
								target: '_blank',
								rel: 'noopener noreferrer',
						  }
						: {})}
					{...optionalRef}
				>
					{props.text}
					{props.children}
				</a>
			</LinkWrapper>
		</Box>
	);
});

export const Link = (props: LinkProps) => (
	<LinkBase {...props} symbol={noSymbol} />
);

export const AnchorLink = (props: LinkProps) => (
	<LinkBase {...props} symbol={anchorSymbol} />
);

export const InternalLink = React.forwardRef((props: LinkProps, ref) => (
	<LinkBase {...props} ref={ref} symbol={arrowLinkSymbol} />
));

export const ExternalLink = React.forwardRef((props: LinkProps, ref) => (
	<LinkBase {...props} ref={ref} symbol={arrowLinkSymbol} external />
));

// @TODO: I'd rather see this as a button instead of a link
export const DialogLink = (props: LinkProps) => (
	<LinkBase {...props} symbol={dialogSymbol} />
);

export const RetryLink: React.FC = ({ children }) => (
	<ThemeLink
		sx={{
			position: 'absolute',
			top: '30px',
			textDecoration: 'none',
			fontFamily: 'body',
			verticalAlign: 'top',
			color: 'copyHeading',
			fontWeight: 700,
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			'::before': {
				display: 'block',
				content: '""',
				backgroundImage: `url("/icons/Refresh.svg")`,
				backgroundRepeat: 'no-repeat',
				backgroundSize: '1.5em 1.5em',
				height: '1.5em',
				width: '1.5em',
				paddingRight: '0.5em',
			},
		}}
	>
		{children}
	</ThemeLink>
);
