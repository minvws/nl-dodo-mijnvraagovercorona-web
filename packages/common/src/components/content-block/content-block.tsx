/** @jsx jsx */
import React, { useContext, useMemo } from 'react';
import { Image, jsx, Styled } from 'theme-ui';

import { Link, Stack } from '@quarantaine/common';

/** @ts-ignore Types would be nice */
import SanityContentBlock from '@sanity/block-content-to-react';
import { InlineDialog } from '../dialog';
import { SaveInCalendar } from '../save-in-calendar';
import { SanityImageFullProps, useSanitySiteSettings } from '../../utilities';

export type ContentVariables = { [key: string]: string };

interface ContentProps {
	title?: string;
	content: Array<Object>;
}

interface MarkProps {
	children: React.ReactNode;
	contentVariables?: ContentVariables;
	node?: {
		style: string;
	};
	mark?: {
		href: string;
		chevron?: boolean;
		internal?: boolean;
		button?: boolean;
	};
}

interface DialogProps {
	children: React.ReactNode;
	mark: {
		title: string;
		image: SanityImageFullProps;
		content: Array<Object>;
	};
}

interface AddToCalendarProps {
	children: React.ReactNode;
	mark: {
		modal_title: string;
		modal_body: string;
		invite_title: string;
		invite_text: string;
		period: 'quarantaine-period' | 'testappointment-reminder';
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
				withChevron={mark?.chevron || false}
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
					title={mark.title}
					buttonText={`${Array.isArray(children) ? children[0] : children}`}
				>
					<Stack>
						{mark.image.src ? (
							<Image
								src={mark.image.src}
								alt=""
								sx={{
									display: 'block',
									maxInlineSize: '100%',
									marginInline: 'auto',
								}}
							/>
						) : null}
						<ContentBlock content={mark.content} />
					</Stack>
				</InlineDialog>
			);
		},
		addToCalendar: ({ children, mark }: AddToCalendarProps) => {
			const siteSettings = useSanitySiteSettings();
			const { serializersConfig } = useContentBlockData();

			if (
				!mark.period ||
				!serializersConfig?.addToCalendar?.testday ||
				!serializersConfig?.addToCalendar?.quarantaine
			)
				return null;

			const dateProps =
				mark.period === 'testappointment-reminder'
					? {
							singleDay: serializersConfig.addToCalendar.testday,
					  }
					: {
							fromDate: serializersConfig.addToCalendar.quarantaine[0],
							toDate: serializersConfig.addToCalendar.quarantaine[1],
					  };

			return (
				<SaveInCalendar
					locale="nl"
					content={{
						tot_en_met: siteSettings.quarantaineCalendar.dateSeperator,
						other_calendar: siteSettings.quarantaineCalendar.otherCalendar,
					}}
					modalTitle={mark.modal_title}
					modalBody={mark.modal_body}
					inviteText={`${replaceContentVariables(
						mark.invite_text,
						contentVariables,
					)}`}
					inviteTitle={mark.invite_title}
					{...dateProps}
				>
					{replaceContentVariablesInReactChildren(children, contentVariables)}
				</SaveInCalendar>
			);
		},
	},
});

interface ContentBlockDataContextState {
	contentVariables?: Record<string, string>;
	serializersConfig?: {
		addToCalendar?: {
			testday?: Date;
			quarantaine?: [Date, Date];
		};
	};
}

/**
 * This context is responsible for holding 2 things;
 * 1. contentVariables: Any variables like $$country that should be replace in
 *    the content blocks rendered inside the provider.
 * 2. serialiersConfig: Custom config for a specific serializer, like dates for the
 *    add to calendar serializer.
 */
const ContentBlockDataContext = React.createContext<ContentBlockDataContextState>(
	{},
);
export const ContentBlockDataProvider: React.FC<ContentBlockDataContextState> = ({
	children,
	...data
}) => {
	const memoizedData = useMemo(() => data, [data]);
	return (
		<ContentBlockDataContext.Provider value={memoizedData}>
			{children}
		</ContentBlockDataContext.Provider>
	);
};
export const useContentBlockData = () => useContext(ContentBlockDataContext);

export const ContentBlock: React.FC<ContentProps> = ({ content, ...props }) => {
	const { contentVariables } = useContentBlockData();
	const serializers = useMemo(() => getSerializers(contentVariables), [
		contentVariables,
	]);

	return (
		<SanityContentBlock blocks={content} serializers={serializers} {...props} />
	);
};
