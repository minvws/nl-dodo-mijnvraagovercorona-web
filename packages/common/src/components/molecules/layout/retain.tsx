/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

interface OwnProps {}

export const Retain: React.FC<OwnProps> = ({ children }) => {
	return (
		<div
			sx={{
				// we dont want any padding here (like other components) so we need to
				// calculate our way out of it
				maxWidth: ['calc(665px - 16px - 16px )', '665px'],
				margin: ['0 auto', 0],
			}}
		>
			{children}
		</div>
	);
};
