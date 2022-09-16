/** @jsxImportSource theme-ui */
import React from 'react';
import { jsx, ThemeUIStyleObject } from 'theme-ui';

interface OwnProps {
	styles?: ThemeUIStyleObject;
}

export const Module: React.FC<OwnProps> = ({ children, styles }) => {
	return (
		<div
			sx={{
				...styles,
				' > :last-child': {
					marginBlockEnd: '0',
				},
			}}
		>
			{children}
		</div>
	);
};
