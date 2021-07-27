/** @jsx jsx */
import { Box, jsx } from 'theme-ui';

export const Tile: React.FC = ({ children }) => (
	<Box
		sx={{
			backgroundColor: 'white',
			border: '1px solid #CDD7E0',
			borderRadius: 'box',
			padding: 'box',
			position: 'relative',
			fontSize: ['bodyMobile', 'body'],
			marginBottom: '12px',
		}}
	>
		{children && <Box>{children}</Box>}
	</Box>
);
