/** @jsx jsx */
import { jsx, Styled } from 'theme-ui';

import {
	Stack,
	StyledLink,
	useSanitySiteSettings,
	getHrefWithlocale,
	useCurrentLocale,
} from '@quarantaine/common';
import { TipCollectionProps } from 'utilities/tips';

interface OwnProps extends TipCollectionProps {
	title?: string;
}

export const MoreTips = ({ title, tipCollection }: OwnProps) => {
	const siteSettings = useSanitySiteSettings();
	const currentLocale = useCurrentLocale();
	return (
		<Stack>
			<Styled.h2>{title ? title : siteSettings.moreTips}</Styled.h2>
			<Stack spacing={['1rem']}>
				{tipCollection.map((tip, index) => (
					<StyledLink
						styledAs="button-large"
						href={getHrefWithlocale(
							`/tip/${tip.slug}`,
							currentLocale.urlPrefix,
						)}
						icon={tip.icon.src}
						key={index}
					>
						{tip.title}
					</StyledLink>
				))}
			</Stack>
		</Stack>
	);
};
