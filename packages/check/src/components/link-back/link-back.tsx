import {
	StyledLink,
	useCurrentLocale,
	useTranslation,
	getHrefWithlocale,
	useSanitySiteSettings,
} from '@quarantaine/common';

interface OwnProps {
	href: string;
	variant?: 'back' | 'restart';
}

export const LinkBack = ({ href, variant = 'back' }: OwnProps) => {
	const siteSettings = useSanitySiteSettings();

	const { t } = useTranslation();
	const { urlPrefix } = useCurrentLocale();
	const hrefWithLocale = getHrefWithlocale(href, urlPrefix);
	{
		siteSettings.header.opnieuw;
	}
	return (
		<StyledLink href={hrefWithLocale} styledAs={`link-${variant}`}>
			{variant === 'restart'
				? siteSettings.header.opnieuw
				: t('general__vorige')}
		</StyledLink>
	);
};
