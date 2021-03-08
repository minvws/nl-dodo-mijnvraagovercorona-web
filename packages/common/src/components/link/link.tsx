/** @jsx jsx */
import NextLink from 'next/link';
import React, { useMemo } from 'react';
import { jsx, SxStyleProp } from 'theme-ui';
import { ChevronIcon } from '../../icons';

interface LinkPropsBase {
	withChrevon?: boolean;
	className?: string;
	fontWeight?: 'lighter' | 'normal' | 'bold';
	ref?: React.Ref<HTMLAnchorElement>;
}

interface LinkProps extends LinkPropsBase {
	external?: boolean;
	href: string;
	routerLinkComponent?: React.ElementType<{ href: string }>;
}

interface LinkPropsAsButton extends LinkPropsBase {
	as: 'button';
	onClick: (ev: any) => void;
}

export const Link: React.FC<LinkProps | LinkPropsAsButton> = React.forwardRef(
	(props, ref) => {
		const {
			className,
			fontWeight = 'normal',
			withChrevon = true,
			children,
		} = props;

		const linkStyling: SxStyleProp = {
			fontSize: ['linkMobile', 'link'],
			fontWeight: fontWeight,
			lineHeight: ['linkMobile', 'link'],
			fontFamily: 'body',
			display: 'inline-flex',
			alignItems: 'center',
			color: 'link',
			textDecoration: 'none',
			border: 'none',
			backgroundColor: 'transparent',
			padding: '0',
			'&:hover, &:focus': {
				color: 'linkHover',
			},
			'svg:nth-child(1)': {
				marginRight: 13,
				width: 'auto',
				height: 12,
			},
		};

		const LinkWrapper = useMemo(() => {
			if ('as' in props) return React.Fragment;
			const RouterLinkComponent = props.routerLinkComponent || NextLink;
			return props.external ? RouterLinkComponent : React.Fragment;
		}, [props]);

		// Link as button
		if ('as' in props) {
			return (
				<button
					className={className}
					sx={linkStyling}
					ref={ref as React.ForwardedRef<HTMLButtonElement> | undefined}
					onClick={props.onClick}
				>
					{withChrevon && <ChevronIcon />}
					{children}
				</button>
			);
		}

		// Anchor
		return (
			<LinkWrapper href={props.href}>
				<a
					className={className}
					sx={linkStyling}
					href={props.href}
					ref={ref as React.ForwardedRef<HTMLAnchorElement> | undefined}
					target={props.external ? '_blank' : undefined}
					rel={props.external ? 'noopener noreferrer' : undefined}
				>
					{withChrevon && <ChevronIcon />}
					{children}
				</a>
			</LinkWrapper>
		);
	},
);
