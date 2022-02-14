/** @jsx jsx */
import React from 'react';
import { jsx } from 'theme-ui';

interface OwnProps {
	spacing?: string | string[] | number;
}

export const Stack: React.FC<OwnProps> = ({
	children,
	spacing = ['24px', '28px'],
}) => {
	return (
		<div
			sx={{
				// && is used to increase specificity with 1 by doubling up generated classes `.css-1o804hg.css-1o804hg`
				'&& > *': {
					marginBlockEnd: '0',
					'& + *': {
						marginBlockStart: spacing,
					},
				},
			}}
		>
			{children}
		</div>
	);
};
