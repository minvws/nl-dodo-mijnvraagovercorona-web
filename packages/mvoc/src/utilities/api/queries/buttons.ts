import { ButtonVariants, IconPositions } from '@design-system/elements/Button';
import { IconProps } from '@design-system/elements/Icon';
import { SubFolderReferenceProps, internalPageReferenceInSelectQuery } from '.';

export interface ButtonProps {
	type: 'button';
	label: string;
	slugCollection?: {
		slug: string;
		deepLink?: string;
		subFolderReference: SubFolderReferenceProps;
	};
	variant: ButtonVariants;
	iconPosition: IconPositions;
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
		label,
		"slugCollection": select(
			${internalPageReferenceInSelectQuery()},
			{
				"slug": href
			}
		),
		variant,
		iconPosition,
		icon,
	}`;
};
