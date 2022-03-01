/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import { ExpansionPanel, Stack } from '@quarantaine/common';

interface OwnProps {
	title: string;
	titleSuffix?: string;
	intro?: string;
	readMoreLabel?: string;
}

export const Case: React.FC<OwnProps> = ({
	title,
	titleSuffix,
	intro,
	readMoreLabel,
	children,
}) => {
	return (
		<Styled.div
			sx={{
				backgroundColor: 'white',
				padding: '16px',
			}}
		>
			<Stack spacing={['16px']}>
				<Styled.h3
					sx={{
						marginBlockStart: 0,
						color: 'header',
						fontSize: 'bodyMobile',
					}}
				>
					{title}
					{titleSuffix && (
						<span sx={{ fontWeight: 'normal' }}> {titleSuffix}</span>
					)}
				</Styled.h3>
				{intro && <Styled.p sx={{ color: 'detailText' }}>{intro}</Styled.p>}
				{!!(children && readMoreLabel) && (
					<ExpansionPanel title={readMoreLabel}>
						<Stack>{children}</Stack>
					</ExpansionPanel>
				)}
			</Stack>
		</Styled.div>
	);
};
