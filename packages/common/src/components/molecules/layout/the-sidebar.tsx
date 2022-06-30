/** @jsx jsx */
import React from 'react';
import { Flex, jsx, SxStyleProp } from 'theme-ui';

interface OwnProps {
	asideChildren?: React.ReactNode;
	hideAsideOnMobile?: boolean;
	hideAsideOnTablet?: boolean;
	asideOffset?: SxStyleProp;
}

export const TheSidebar: React.FC<OwnProps> = ({
	children,
	asideChildren,
	hideAsideOnMobile,
	hideAsideOnTablet,
	asideOffset = [0, '3.25rem'],
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
						maxWidth: ['100%', '21.25rem'],
						// Offset from first heading
						marginBlockStart: asideOffset,
					}}
				>
					{asideChildren}
				</div>
			)}
		</Flex>
	);
};
