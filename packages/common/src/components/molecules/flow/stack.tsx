/** @jsx jsx */
import React from 'react';
import { jsx, SxStyleProp } from 'theme-ui';

interface OwnProps {
	spacing?: string | string[] | number;
	styles?: SxStyleProp;
}

export const Stack: React.FC<OwnProps> = ({
	children,
	spacing = ['1.5rem', '1.75rem'],
	styles,
}) => {
	return (
		<div
			sx={{
				...styles,
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
