/** @jsxImportSource theme-ui */
import { jsx, Text } from 'theme-ui';

interface FieldsetProps<ValueOptions> {
	children: JSX.Element | JSX.Element[];
	legend?: string | React.ReactElement;
}

export const Fieldset = <ValueOptions extends string>({
	children,
	legend,
}: FieldsetProps<ValueOptions>) => {
	return (
		<fieldset
			sx={{
				padding: 0,
				marginBottom: 'paragraphSpacing',
				border: 'none',
			}}
		>
			{legend && (
				<Text as="legend" variant="legend">
					{legend}
				</Text>
			)}
			{children}
		</fieldset>
	);
};
