/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import { ExpansionPanel, Stack, theme, trackEvent } from '@quarantaine/common';
import { ContentSituationBlockProps } from '../content';

export interface CaseProps {
	title: string;
	titleSuffix?: string;
	intro?: string;
	readMoreLabel?: string;
	contentBlocks?: ContentSituationBlockProps[];
}

export const Case: React.FC<CaseProps> = ({
	title,
	titleSuffix,
	intro,
	readMoreLabel,
	children,
}) => {
	return (
		<Styled.div
			sx={{
				padding: '1rem',
				border: `1px solid ${theme?.colors?.headerBackground}`,
				borderRadius: '5px',
				boxShadow: `4px 12px 12px rgba(0, 0, 0, 0.07), 0px 4px 0px ${theme?.colors?.headerBackground}`,
				backgroundColor: 'white',
			}}
		>
			<Stack spacing={['1rem']}>
				<Styled.h3
					sx={{
						marginBlockStart: 0,
						color: 'header',
						fontSize: ['bodyMobile', 'body'],
					}}
				>
					{title}
					{titleSuffix && (
						<span sx={{ fontWeight: 'normal' }}> {titleSuffix}</span>
					)}
				</Styled.h3>
				{intro && <Styled.p sx={{ color: 'detailText' }}>{intro}</Styled.p>}
				{!!(children && readMoreLabel) && (
					<ExpansionPanel
						variant="plusinline"
						title={readMoreLabel}
						toggleEvent={(state: string) =>
							state === 'open' && trackEvent('Situation', 'Open', title)
						}
					>
						<Stack>{children}</Stack>
					</ExpansionPanel>
				)}
			</Stack>
		</Styled.div>
	);
};
