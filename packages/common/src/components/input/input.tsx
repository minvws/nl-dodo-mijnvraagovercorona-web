/** @jsx jsx */
import { Input as ThemeInput, Label, jsx } from 'theme-ui';

interface InputProps {
	type: 'number';
	name: string;
	label: string;
	placeholder: string;
	id: string;
	onChange: (event: any) => void;
}

export const Input = ({
	type,
	name,
	label,
	placeholder,
	onChange,
	id,
}: InputProps) => {
	return (
		<div>
			<Label
				htmlFor={id}
				sx={{
					fontFamily: 'body',
					fontSize: ['h3Mobile', 'h3'],
					lineHeight: ['h3Mobile', 'h3'],
					color: 'header',
					margin: '0',
					marginBottom: 'h2Spacing',
					fontWeight: 'bold',
				}}
			>
				{label}
			</Label>
			<ThemeInput
				id={id}
				type={type}
				name={name}
				placeholder={placeholder}
				onChange={onChange}
				sx={{
					margin: 0,

					border: '1px solid',
					borderColor: 'inputBorder',
					borderRadius: '5px',
					width: '100%',
					height: '55px',
					padding: '15px 17px',
					fontSize: ['bodyMobile', 'body'],
					lineHeight: ['bodyMobile', 'body'],
					fontFamily: 'body',
					color: 'black',

					'&::placeholder': {
						color: 'detailText',
					},
				}}
			/>
		</div>
	);
};
