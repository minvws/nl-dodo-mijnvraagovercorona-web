/** @jsx jsx */
import { Input as ThemeInput, Label, jsx } from 'theme-ui';

interface InputProps<ValueOptions> {
	type: 'radio' | 'checkbox';
	name: string;
	label: string | React.ReactElement;
	value: ValueOptions;
	id: string;
	onChange?: (value: ValueOptions) => void;
	checked?: boolean;
}

export const Input = <ValueOptions extends string>({
	type,
	name,
	label,
	value,
	onChange,
	checked,
	id,
}: InputProps<ValueOptions>) => {
	return (
		<div>
			<Label htmlFor={id} sx={{}}>
				{label}
			</Label>
			<ThemeInput
				id={id}
				type={type}
				name={name}
				value={value}
				onChange={
					onChange
						? (ev) => onChange(ev.target.value as ValueOptions)
						: undefined
				}
				checked={checked}
			/>
		</div>
	);
};
