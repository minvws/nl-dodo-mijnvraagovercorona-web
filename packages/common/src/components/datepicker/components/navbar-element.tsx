/** @jsxRuntime classic /
/** @jsx jsx */
import { ChevronIcon } from '../../../icons';
import { NavbarElementProps } from 'react-day-picker';
import { ScreenReaderOnly } from '../../screen-reader-only';
import { jsx } from 'theme-ui';

/**
 * Prev / next month navigation component passed to ReactDayPicker.
 */
export const Navbar = ({
	nextMonth,
	previousMonth,
	onPreviousClick,
	onNextClick,
	localeUtils,
}: NavbarElementProps) => {
	const months = localeUtils.getMonths();
	const prev = months[previousMonth.getMonth()];
	const next = months[nextMonth.getMonth()];

	return (
		<div
			sx={{
				position: 'absolute',
				width: '100%',
				display: 'flex',
				justifyContent: 'space-between',
				top: 8,
				left: 0,
				svg: { width: ['16px', '10px'] },
				path: { fill: 'smallText', stroke: 'smallText' },
				button: {
					border: 'none',
					backgroundColor: 'transparent',
					// This makes sure that if a user quickly taps the button,
					// the mobile browsers won't see this as a "double tap to zoom".
					touchAction: 'manipulation',
				},
			}}
		>
			<button
				sx={{
					paddingLeft: 10,
					paddingRight: 0,
					svg: { transform: 'rotate(180deg)' },
				}}
				data-testid="prev-month"
				onClick={() => onPreviousClick()}
			>
				<span aria-hidden>
					<ChevronIcon />
				</span>
				<ScreenReaderOnly>{prev}</ScreenReaderOnly>
			</button>
			<button
				sx={{ paddingRight: 10, paddingLeft: 0 }}
				data-testid="next-month"
				onClick={() => onNextClick()}
			>
				<ScreenReaderOnly>{next}</ScreenReaderOnly>
				<span aria-hidden>
					<ChevronIcon />
				</span>
			</button>
		</div>
	);
};
