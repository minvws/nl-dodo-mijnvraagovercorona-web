/** @jsx jsx */
import React, { useMemo } from 'react';
import { jsx, SxStyleProp, Box, Image } from 'theme-ui';

import {
	useSanitySiteSettings,
	ChevronIcon,
	RefreshIcon,
	ExternalIcon,
} from '@quarantaine/common';
import VisuallyHidden from '@reach/visually-hidden';

export interface StyledLinkPropsBase {
	withChevron?: boolean;
	className?: string;
	fontWeight?: 'lighter' | 'normal' | 'bold';
	lang?: string;
	icon?: string;
	styledAs?:
		| 'link'
		| 'link-inline'
		| 'link-back'
		| 'link-restart'
		| 'button'
		| 'button-secondary'
		| 'button-tertiary'
		| 'button-tile'
		| 'button-disabled'
		| 'button-large'
		| 'play-store'
		| 'app-store'
		| 'show-more';
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
			display: 'inline-flex',
			alignItems: 'center',
			padding: '0',
			border: 'none',
			fontFamily: 'body',
			fontSize: ['linkMobile', 'link'],
			lineHeight: ['linkMobile', 'link'],
			fontWeight: fontWeight,
			textDecoration: 'none',
			color: 'link',
			backgroundColor: 'transparent',
			transition: '300ms ease-in-out',
			transitionProperty: 'color',

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

		const linkInlineStyling: SxStyleProp = {
			...linkStyling,
			display: 'inline',
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

		const linkRestartStyling: SxStyleProp = {
			...linkStyling,
			position: 'absolute',
			top: '-50px',
			fontWeight: 'bold',
			'&:hover, &:focus': {
				color: 'linkHover',
			},
			'.chevron': {
				...chevronStyling,
				width: '1.5em',
				minWidth: '1.5em',
			},
		};

		const buttonStyling: SxStyleProp = {
			display: 'inline-block',
			minWidth: ['100%', '0'],
			minHeight: 'buttonHeight',
			paddingTop: '15px',
			paddingBottom: '15px',
			paddingRight: 'buttonPadding',
			paddingLeft: 'buttonPadding',
			border: 'none',
			borderRadius: '5px',
			margin: '0',
			fontFamily: 'heading',
			fontSize: ['buttonMobile', 'button'],
			textDecoration: 'none',
			textAlign: 'center',
			color: 'white',
			backgroundColor: 'button',
			transition: 'background-color 300ms ease-in-out',

			':hover, :focus': {
				backgroundColor: 'buttonHover',
			},
		};

		const buttonSecondaryStyling: SxStyleProp = {
			...buttonStyling,
			height: 'auto',
			minHeight: 'buttonSecondaryHeight',
			py: '8px',
			px: '12px',
			lineHeight: '1.2',
			color: 'link',
			backgroundColor: 'buttonSecondary',
			':hover, :focus': {
				backgroundColor: 'buttonSecondaryHover',
			},
		};

		const buttonTertiaryStyling: SxStyleProp = {
			...buttonStyling,
			color: 'white',
			backgroundColor: 'buttonTertiary',
			cursor: 'pointer',

			':hover, :focus': {
				backgroundColor: 'buttonTertiaryHover',
			},
		};

		const buttonDisabledStyling: SxStyleProp = {
			...buttonStyling,
			// opacity: 0.4,
			backgroundColor: 'buttonDisabled',
			pointerEvents: 'none',
		};

		const buttonTileStyling: SxStyleProp = {
			...buttonStyling,
			display: 'flex',
			gap: '1rem',
			alignItems: 'center',
			inlineSize: '100%',
			paddingInline: '1rem',
			border: 'tile',
			boxShadow: 'tile',
			textAlign: 'start',
			backgroundColor: 'white',
			color: 'primary',
			outline: 'none',
			':hover, :focus': {
				border: 'tileInteraction',
				boxShadow: 'tileInteraction',
				backgroundColor: 'white',
			},
			// Content block can output a span or a p tag. In case of a p tag, strip margins & reset font
			'p, && p': {
				marginBlock: 0,
				font: 'inherit',
			},
		};

		const buttonLargeStyling: SxStyleProp = {
			...buttonStyling,
			display: 'flex',
			gap: '0.5rem',
			alignItems: 'center',
			inlineSize: ['100%'],
			padding: '0.75rem',
			border: 'tile',
			boxShadow: 'tile',
			fontSize: '1.375rem',
			fontWeight: 'bold',
			textAlign: 'start',
			color: 'primary',
			backgroundColor: 'white',
			outline: 'none',

			':hover, :focus': {
				border: 'tileInteraction',
				boxShadow: 'tileInteraction',
				backgroundColor: 'white',
			},

			'.chevron': {
				color: 'secondary',
			},
		};

		const buttonShowMore: SxStyleProp = {
			...linkStyling,
			color: 'copyHeading',
			fontWeight: 'bold',
		};

		const buttonStoreBase: SxStyleProp = {
			display: 'inline-flex',
		};

		if (styledAs === 'link-inline') return linkInlineStyling;
		if (styledAs === 'link-back') return linkBackStyling;
		if (styledAs === 'link-restart') return linkRestartStyling;
		if (styledAs === 'button') return buttonStyling;
		if (styledAs === 'button-secondary') return buttonSecondaryStyling;
		if (styledAs === 'button-tertiary') return buttonTertiaryStyling;
		if (styledAs === 'button-disabled') return buttonDisabledStyling;
		if (styledAs === 'button-tile') return buttonTileStyling;
		if (styledAs === 'button-large') return buttonLargeStyling;
		if (styledAs === 'play-store') return buttonStoreBase;
		if (styledAs === 'app-store') return buttonStoreBase;
		if (styledAs === 'show-more') return buttonShowMore;

		return linkStyling;
	}, [styledAs, fontWeight]);

	return styles;
};

