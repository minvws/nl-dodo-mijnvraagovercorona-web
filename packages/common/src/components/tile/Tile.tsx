/** @jsxImportSource theme-ui */
import { Box, Themed, jsx } from 'theme-ui';

type OwnProps = {
	children: React.ReactNode;
};

export const Tile = ({ children }: OwnProps) => {
	return (
		<Box
			sx={{
				background:
					'linear-gradient(360deg, #EFF7F9 0%, rgba(255, 255, 255, 0) 100%), #FFFFFF',
				boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.2)',
				borderRadius: '11px',
				padding: '28px',
				'> :last-child': {
					marginBlockEnd: 0,
				},
			}}
		>
			{children}
		</Box>
	);
};
