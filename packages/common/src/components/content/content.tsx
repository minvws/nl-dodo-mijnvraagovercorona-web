/** @jsxImportSource theme-ui */
import React from 'react';
import { Box, Container, Flex, jsx } from 'theme-ui';

import {
	BodyContainer,
	useSanitySiteSettings,
	BannerDataProtection,
} from '@quarantaine/common';
import { Aside } from '.';

interface ContentProps {
	noSpacingOnTop?: boolean;
	hidePrivacyOnMobile?: boolean;
	asideChildren?: React.ReactNode;
}

export const Content: React.FC<ContentProps> = ({
	children,
	noSpacingOnTop,
	hidePrivacyOnMobile,
	asideChildren,
}) => {
	const siteSettings = useSanitySiteSettings();

	return (
		<Container>
			<Flex
				sx={{
					flexDirection: ['column', 'row'],
				}}
			>
				<BodyContainer
					sx={{
						paddingTop: noSpacingOnTop ? 0 : '24px',
						'> :first-child': { marginTop: 0 },
					}}
				>
					{children}
				</BodyContainer>
				<Aside>
					{asideChildren}
					<div
						id="privacy"
						sx={{
							display: hidePrivacyOnMobile ? ['none', 'block'] : undefined,
						}}
					>
						<BannerDataProtection content={siteSettings.privacy} />
					</div>
				</Aside>
			</Flex>
		</Container>
	);
};
