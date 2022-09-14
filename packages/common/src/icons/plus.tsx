/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from 'theme-ui';

export const PlusIcon = ({ fill = 'currentColor', ...svgProps }) => (
	<svg
		width="18"
		height="18"
		viewBox="0 0 18 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...svgProps}
	>
		<rect y="8" width="18" height="2" fill={fill} />
		<rect x="8" width="2" height="18" fill={fill} />
	</svg>
);
