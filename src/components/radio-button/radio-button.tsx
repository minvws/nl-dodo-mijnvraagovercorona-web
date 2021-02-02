/** @jsx jsx */
import { jsx } from 'theme-ui';
import { useId } from '@reach/auto-id';

interface RadioButtonProps<ValueOptions> {
	name: string;
	label: string;
	value: ValueOptions;
	onChange: (val: ValueOptions) => void;
	checked?: boolean;
}

export const RadioButton = <ValueOptions extends string>({
	name,
	label,
	value,
	onChange,
	checked,
}: RadioButtonProps<ValueOptions>) => {
	const id = useId();
	return (
		<>
			<input
				id={id}
				type="radio"
				name={name}
				value={value}
				onChange={(ev) => onChange(ev.target.value as ValueOptions)}
				checked={checked}
				sx={{
					height: 0,
					width: 0,
					opacity: 0,
					zIndex: -1,
				}}
			/>
			<label
				htmlFor={id}
				sx={{
					display: 'block',
					cursor: 'pointer',
					fontSize: '18px',
					paddingY: '4px',
					position: 'relative',
					paddingLeft: '32px',
					'::before, ::after': {
						content: '""',
						display: 'block',
						position: 'absolute',
						borderRadius: '20px',
					},
					'::before': {
						width: '20px',
						height: '20px',
						backgroundColor: 'white',
						border: '1px solid black',
						left: 0,
						top: 3,
					},
					'input:focus + &::before': {
						boxShadow: '0px 0px 1px 3px rgba(1, 104, 155, 0.3)',
					},
					'input:checked + &::after': {
						width: '14px',
						height: '14px',
						backgroundColor: 'black',
						left: 4,
						top: 7,
					},
				}}
			>
				{label}
			</label>
		</>
	);
};
