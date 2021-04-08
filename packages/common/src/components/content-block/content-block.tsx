/** @jsx jsx */
import React from 'react';
import { jsx, Styled } from 'theme-ui';

import { Link } from '@quarantaine/common';

/** @ts-ignore Types would be nice */
import SanityContentBlock from '@sanity/block-content-to-react';
import { InlineDialog } from '../dialog';

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
		href: string;
		internal?: boolean;
	};
}

interface DialogProps {
	children: React.ReactNode;
	mark: {
		modal_title: string;
		modal_content: Array<Object>;
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
			<Link
				href={mark!.href}
				withChevron={false}
				external={!mark?.internal}
				sx={{
					textDecoration: 'underline',
					fontSize: 'inherit',
				}}
			>
				{Array.isArray(children) ? children[0] : children}
			</Link>
		),
		dialog: ({ children, mark }: DialogProps) => {
			return (
				<InlineDialog
					title={mark.modal_title}
					buttonText={`${Array.isArray(children) ? children[0] : children}`}
				>
					<ContentBlock content={mark.modal_content} />
				</InlineDialog>
			);
		},
	},
};

export const ContentBlock: React.FC<ContentProps> = ({ content }) => (
	<SanityContentBlock blocks={content} serializers={serializers} />
);
