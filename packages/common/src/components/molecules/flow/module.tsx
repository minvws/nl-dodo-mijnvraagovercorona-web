/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

interface OwnProps {}

export const Module: React.FC<OwnProps> = ({ children }) => {
	return (
		<div
			sx={{
				' > :last-child': {
					marginBlockEnd: '0',
				},
			}}
		>
			{children}
		</div>
	);
};
