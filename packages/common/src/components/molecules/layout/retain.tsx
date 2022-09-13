/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

interface OwnProps {
	maxWidth?: string | string[];
}

export const retainMaxWidth = '41.5625rem'; // 665px

export const Retain: React.FC<OwnProps> = ({
	maxWidth = retainMaxWidth,
	children,
}) => {
	return (
		<div
			sx={{
				// we dont want any padding here (like other components) so we need to
				// calculate our way out of it
				maxWidth:
					typeof maxWidth === 'string'
						? [`calc(${maxWidth} - 1rem - 1rem )`, maxWidth]
						: [`calc(${maxWidth[0]} - 1rem - 1rem )`, maxWidth[1]],
				margin: ['0 auto', 0],
			}}
		>
			{children}
		</div>
	);
};
