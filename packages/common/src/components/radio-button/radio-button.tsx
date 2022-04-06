/** @jsx jsx */
import { jsx } from 'theme-ui';

interface RadioButtonProps<ValueOptions> {
	name: string;
	label: string | React.ReactElement;
	value: ValueOptions;
	id: string;
	onChange: (value: ValueOptions) => void;
	checked?: boolean;
}

export const RadioButton = <ValueOptions extends string>({
	name,
	label,
	value,
	onChange,
	checked,
	id,
}: RadioButtonProps<ValueOptions>) => {
	return (
		<div sx={{ '& + &': { marginTop: 'mobilePadding' } }}>
			<input
				id={id}
				type="radio"
				name={name}
				value={value}
				onChange={(ev) => onChange(ev.target.value as ValueOptions)}
				checked={checked}
				sx={{
					position: 'absolute',
					height: 0,
					width: 0,
					opacity: 0,
					zIndex: -1,
				}}
			/>
			<label
				htmlFor={id}
				sx={{
					position: 'relative',
					display: 'block',
					// Calc initial padding + indicator width + spacing
					paddingInlineStart: 'calc(1.5rem + 1.625rem + 1rem)',
					paddingBlockStart: '1.5rem',
					paddingBlockEnd: '1.5rem',
					paddingInlineEnd: '1.5rem',
					borderRadius: 'button',
					border: 'tile',
					boxShadow: 'tile',
					fontSize: '1.125rem',
					color: 'copyHeading',
					cursor: 'pointer',

					// indicator
					'::before, ::after': {
						position: 'absolute',
						insetInlineStart: '1.5rem',
						insetBlockStart: 'calc(50% - 1.625rem/2)',
						display: 'block',
						width: '1.625rem',
						height: '1.625rem',
						borderRadius: '50%',
						border: '1px solid currentColor',
						content: '""',
					},
					'::before': {
						backgroundColor: 'white',
					},
					'::after': {
						borderColor: 'transparent',
						background: `url("data:image/svg+xml,%3Csvg width='14' height='14' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M13.332.44a1.074 1.074 0 0 0-1.44.146L5.607 7.619 1.827 4.346A1.072 1.072 0 0 0 .204 5.708l4.578 7.64c.193.322.54.52.916.521h.004c.374 0 .722-.195.917-.515l6.99-11.495a1.073 1.073 0 0 0-.277-1.42Z' fill='%23fff'/%3E%3C/svg%3E")`,
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'center center',
					},

					// Focus state
					'input:focus + &': {
						borderColor: 'copyHeading',
						// indicator
						'&::before': {
							boxShadow: 'focusRing',
						},
					},

					// Checked state
					'input:checked + &::before': {
						backgroundColor: 'currentColor',
					},

					// Correct possible children
					'> *': {
						marginBlockEnd: 0,
					},
				}}
			>
				{label}
			</label>
		</div>
	);
};