const StyledLinkBase = <T extends React.ElementType = 'a'>(
	props: StyledLinkProps<T>,
	ref: React.Ref<any>,
) => {
	const siteSettings = useSanitySiteSettings();
	const styles = useLinkStyles(props);

	const {
		className,
		// If styled as a button, the default for the chevron is false, vice versa for the link.
		withChevron = props.styledAs === 'link' ||
		props.styledAs === 'link-back' ||
		props.styledAs === 'link-restart' ||
		!props.styledAs
			? true
			: false,
		children,
		lang,
		external,
		styledAs = 'link',
		as = 'a',
		icon,
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
				{props.styledAs === 'link-restart' ? (
					<RefreshIcon className="chevron" />
				) : (
					withChevron && <ChevronIcon className="chevron" />
				)}
				{children}
				{icon && <img src={icon} alt="" sx={{ marginLeft: '8px' }} />}
			</button>
		);
	}

	const ChildrenComponent = (
		<>
			<span
				sx={{
					marginInlineEnd: external ? '0.25em' : 0,
				}}
			>
				{children}
			</span>
			{external ? (
				<>
					<ExternalIcon width="0.8em" height="0.8em" />
					<VisuallyHidden>
						({siteSettings.accessibility.labelExternalLink})
					</VisuallyHidden>
				</>
			) : null}
		</>
	);

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
			{icon && (
				<img
					src={icon}
					alt=""
					sx={{
						inlineSize: ['3rem', '5.8rem'],
						aspectRatio: '5.8/4',
						objectFit: 'contain',
						objectPosition: 'center center',
					}}
				/>
			)}

			{props.styledAs === 'link-restart' ? (
				<RefreshIcon className="chevron" />
			) : (
				withChevron && <ChevronIcon className="chevron" />
			)}

			{props.styledAs === 'button-large' || props.styledAs === 'button-tile' ? (
				<span sx={{ flex: 1 }}>{ChildrenComponent}</span>
			) : props.styledAs === 'play-store' || props.styledAs === 'app-store' ? (
				<VisuallyHidden>{children}</VisuallyHidden>
			) : (
				ChildrenComponent
			)}

			{props.styledAs === 'button-large' || props.styledAs === 'button-tile' ? (
				<ChevronIcon
					className="chevron"
					sx={{
						inlineSize: props.styledAs === 'button-large' ? '3.75rem' : 'auto',
					}}
				/>
			) : null}

			{props.styledAs === 'play-store' ? (
				<Image src="/images/stores/play-store.svg" alt="" />
			) : null}

			{props.styledAs === 'app-store' ? (
				<Image src="/images/stores/app-store.svg" alt="" />
			) : null}
		</a>
	);
};

// @ts-ignore
export const StyledLink = React.forwardRef(StyledLinkBase);
