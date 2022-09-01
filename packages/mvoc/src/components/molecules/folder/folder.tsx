/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';
import { ContentBlock, Stack } from '@quarantaine/common';
import { Case, CaseProps } from './case';
import { ContentSituationBlock } from '../content';

export interface FolderProps {
	title: string;
	image?: string;
	content?: Array<Object>;
	cases: CaseProps[];
}

export const Folder: React.FC<FolderProps> = ({
	title,
	content,
	image,
	cases,
}) => {
	return (
		<Stack spacing={['2rem']}>
			<img
				src={image}
				alt=""
				sx={{
					display: 'block',
					inlineSize: '100%',
					maxInlineSize: '22rem',
					marginInlineStart: 'auto',
					marginInlineEnd: 'auto',
					aspectRatio: '16 / 10',
					objectFit: 'contain',
					objectPosition: 'center center',
				}}
			/>
			<Stack spacing={['1rem']}>
				<Styled.h2>{title}</Styled.h2>
				{content && <ContentBlock content={content} />}
			</Stack>
			<Stack spacing={['1rem']}>
				{cases
					// if not translated, don't show
					.filter((item) => item.title)
					.map((item) => (
						<Case
							key={item.title}
							title={item.title}
							titleSuffix={item.titleSuffix}
							intro={item.intro}
							readMoreLabel={item.readMoreLabel}
						>
							{item.contentBlocks && (
								<ContentSituationBlock contentBlocks={item.contentBlocks} />
							)}
						</Case>
					))}
			</Stack>
		</Stack>
	);
};
