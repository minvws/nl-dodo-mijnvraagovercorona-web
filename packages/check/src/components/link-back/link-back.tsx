import { StyledLink, useTranslation } from '@quarantaine/common';

export const LinkBack = ({ href }: { href: string }) => {
	const { t } = useTranslation();
	return (
		<StyledLink href={href} styledAs="link-back">
			{t('general__vorige')}
		</StyledLink>
	);
};
