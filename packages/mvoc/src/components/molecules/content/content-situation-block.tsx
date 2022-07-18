/** @jsx jsx */
import {
	ContentBlock,
	Link,
	SanityImageFullProps,
	Stack,
	Video,
} from '@quarantaine/common';
import { Situation } from 'config/situaties';
import React from 'react';
import { Box, Image, jsx } from 'theme-ui';
import getYouTubeId from 'get-youtube-id';
import YouTube from 'react-youtube';

interface SituationAsLink extends Situation {
	situationLinkTitle: string;
}

export interface ContentSituationBlockProps {
	content?: Array<Object>;
	situation?: SituationAsLink;
	video?: {
		url: string;
		title: string;
		image: SanityImageFullProps;
	};
	image?: SanityImageFullProps;
}

interface OwnProps {
	contentBlocks: ContentSituationBlockProps[];
}

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
					} else if (contentBlock.image?.src) {
						return (
							<Image
								sx={{ maxInlineSize: '100%', marginInline: 'auto' }}
								key={key}
								src={contentBlock.image?.src}
								alt=""
								loading="lazy"
							/>
						);
					} else if (
						contentBlock.video?.url ||
						contentBlock.video?.title ||
						contentBlock.video?.image?.src
					) {
						return (
							<Video
								key={key}
								title={contentBlock.video?.title}
								url={contentBlock.video?.url}
								image={contentBlock.video?.image}
							/>
						);
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
