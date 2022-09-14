/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx, Box, Themed } from 'theme-ui';

import { ContentBlock } from '@quarantaine/common';

export const WarningPanel = ({ content }: { content: Array<Object> }) => {
	return (
		<Box
			sx={{
				backgroundColor: 'headerBackground',
				color: 'header',
				borderRadius: 'box',
				padding: 'box',
				position: 'relative',
				marginBottom: '36px',
			}}
		>
			<Themed.p
				sx={{
					margin: 0,
					paddingLeft: '30px',
					backgroundImage: `url(/icons/warning-blue.svg)`,
					backgroundRepeat: 'no-repeat',
					backgroundPosition: '0 5px',
				}}
			>
				<ContentBlock content={content} />
			</Themed.p>
		</Box>
	);
};
