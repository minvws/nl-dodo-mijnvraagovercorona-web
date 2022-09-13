/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { SVGAttributes } from 'react';

interface PrinterIconProps extends SVGAttributes<SVGElement> {}

export const PrinterIcon = ({
	fill = 'currentColor',
	...svgProps
}: PrinterIconProps) => (
	<svg
		width="20"
		height="18"
		viewBox="0 0 20 18"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...svgProps}
	>
		<path
			d="M17 5H3C1.34 5 0 6.34 0 8V12C0 13.1 0.9 14 2 14H4V16C4 17.1 4.9 18 6 18H14C15.1 18 16 17.1 16 16V14H18C19.1 14 20 13.1 20 12V8C20 6.34 18.66 5 17 5ZM13 16H7C6.45 16 6 15.55 6 15V11H14V15C14 15.55 13.55 16 13 16ZM17 9C16.45 9 16 8.55 16 8C16 7.45 16.45 7 17 7C17.55 7 18 7.45 18 8C18 8.55 17.55 9 17 9ZM15 0H5C4.45 0 4 0.45 4 1V3C4 3.55 4.45 4 5 4H15C15.55 4 16 3.55 16 3V1C16 0.45 15.55 0 15 0Z"
			fill={fill}
		/>
	</svg>
);
