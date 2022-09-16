/** @jsxImportSource theme-ui */
import { jsx } from 'theme-ui';

export const ChevronIcon = ({ fill = 'currentColor', ...svgProps }) => (
	<svg
		width="12"
		height="19"
		viewBox="0 0 12 19"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...svgProps}
	>
		<path
			d="M1.84863 0.999997C2.06578 0.999997 2.28294 1.08166 2.44858 1.2446L11 9.66634L2.44839 18.0881C2.1169 18.4142 1.57996 18.4142 1.24847 18.0881C0.917176 17.7616 0.917176 17.2328 1.24847 16.9064L8.60055 9.66634L1.24867 2.42629C0.917372 2.09984 0.917372 1.57105 1.24867 1.2446C1.41431 1.08147 1.63147 0.999997 1.84863 0.999997Z"
			fill={fill}
			stroke={fill}
		/>
	</svg>
);
