/** @jsxRuntime classic /
/** @jsx jsx */
import { Flex, jsx, Text } from 'theme-ui';
import { useSanitySiteSettings } from '@quarantaine/common';
import { SiteSettings } from 'content/site-settings';

export const GGDSpecialInstructions = () => {
	const siteSettings = useSanitySiteSettings<SiteSettings>();

	return (
		<Flex sx={{ padding: 'box', alignItems: 'flex-start' }}>
			<img src="/icons/info.svg" sx={{ mr: '12px' }} />
			<Text variant="chapeau" as="p" sx={{ fontWeight: 'normal', margin: 0 }}>
				{siteSettings.GGDSpecialInstructions}
			</Text>
		</Flex>
	);
};
