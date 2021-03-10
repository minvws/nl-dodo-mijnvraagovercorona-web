/** @jsx jsx */
import React, { useMemo } from 'react';
import { jsx, SxStyleProp } from 'theme-ui';
import { ChevronIcon } from '../../icons';

interface LinkPropsBase {
	withChevron?: boolean;
	className?: string;
	fontWeight?: 'lighter' | 'normal' | 'bold';
	ref?: React.Ref<HTMLAnchorElement>;
	lang?: string;
}

export interface LinkPropsAsAnchor extends LinkPropsBase {
	external?: boolean;
	href: string;
}

export interface LinkPropsAsButton extends LinkPropsBase {
	/**
	 * Use the as prop to convert the anchor into a button. This also requires you
	 * to use the onClick prop and drop the href and external props.
	 */
	as: 'button';
	onClick: (ev: any) => void;
}

export type LinkProps = LinkPropsAsAnchor | LinkPropsAsButton;

export const Link: React.FC<LinkProps> = React.forwardRef((props, ref) => {
	const {
		className,
		fontWeight = 'normal',
		withChevron = true,
		children,
		lang,
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
		transition: '300ms ease-in-out',
		transitionProperty: 'color',
		padding: '0',
		'&:hover, &:focus': {
			color: 'linkHover',
			'.chevron': {
				transform: 'translate3d(3px, 0, 0)',
			},
		},
		'.chevron': {
			transform: 'translate3d(0, 0, 0)',
			transition: '300ms ease-in-out',
			transitionProperty: 'transform',
			marginRight: 13,
			width: 9,
			minWidth: 9,
		},
	};

	// Link as button
	if ('as' in props) {
		return (
			<button
				className={className}
				sx={linkStyling}
				ref={ref as React.ForwardedRef<HTMLButtonElement> | undefined}
				onClick={props.onClick}
			>
				{withChevron && <ChevronIcon className="chevron" />}
				{children}
			</button>
		);
	}

	// Anchor
	return (
		<a
			className={className}
			sx={linkStyling}
			href={props.href}
			lang={lang}
			hrefLang={lang}
			ref={ref as React.ForwardedRef<HTMLAnchorElement> | undefined}
			target={props.external ? '_blank' : undefined}
			rel={props.external ? 'noopener noreferrer' : undefined}
		>
			{withChevron && <ChevronIcon className="chevron" />}
			{children}
		</a>
	);
});
