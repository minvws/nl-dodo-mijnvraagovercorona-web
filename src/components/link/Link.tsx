import { default as NextLink, LinkProps as NextLinkProps } from 'next/link';
import { useCurrentLanguage } from 'hooks/translation';

type LinkProps = {
	children: React.ReactNode;
} & NextLinkProps;

export const Link = ({ children, href, ...props }: LinkProps) => {
	const { urlPrefix } = useCurrentLanguage();

	const hrefWithLocale =
		typeof href === 'string' && !href.includes('/nl') && !href.includes('/en')
			? `${urlPrefix}${href}`
			: href;

	return (
		<NextLink href={hrefWithLocale} passHref {...props}>
			{children}
		</NextLink>
	);
};
