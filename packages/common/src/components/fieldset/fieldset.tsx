/** @jsx jsx */
import { jsx } from 'theme-ui';

interface FieldsetProps<ValueOptions> {
	children: React.ReactChildren;
	legend?: string | React.ReactElement;
}

export const Fieldset = <ValueOptions extends string>({
	children,
	legend,
}: FieldsetProps<ValueOptions>) => {
	return (
		<fieldset>
			{legend && <legend>{legend}</legend>}
			{children}
		</fieldset>
	);
};
