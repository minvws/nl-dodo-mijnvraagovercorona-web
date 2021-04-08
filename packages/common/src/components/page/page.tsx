/** @jsx jsx */
import { Box, Flex, jsx } from 'theme-ui';

import {
	BannerAlleenSamen,
	BannerDataProtection,
	useDesktopQuery,
	useSanitySiteSettings,
} from '@quarantaine/common';

interface PageProps {
	header: React.ReactNode;
	footer: React.ReactNode;
	// If true: hides DataProtectionPanel, Footer and Alleen Samen logo on mobile.
	cleanPageOnMobile?: boolean;
	className?: string;
	illustrationUrl?: string;
}

export const Page: React.FC<PageProps> = ({
	children,
	header,
	footer,
	cleanPageOnMobile,
	className,
	illustrationUrl = '/images/Koffer_DesktopRetina.svg',
}) => {
	const isDesktop = useDesktopQuery();
	const siteSettings = useSanitySiteSettings();

	return (
		<Flex
			className={className}
			sx={{
				minHeight: '100vh',
				flexDirection: ['column', 'row'],
			}}
		>
			<Box
				sx={{
					width: '100%',
					display: 'flex',
					flexDirection: 'column',
					position: 'relative',
				}}
			>
				{header}
				<main>{children}</main>
				<div
					sx={{
						display: cleanPageOnMobile ? ['none', 'block'] : undefined,
						marginTop: 'auto',
					}}
				>
					{!isDesktop && (
						<BannerDataProtection
							withContainer
							content={siteSettings.privacy}
						/>
					)}
					<BannerAlleenSamen alt={siteSettings.footer.alleenSamenAlt} />
					{footer}
				</div>
			</Box>
			{isDesktop && (
				<BannerDataProtection
					illustrationUrl={illustrationUrl}
					content={siteSettings.privacy}
				/>
			)}
		</Flex>
	);
};
