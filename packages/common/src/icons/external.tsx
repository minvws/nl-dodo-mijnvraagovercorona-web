/** @jsx jsx */
import { jsx } from 'theme-ui';
import { SVGAttributes } from 'react';

interface ExternalIconProps extends SVGAttributes<SVGElement> {}

export const ExternalIcon = ({
	fill = 'currentColor',
	...svgProps
}: ExternalIconProps) => (
	<svg
		viewBox="0 0 24 24"
		width="24"
		height="14"
		focusable="false"
		{...svgProps}
	>
		<g fill="none" stroke={fill} strokeLinecap="round" strokeWidth="2">
			<path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
			<path d="M15 3h6v6"></path>
			<path d="M10 14L21 3"></path>
		</g>
	</svg>
);
