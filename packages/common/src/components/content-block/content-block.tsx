/** @jsx jsx */
import React, { useEffect, useMemo } from 'react';
import { jsx, Styled } from 'theme-ui';

import { Link } from '@quarantaine/common';

/** @ts-ignore Types would be nice */
import SanityContentBlock from '@sanity/block-content-to-react';
import { InlineDialog } from '../dialog';
import { SaveInCalendar } from '../save-in-calendar';
import { useSanitySiteSettings } from '../../utilities';

export type ContentVariables = { [key: string]: string };

interface ContentProps {
	title?: string;
	content: Array<Object>;
	contentVariables?: ContentVariables;
}

interface MarkProps {
	children: React.ReactNode;
	contentVariables?: ContentVariables;
	node?: {
		style: string;
	};
	mark?: {
		href: string;
		internal?: boolean;
		button?: boolean;
	};
}

interface DialogProps {
	children: React.ReactNode;
	mark: {
		modal_title: string;
		modal_content: Array<Object>;
	};
}

interface AddToCalendarProps {
	children: React.ReactNode;
	mark: {
		modal_title: string;
		modal_body: string;
		invite_title: string;
		invite_text: string;
	};
}

export const replaceContentVariables = (
	text: unknown,
	contentVariables: ContentVariables | undefined,
) => {
	if (typeof text !== 'string' || !contentVariables) return text;
	let replacedText = text;
	Object.keys(contentVariables).map(
		(key) =>
			(replacedText = replacedText.replace(`$$${key}`, contentVariables[key])),
	);

	return replacedText;
};

export const replaceContentVariablesInReactChildren = (
	children: React.ReactNode,
	contentVariables: ContentVariables | undefined,
) =>
	React.Children.map(children, (child) =>
		replaceContentVariables(child, contentVariables),
	);

const Block = ({ node, children, contentVariables }: MarkProps) => {
	if (node?.style === 'h2') return <Styled.h2>{children}</Styled.h2>;
	if (node?.style === 'span') return <span>{children}</span>;
	return (
		<Styled.p>
			{replaceContentVariablesInReactChildren(children, contentVariables)}
		</Styled.p>
	);
};

const getSerializers = (contentVariables?: ContentVariables) => ({
	types: {
		block: (props: MarkProps) => (
			<Block {...props} contentVariables={contentVariables} />
		),
	},
	list: ({ children }: MarkProps) => <Styled.ul>{children}</Styled.ul>,
	container: ({ children }: MarkProps) => <>{children}</>,
	marks: {
		strong: ({ children }: MarkProps) => (
			<strong sx={{ fontWeight: 'bold' }}>
				{replaceContentVariablesInReactChildren(children, contentVariables)}
			</strong>
		),
		em: ({ children }: MarkProps) => (
			<em sx={{ fontStyle: 'italic' }}>
				{replaceContentVariablesInReactChildren(children, contentVariables)}
			</em>
		),
		link: ({ children, mark }: MarkProps) => (
			<Link
				href={replaceContentVariables(mark!.href, contentVariables) as string}
				withChevron={false}
				external={!mark?.internal}
				styledAs={mark?.button ? 'button' : undefined}
				sx={
					!mark?.button
						? {
								textDecoration: 'underline',
								fontSize: 'inherit',
						  }
						: {
								height: 'auto',
								minHeight: '55px',
								lineHeight: 1.5,
								py: '12px',
								fontWeight: 'bold',
								marginBottom: '8px',
								marginTop: '8px',
						  }
				}
			>
				{mark?.button ? (
					<span>
						{replaceContentVariablesInReactChildren(children, contentVariables)}
					</span>
				) : (
					replaceContentVariablesInReactChildren(children, contentVariables)
				)}
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
		addToCalendar: ({ children, mark }: AddToCalendarProps) => {
			const siteSettings = useSanitySiteSettings();
			return (
				<SaveInCalendar
					locale="nl"
					content={{
						tot_en_met: siteSettings.quarantaineCalendar.dateSeperator,
						other_calendar: siteSettings.quarantaineCalendar.otherCalendar,
					}}
					modalTitle={mark.modal_title}
					modalBody={mark.modal_body}
					inviteText={mark.invite_text}
					inviteTitle={mark.invite_title}
					singleDay={new Date()}
				>
					{replaceContentVariablesInReactChildren(children, contentVariables)}
				</SaveInCalendar>
			);
		},
	},
});

export const ContentBlock: React.FC<ContentProps> = ({
	content,
	contentVariables,
	...props
}) => {
	const serializers = useMemo(() => getSerializers(contentVariables), [
		contentVariables,
	]);

	return (
		<SanityContentBlock blocks={content} serializers={serializers} {...props} />
	);
};
