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
		<Stack spacing={['32px']} key={title}>
			<img src={image} alt="" />
			<Styled.h2>{title}</Styled.h2>
			{content && <ContentBlock content={content} />}
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
	);
};
