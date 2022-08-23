/** @jsx jsx */
import { getHrefWithlocale, Link, Locales } from '@quarantaine/common';
import { StyledLinkPropsBase } from '@quarantaine/common/src/components/link/styled-link';
import React from 'react';
import { Box, jsx } from 'theme-ui';

export interface FormSubmitProps {
	buttons: {
		_key: string;
		standard: boolean;
		text: string;
		next: string;
		styledAs?: string;
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
				justifyContent: 'flex-start',
				alignItems: 'center',
				flexDirection: 'row-reverse',
				paddingBlockEnd: ['0.5rem', 0],
				paddingInline: ['0.5rem', 0],
				marginInline: ['-0.5rem', 0],
				backgroundColor: 'rgba(255,255,255,0.65)',
				backdropFilter: 'blur(2px)',
				'::before, ::after': {
					position: 'absolute',
					inlineSize: '100%',
					blockSize: '1rem',
					content: '""',
				},
				'::before': {
					insetBlockEnd: '100%',
					background:
						'linear-gradient(0deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 100%)',
				},
				'::after': {
					insetBlockStart: '100%',
					background:
						'linear-gradient(180deg, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 100%)',
				},
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
						styledAs={
							button.styledAs
								? (button.styledAs as StyledLinkPropsBase['styledAs'])
								: index === 0
								? 'button'
								: 'button-tertiary'
						}
					>
						{button.text}
					</Link>
				),
			)}
		</Box>
	);
};
