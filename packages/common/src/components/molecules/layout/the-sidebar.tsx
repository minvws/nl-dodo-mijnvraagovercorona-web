/** @jsx jsx */
import React from 'react';
import { Flex, jsx } from 'theme-ui';

interface OwnProps {
	asideChildren?: React.ReactNode;
	hideAsideOnMobile?: boolean;
	hideAsideOnTablet?: boolean;
}

export const TheSidebar: React.FC<OwnProps> = ({
	children,
	asideChildren,
	hideAsideOnMobile,
	hideAsideOnTablet,
}) => {
	return (
		<Flex
			sx={{
				flexDirection: ['column', 'row'],
				gap: '2.25rem', // 36px
				paddingX: ['mobilePadding', 'tabletPadding', 0],
			}}
		>
			<div
				sx={{
					flexBasis: 0,
					flexGrow: 999,
					minInlineSize: '64%',
				}}
			>
				{children}
			</div>
			{asideChildren && (
				<div
					sx={{
						...(hideAsideOnTablet && { display: ['block', 'none'] }),
						...(hideAsideOnMobile && { display: ['none', 'block'] }),
						maxWidth: ['100%', '21.25rem'], // 340px
						// Offset from first heading
						marginBlockStart: [0, '3.25rem'], // 52px
					}}
				>
					{asideChildren}
				</div>
			)}
		</Flex>
	);
};
