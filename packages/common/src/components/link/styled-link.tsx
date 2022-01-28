/** @jsx jsx */
import React, { useMemo } from 'react';
import { jsx, SxStyleProp } from 'theme-ui';

import { ChevronIcon } from '@quarantaine/common';

interface StyledLinkPropsBase {
	withChevron?: boolean;
	className?: string;
	fontWeight?: 'lighter' | 'normal' | 'bold';
	lang?: string;
	styledAs?:
		| 'link'
		| 'link-back'
		| 'button'
		| 'button-secondary'
		| 'button-disabled';
}

export interface StyledLinkPropsAsAnchor extends StyledLinkPropsBase {
	external?: boolean;
	href: string;
	as?: 'a';
}

export interface StyledLinkPropsAsButton extends StyledLinkPropsBase {
	/**
	 * Use the as prop to convert the anchor into a button. This also requires you
	 * to use the onClick prop and drop the href and external props.
	 */
	as: 'button';
	disabled?: boolean;
}

/**
 * Merges custom props with props belonging to the element (anchor / button),
 * while removing any props that are supplied as custom props (eg href for anchor),
 * to prevent conflicts in these types.
 *  */
type MergeElementProps<
	T extends React.ElementType,
	P extends object = {}
> = Omit<React.ComponentPropsWithRef<T>, keyof P> & P;

export type StyledLinkProps<P extends React.ElementType = 'a' | 'button'> = {
	as?: P;
} & MergeElementProps<P, StyledLinkPropsAsAnchor | StyledLinkPropsAsButton>;

export const useLinkStyles = ({
	fontWeight,
	styledAs,
}: StyledLinkPropsBase) => {
	const styles = useMemo(() => {
		const chevronStyling: SxStyleProp = {
			transform: 'translateX(0)',
			transition: '300ms ease-in-out',
			transitionProperty: 'transform',
			marginRight: 13,
			width: 9,
			minWidth: 9,
		};
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
					transform: 'translateX(3px)',
				},
			},
			'.chevron': {
				...chevronStyling,
			},
		};

		const linkBackStyling: SxStyleProp = {
			...linkStyling,
			position: 'absolute',
			top: '-50px',
			fontWeight: 'bold',
			'&:hover, &:focus': {
				color: 'linkHover',
				'.chevron': {
					transform: 'translateX(-3px) rotate(180deg)',
				},
			},
			'.chevron': {
				...chevronStyling,
				transform: 'translateX(0) rotate(180deg)',
			},
		};

		const buttonStyling: SxStyleProp = {
			paddingTop: '15px',
			paddingBottom: '15px',
			paddingRight: 'buttonPadding',
			paddingLeft: 'buttonPadding',
			margin: '0',
			borderRadius: '5px',
			display: 'inline-block',
			textDecoration: 'none',
			border: 'none',
			minWidth: ['100%', '0'],
			minHeight: 'buttonHeight',
			fontSize: ['buttonMobile', 'button'],
			fontFamily: 'heading',
			backgroundColor: 'button',
			color: 'white',
			transition: 'background-color 300ms ease-in-out',
			textAlign: 'center',

			':hover, :focus': {
				backgroundColor: 'buttonHover',
			},
		};

		const buttonSecondaryStyling: SxStyleProp = {
			...buttonStyling,
			backgroundColor: 'buttonSecondary',
			color: 'link',
			height: 'auto',
			minHeight: 'buttonSecondaryHeight',
			py: '8px',
			px: '12px',
			lineHeight: '1.2',
			':hover, :focus': {
				backgroundColor: 'buttonSecondaryHover',
			},
		};

		const buttonDisabledStyling: SxStyleProp = {
			...buttonStyling,
			opacity: 0.4,
			pointerEvents: 'none',
		};

		if (styledAs === 'link-back') return linkBackStyling;
		if (styledAs === 'button') return buttonStyling;
		if (styledAs === 'button-secondary') return buttonSecondaryStyling;
		if (styledAs === 'button-disabled') return buttonDisabledStyling;

		return linkStyling;
	}, [styledAs, fontWeight]);

	return styles;
};

const StyledLinkBase = <T extends React.ElementType = 'a'>(
	props: StyledLinkProps<T>,
	ref: React.Ref<any>,
) => {
	const styles = useLinkStyles(props);

	const {
		className,
		// If styled as a button, the default for the chevron is false, vice versa for the link.
		withChevron = props.styledAs === 'link' ||
		props.styledAs === 'link-back' ||
		!props.styledAs
			? true
			: false,
		children,
		styledAs = 'link',
		lang,
		external,
		as = 'a',
		...remainingProps
	} = props;

	// Link as button
	if (as === 'button') {
		return (
			<button
				{...remainingProps}
				className={className}
				sx={styles}
				ref={ref as React.Ref<HTMLButtonElement>}
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
			{...remainingProps}
			className={className}
			sx={styles}
			href={props.href}
			lang={lang}
			hrefLang={lang}
			ref={ref}
			target={external ? '_blank' : undefined}
			rel={external ? 'noopener noreferrer' : undefined}
		>
			{withChevron && <ChevronIcon className="chevron" />}
			{children}
		</a>
	);
};

// @ts-ignore
export const StyledLink = React.forwardRef(StyledLinkBase);
