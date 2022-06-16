/** @jsx jsx */
import { Input as ThemeInput, Label, jsx } from 'theme-ui';

interface InputProps<ValueOptions> {
	type: 'number';
	name: string;
	label: string | React.ReactElement;
	id: string;
	onChange?: (value: ValueOptions) => void;
}

export const Input = <ValueOptions extends string>({
	type,
	name,
	label,
	onChange,
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
				onChange={
					onChange
						? (ev) => onChange(ev.target.value as ValueOptions)
						: undefined
				}
			/>
		</div>
	);
};
