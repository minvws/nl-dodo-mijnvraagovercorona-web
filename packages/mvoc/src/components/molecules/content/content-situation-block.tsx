/** @jsx jsx */
import { ContentBlock, Link, Stack } from '@quarantaine/common';
import { Situation } from 'config/situaties';
import React from 'react';
import { jsx } from 'theme-ui';

interface SituationAsLink extends Situation {
	situationLinkTitle: string;
}

export interface ContentSituationBlockProps {
	content?: Array<Object>;
	situation?: SituationAsLink;
}

interface OwnProps {
	contentBlocks: ContentSituationBlockProps[];
}

export const getUrlBySituation = (situation: Situation) => {
	const prefix = '/situatie';

	if (situation.start) return `${prefix}/${situation.start}`;

	return `${prefix}/${situation.slug}`;
};

export const ContentSituationBlock: React.FC<OwnProps> = ({
	contentBlocks,
}) => {
	return (
		<Stack
			spacing={['1rem']}
			styles={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
		>
			{contentBlocks.map(
				(contentBlock: ContentSituationBlockProps, key: number) => {
					if (contentBlock.content) {
						return <ContentBlock key={key} content={contentBlock.content} />;
					} else if (contentBlock.situation?.path) {
						return (
							<Link
								key={key}
								styledAs="button"
								href={`/${contentBlock.situation.path}`}
							>
								{contentBlock.situation.situationLinkTitle}
							</Link>
						);
					}
				},
			)}
		</Stack>
	);
};
