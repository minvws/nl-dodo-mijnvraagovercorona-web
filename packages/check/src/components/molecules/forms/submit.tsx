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
		disabled?: boolean;
	}[];
	locale: Locales;
}

export const FormSubmit: React.FC<FormSubmitProps> = ({ buttons, locale }) => {
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
				flexDirection: 'row-reverse',
				'& > *': {
					flex: '1',
					maxInlineSize: 'calc(50% - 0.5rem)',
				},
			}}
		>
			{buttons.map((button, index) =>
				button.standard ? (
					<Link
						key={button._key}
						as="button"
						type="submit"
						disabled={button.disabled}
						styledAs={
							button.disabled
								? 'button-disabled'
								: index === 0
								? 'button'
								: 'button-tertiary'
						}
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
