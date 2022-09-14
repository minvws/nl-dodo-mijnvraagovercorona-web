/** @jsxImportSource theme-ui */
import {
	ContentBlock,
	Link,
	SanityImageFullProps,
	Stack,
	Video,
} from '@quarantaine/common';
import { Situation } from 'config/situaties';
import React from 'react';
import { Image, jsx } from 'theme-ui';

interface SituationAsLink extends Situation {
	situationLinkTitle: string;
}

export interface MultiContentBlockProps {
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
	contentBlocks: MultiContentBlockProps[];
}

export const MultiContentBlock: React.FC<OwnProps> = ({ contentBlocks }) => {
	return (
		<Stack
			spacing={['1rem']}
			styles={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}
		>
			{contentBlocks.map(
				(contentBlock: MultiContentBlockProps, key: number) => {
					if (contentBlock.content) {
						return (
							<Stack
								key={key}
								spacing={['1rem']}
								styles={{
									ol: {
										listStyle: 'none',
										paddingInlineStart: 0,
										marginInlineStart: 0,
										counterReset: 'steps',
										li: {
											display: 'flex',
											counterIncrement: 'steps',
											fontSize: ['bodyMobile', 'body'],
											lineHeight: ['bodyMobile', 'body'],
											':not(:last-child)': {
												marginBlockEnd: '0.5rem',
											},
											'> *:last-child': {
												flex: 1,
											},
											'::before': {
												display: 'block',
												flex: '0 0 auto',
												blockSize: '1.5rem',
												inlineSize: '1.5rem',
												marginInlineEnd: '1rem',
												borderRadius: '50%',
												fontSize: 'smallText',
												lineHeight: '1.5rem',
												textAlign: 'center',
												color: 'white',
												backgroundColor: 'secondary',
												content: 'counter(steps)',
											},
										},
									},
								}}
							>
								<ContentBlock content={contentBlock.content} />
							</Stack>
						);
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
