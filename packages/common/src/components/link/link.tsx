import { default as NextLink } from 'next/link';
import { useCurrentLocale, ExternalIcon } from '@quarantaine/common';

import {
	StyledLink,
	StyledLinkProps,
	StyledLinkPropsAsAnchor,
} from './styled-link';

/**
 * Small helper method that prefixes the requested url with a locale.
 */
export const getHrefWithlocale = (href: string, urlPrefix: string) =>
	!href.includes('/nl') && !href.includes('/en') && !href.includes('/es')
		? `${urlPrefix}${href}`
		: href;

export const Link: React.FC<StyledLinkProps> = (props) => {
	const { children } = props;
	const { urlPrefix } = useCurrentLocale();

	if ('as' in props && props.as === 'button') {
		return <StyledLink {...props}>{children}</StyledLink>;
	}

	const { href, ...propsWithoutHref } = props;
	const hrefWithLocale = props.external
		? href
		: getHrefWithlocale(href, urlPrefix);

	return (
		<NextLink href={hrefWithLocale} passHref>
			<StyledLink {...propsWithoutHref} href={hrefWithLocale}>
				{children}
			</StyledLink>
		</NextLink>
	);
};

/**
 * The NavLink component only renders a Next Router Link component with locale.
 * no styles will be applied.
 */
export const NavLink: React.FC<StyledLinkPropsAsAnchor> = ({
	children,
	href,
	className,
	...propsWithoutHref
}) => {
	const { urlPrefix } = useCurrentLocale();
	const hrefWithLocale = getHrefWithlocale(href, urlPrefix);

	return (
		<NextLink {...propsWithoutHref} href={hrefWithLocale} passHref>
			<a className={className}>{children}</a>
		</NextLink>
	);
};
