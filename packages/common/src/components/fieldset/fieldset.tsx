/** @jsx jsx */
import { theme } from '../../theme';
import { Heading, jsx } from 'theme-ui';

interface FieldsetProps<ValueOptions> {
	children: React.ReactChildren;
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
				margin: 0,
				border: 'none',
			}}
		>
			{legend && (
				<Heading
					as="legend"
					sx={{
						...theme.text?.legend,
					}}
				>
					{legend}
				</Heading>
			)}
			{children}
		</fieldset>
	);
};
