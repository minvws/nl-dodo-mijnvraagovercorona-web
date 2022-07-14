/** @jsx jsx */
import {
	ContentBlock,
	Link,
	SanityImageFullProps,
	Stack,
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
							/>
						);
					} else if (contentBlock.video?.url) {
						const id = getYouTubeId(contentBlock.video?.url);
						return (
							<Box
								key={key}
								sx={{
									inlineSize: '100%',
									'& > .youtube-wrap > iframe': {
										inlineSize: '100%',
										blockSize: 'auto',
										aspectRatio: '16/9',
									},
								}}
							>
								<YouTube className="youtube-wrap" videoId={id || undefined} />
							</Box>
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
