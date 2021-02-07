/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';

/** @ts-ignore Types would be nice */
import SanityContentBlock from '@sanity/block-content-to-react';

interface ContentProps {
	title?: string;
	content: Array<Object>;
}

interface MarkProps {
	children: React.ReactNode;
	mark?: {
		href?: string;
	};
}

const serializers = {
	types: {
		block: ({ children }: MarkProps) => <Styled.p>{children}</Styled.p>,
	},
	marks: {
		strong: ({ children }: MarkProps) => (
			<strong sx={{ fontWeight: 'bold' }}>{children}</strong>
		),
		em: ({ children }: MarkProps) => (
			<em sx={{ fontStyle: 'italic' }}>{children}</em>
		),
		link: ({ children, mark }: MarkProps) => (
			<a href={mark?.href} target="_blank" rel="noopener noreferrer">
				{children}
			</a>
		),
	},
};

export const ContentBlock: React.FC<ContentProps> = ({ content }) => (
	<SanityContentBlock blocks={content} serializers={serializers} />
);
