/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import slugify from 'slugify';
import { ExpansionPanel, Stack, trackEvent } from '@quarantaine/common';
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
	const id = slugify(title, {
		lower: true,
		strict: true,
	});
	return (
		<Styled.div
			sx={{
				padding: '1rem',
				border: 'tile',
				borderRadius: 'box',
				boxShadow: 'tile',
				backgroundColor: 'white',
			}}
		>
			<a
				id={id}
				sx={{
					display: 'block',
					position: 'relative',
					top: '-40px',
					visibility: 'hidden',
				}}
			/>
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
						deepLinkAble
						anchorToPanel={false}
						id={id}
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
