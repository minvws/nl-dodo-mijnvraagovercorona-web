/** @jsx jsx */
import { ContentBlock, Link, Stack } from '@quarantaine/common';
import { Situation, SituationNew } from 'config/situaties';
import React from 'react';
import { jsx } from 'theme-ui';

interface SituationAsLink extends Situation {
	situationLinkTitle: string;
}

interface SituationNewAsLink extends SituationNew {
	situationLinkTitle: string;
}

export interface ContentSituationBlockProps {
	content?: Array<Object>;
	situation?: SituationAsLink;
	situationNew?: SituationNewAsLink;
}

interface OwnProps {
	contentBlocks: ContentSituationBlockProps[];
}

export const getUrlBySituation = (situation: Situation) => {
	if (
		typeof situation.showExceptions !== 'undefined' &&
		situation.showExceptions
	) {
		return `/${situation.url}/ben-ik-uitgezonderd`;
	} else if (typeof situation.showDate !== 'undefined' && situation.showDate) {
		return `/${situation.url}/wanneer`;
	}
	return `/${situation.url}`;
};

export const getUrlBySituationNew = (situation: SituationNew) => {
	const prefix = '/situatie';
	if (situation.start) return `${prefix}/${situation.slug}/${situation.start}`;
	return `${prefix}/${situation.slug}`;
};

export const ContentSituationBlock: React.FC<OwnProps> = ({
	contentBlocks,
}) => {
	return (
		<Stack spacing={['16px']}>
			{contentBlocks.map(
				(contentBlock: ContentSituationBlockProps, key: number) => {
					if (contentBlock.content) {
						return (
							<div key={key}>
								<ContentBlock content={contentBlock.content} />
							</div>
						);
					} else if (contentBlock.situationNew?.slug) {
						return (
							<Link
								key={key}
								styledAs="button"
								href={getUrlBySituationNew(contentBlock.situationNew)}
							>
								{contentBlock.situationNew.situationLinkTitle}
							</Link>
						);
					} else if (contentBlock.situation?.url) {
						return (
							<Link
								key={key}
								styledAs="button"
								href={getUrlBySituation(contentBlock.situation)}
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
