/** @jsxImportSource theme-ui */
import { jsx } from 'theme-ui';

export const ScreenReaderOnly: React.FC = ({ children }) => {
	return (
		<span
			sx={{
				clip: 'rect(0 0 0 0)',
				clipPath: 'inset(50%)',
				height: '1px',
				overflow: 'hidden',
				position: 'absolute',
				whiteSpace: 'nowrap',
				width: '1px',
			}}
		>
			{children}
		</span>
	);
};
