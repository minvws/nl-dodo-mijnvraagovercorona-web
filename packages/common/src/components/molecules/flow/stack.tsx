/** @jsxRuntime classic /
/** @jsx jsx */
import React from 'react';
import { jsx, ThemeUIStyleObject } from 'theme-ui';

interface OwnProps {
	spacing?: string | string[] | number;
	styles?: ThemeUIStyleObject;
	id?: string;
}

export const Stack: React.FC<OwnProps> = ({
	children,
	spacing = ['1.5rem', '1.75rem'],
	styles,
	id,
}) => (
	<div
		sx={{
			...styles,
			// && is used to increase specificity with 1 by doubling up generated classes `.css-1o804hg.css-1o804hg`
			'&& > *': {
				marginBlockEnd: '0',
				marginBlockStart: '0',
				'& + *': {
					marginBlockStart: spacing,
				},
			},
		}}
		id={id}
	>
		{children}
	</div>
);
