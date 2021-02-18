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
	node?: {
		style: string;
	};
	mark?: {
		href?: string;
	};
}

const Block = ({ node, children }: MarkProps) => {
	if (node?.style === 'h2') return <Styled.h2>{children}</Styled.h2>;

	return <Styled.p>{children}</Styled.p>;
};

const serializers = {
	types: {
		block: Block,
	},
	list: ({ children }: MarkProps) => <Styled.ul>{children}</Styled.ul>,
	container: ({ children }: MarkProps) => <>{children}</>,
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
