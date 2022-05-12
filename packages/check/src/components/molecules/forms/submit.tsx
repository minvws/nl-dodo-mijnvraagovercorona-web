/** @jsx jsx */
import { getHrefWithlocale, Link, Locales } from '@quarantaine/common';
import React from 'react';
import { Box, jsx } from 'theme-ui';

export interface FormSubmitProps {
	buttons: {
		_key: string;
		standard: boolean;
		text: string;
		next: string;
	}[];
	locale: Locales;
	canSubmit: boolean;
}

export const FormSubmit: React.FC<FormSubmitProps> = ({
	buttons,
	locale,
	canSubmit,
}) => {
	return (
		<Box
			sx={{
				display: 'flex',
				flexWrap: 'wrap',
				gap: '1rem',
				paddingInlineStart: 0,
				justifyContent: 'flex-start',
				alignItems: 'center',
				listStyle: 'none',
				'& > *': {
					flex: '1',
				},
			}}
		>
			{buttons.map((button, index) =>
				button.standard ? (
					<Link
						key={button._key}
						as="button"
						type="submit"
						styledAs={index === 0 ? 'button' : 'button-tertiary'}
					>
						{button.text}
					</Link>
				) : (
					<Link
						key={button._key}
						as="a"
						href={`/${getHrefWithlocale(`/${button.next}`, locale)}`}
						styledAs={index === 0 ? 'button' : 'button-tertiary'}
					>
						{button.text}
					</Link>
				),
			)}
		</Box>
	);
};
