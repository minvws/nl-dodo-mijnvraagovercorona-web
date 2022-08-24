/** @jsx jsx */
import { Box, Flex, jsx } from 'theme-ui';

import { useSanitySiteSettings, skipLinkID } from '@quarantaine/common';

interface PageProps {
	header?: React.ReactNode | null;
	footer: React.ReactNode;
	// If true: hides DataProtectionPanel, Footer and Alleen Samen logo on mobile.
	cleanPageOnMobile?: boolean;
	className?: string;
}

export const Page: React.FC<PageProps> = ({
	children,
	header,
	footer,
	cleanPageOnMobile,
	className,
}) => {
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
				<main
					id={skipLinkID}
					sx={{
						aside: cleanPageOnMobile ? { display: ['none', 'inherit'] } : {},
					}}
				>
					{children}
				</main>
				<div
					sx={{
						display: cleanPageOnMobile ? ['none', 'block'] : undefined,
						marginTop: 'auto',
					}}
				>
					{footer}
				</div>
			</Box>
		</Flex>
	);
};
