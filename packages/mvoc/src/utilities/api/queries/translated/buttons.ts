import { ButtonVariants } from '@design-system/elements/Button';
import { IconProps } from '@design-system/elements/Icon';
import { internalPageReferenceInSelectQuery } from './internalPageReference';

export interface ButtonProps {
	type: string;
	label: string;
	href?: string;
	variant: ButtonVariants;
	icon: IconProps['name'];
}

export type ButtonsProps = ButtonProps[];

export const buttonsQuery = ({
	array,
	omitProperty = false,
}: {
	array: boolean;
	omitProperty?: boolean;
}): string => {
	return `${omitProperty ? '' : `button${array ? 's[]' : ''}`}{
		"type": _type,
		label,
		"href": select(
			${internalPageReferenceInSelectQuery()}
			href,
		),
		variant,
		icon,
	}`;
};
