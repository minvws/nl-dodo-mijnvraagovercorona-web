import { ButtonVariants } from '@design-system/elements/Button';
import { IconProps } from '@design-system/elements/Icon';
import { internalPageReferenceInSelectQuery } from './internalPageReference';

export interface ButtonProps {
	label: string;
	href?: string;
	variant: ButtonVariants;
	icon: IconProps['name'];
}

export type ButtonsProps = ButtonProps[];

export const buttonsQuery = ({ array }: { array: boolean }): string => {
	return `button${array ? 's[]' : ''}{
		label,
		"href": select(
			${internalPageReferenceInSelectQuery()}
			href,
		),
		variant,
		icon,
	}`;
};
