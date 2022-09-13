/** @jsxRuntime classic /
/** @jsx jsx */
import { jsx } from 'theme-ui';
import { SVGAttributes } from 'react';

interface RefreshIconProps extends SVGAttributes<SVGElement> {}

export const RefreshIcon = ({
	fill = 'currentColor',
	...svgProps
}: RefreshIconProps) => (
	<svg
		width="19"
		height="23"
		viewBox="0 0 19 23"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
		{...svgProps}
	>
		<path
			d="M1.57255 7.54719C1.64745 7.43264 1.74433 7.33409 1.85758 7.25724C1.97083 7.1804 2.0982 7.12679 2.23231 7.09952C2.36643 7.07225 2.50462 7.07187 2.63889 7.09839C2.77315 7.1249 2.90082 7.1778 3.0145 7.25401C3.12818 7.33022 3.22561 7.42822 3.30114 7.54235C3.37667 7.65648 3.42881 7.78446 3.45453 7.91888C3.48025 8.0533 3.47905 8.19149 3.45098 8.32544C3.42292 8.45939 3.36856 8.58644 3.29105 8.69923C2.39296 10.0413 1.96913 11.645 2.08692 13.2555C2.2047 14.866 2.85733 16.3909 3.94111 17.588C5.02489 18.7851 6.47765 19.5857 8.06856 19.8625C9.65947 20.1393 11.2973 19.8765 12.7217 19.1159C14.1461 18.3553 15.2755 17.1404 15.9304 15.6643C16.5852 14.1882 16.728 12.5357 16.3361 10.9691C15.9441 9.40263 15.0398 8.01204 13.7669 7.01834C12.4941 6.02464 10.9256 5.48483 9.31082 5.48468C8.89304 5.48477 8.47604 5.52069 8.06439 5.59203L10.0766 7.03747C10.1885 7.1161 10.2837 7.21613 10.3567 7.33178C10.4297 7.44743 10.479 7.5764 10.5019 7.71124C10.5247 7.84608 10.5206 7.98411 10.4897 8.11734C10.4589 8.25058 10.4019 8.37637 10.3221 8.48745C10.2423 8.59852 10.1413 8.69268 10.0249 8.76447C9.90851 8.83626 9.77903 8.88426 9.64396 8.90569C9.50889 8.92712 9.37092 8.92155 9.23801 8.88932C9.10511 8.85709 8.97991 8.79882 8.86967 8.71789L4.71355 5.73252C4.59656 5.64849 4.49839 5.54096 4.42535 5.41681C4.35231 5.29266 4.30601 5.15462 4.2894 5.01154C4.27279 4.86845 4.28624 4.72348 4.32889 4.5859C4.37155 4.44831 4.44246 4.32115 4.5371 4.21256L7.89931 0.354803C8.0796 0.147962 8.33466 0.0212086 8.6084 0.00242825C8.88214 -0.0163521 9.15212 0.0743786 9.35896 0.25466C9.5658 0.434942 9.69256 0.690008 9.71134 0.963745C9.73012 1.23748 9.63939 1.50747 9.45911 1.71431L7.87973 3.52629C9.75984 3.23383 11.6844 3.52441 13.3944 4.35892C15.1043 5.19342 16.5176 6.53178 17.4438 8.19382C18.3701 9.85586 18.7649 11.7618 18.5751 13.655C18.3854 15.5483 17.6201 17.3379 16.3824 18.783C15.1447 20.2282 13.4939 21.2594 11.6524 21.7379C9.81079 22.2164 7.86682 22.1192 6.08216 21.4594C4.2975 20.7996 2.75783 19.6089 1.67042 18.0475C0.58301 16.4861 6.89254e-05 14.6291 7.30503e-05 12.7264C-0.0027526 10.882 0.544758 9.07867 1.57255 7.54719V7.54719Z"
			fill={fill}
		/>
	</svg>
);
