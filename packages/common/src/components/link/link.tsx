/** @jsx jsx */
import React, { useMemo } from 'react';
import { jsx, SxStyleProp } from 'theme-ui';
import { ChevronIcon } from '../../icons';

interface LinkPropsBase {
	withChevron?: boolean;
	className?: string;
	fontWeight?: 'lighter' | 'normal' | 'bold';
	lang?: string;
	styledAs?: 'link' | 'button';
}

export interface LinkPropsAsAnchor extends LinkPropsBase {
	external?: boolean;
	href: string;
	as?: 'a';
}

export interface LinkPropsAsButton extends LinkPropsBase {
	/**
	 * Use the as prop to convert the anchor into a button. This also requires you
	 * to use the onClick prop and drop the href and external props.
	 */
	as: 'button';
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

export type LinkProps<P extends React.ElementType = 'a' | 'button'> = {
	as?: P;
} & MergeElementProps<P, LinkPropsAsAnchor | LinkPropsAsButton>;

const useStyles = ({ fontWeight, styledAs }: LinkPropsBase) => {
	const styles = useMemo(() => {
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

		const buttonStyling: SxStyleProp = {
			paddingRight: ['none', 'buttonPadding'],
			paddingLeft: ['none', 'buttonPadding'],
			margin: '0',
			borderRadius: '5px',
			display: 'inline-block',
			textDecoration: 'none',
			border: 'none',
			minWidth: ['100%', '0'],
			height: 'buttonHeight',
			lineHeight: '55px',
			fontSize: ['buttonMobile', 'button'],
			fontFamily: 'heading',
			backgroundColor: 'button',
			color: 'white',
			transition: 'background-color 300ms ease-in-out',

			':hover, :focus': {
				backgroundColor: 'buttonHover',
			},
		};

		return styledAs === 'button' ? buttonStyling : linkStyling;
	}, [styledAs, fontWeight]);

	return styles;
};

const LinkBase = <T extends React.ElementType = 'a'>(
	props: LinkProps<T>,
	ref: React.Ref<any>,
) => {
	const styles = useStyles(props);

	const {
		className,
		// If styled as a button, the default for the chevron is false, vice versa for the link.
		withChevron = props.styledAs == 'button' ? false : true,
		children,
		styledAs = 'link',
		lang,
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
			target={props.external ? '_blank' : undefined}
			rel={props.external ? 'noopener noreferrer' : undefined}
		>
			{withChevron && <ChevronIcon className="chevron" />}
			{children}
		</a>
	);
};

// @ts-ignore
export const Link = React.forwardRef(LinkBase);
