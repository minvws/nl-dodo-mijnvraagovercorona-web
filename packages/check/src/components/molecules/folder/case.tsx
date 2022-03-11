/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import { ExpansionPanel, Stack } from '@quarantaine/common';
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
				border: '1px solid #EEF7FB',
				borderRadius: '5px',
				boxShadow: '0px 4px 0px #EEF7FB',
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
					<ExpansionPanel variant="plusinline" title={readMoreLabel}>
						<Stack>{children}</Stack>
					</ExpansionPanel>
				)}
			</Stack>
		</Styled.div>
	);
};
