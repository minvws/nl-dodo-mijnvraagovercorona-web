/** @jsx jsx */
import { useEffect, useRef, useState } from 'react';
import { jsx, Container } from 'theme-ui';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@reach/disclosure';
import {
	useExpansionPanelGroup,
	useExpansionPanelId,
} from './expansion-panel-group';
import slugify from 'slugify';

export type ExpansionPanelVariant =
	| 'chevron'
	| 'plus'
	| 'plusalt'
	| 'plusinline'
	| undefined;

type ExpansionPanelProps = {
	title: string;
	/**
	 * Title suffix is an optional suffix to the title, used a short additional description.
	 * The main difference is that this text won't render in bold.
	 */
	titleSuffix?: string;
	variant?: ExpansionPanelVariant;
	toggleEvent?: Function;
	deepLinkAble?: boolean;
	anchorToPanel?: boolean;
	id?: string;
	children: React.ReactNode;
};

export const ExpansionPanel = ({
	title,
	children,
	titleSuffix,
	toggleEvent,
	variant,
	deepLinkAble,
	anchorToPanel = true,
	id,
}: ExpansionPanelProps) => {
	const [open, setOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const internalID = useExpansionPanelId();
	const hrefID =
		id ||
		slugify(title, {
			lower: true,
			strict: true,
		});

	// Panel group will only be set and used if it is indeed wrapped inside a group
	// Otherwise this won't have any effect.
	const { expandedPanel, setExpandedPanel } = useExpansionPanelGroup();
	const handleChange = () => {
		toggleEvent && toggleEvent(open ? 'close' : 'open');
		setOpen((open) => !open);
	};

	useEffect(() => {
		if (expandedPanel && expandedPanel !== internalID) {
			setOpen(false);
		}
	}, [expandedPanel]);

	useEffect(() => {
		if (open && contentRef?.current) {
			if (anchorToPanel) {
				/* If the element is fully within the visible area of the viewport, it does nothing.
				 * Otherwise, the element is scrolled into view.
				 * A proprietary variant of the standard Element.scrollIntoView() method.
				 * This is needed for mobile devices and both Android Chrome and iOs support it */
				/* @ts-ignore */
				contentRef.current.scrollIntoViewIfNeeded?.();
			}
			if (window && deepLinkAble) {
				window.history.pushState(null, '', `#${hrefID}`);
			}
		}
		if (open && typeof setExpandedPanel === 'function' && internalID) {
			setExpandedPanel(internalID);
		}
	}, [open]);

	useEffect(() => {
		if (!window || !deepLinkAble) return;

		if (window.location.hash.replace('#', '') === hrefID) setOpen(true);
	}, []);

	return (
		<Container
			sx={{
				backgroundColor: variant === 'plus' ? 'expansionPanel' : 'white',
				marginBottom: variant === 'plus' || variant === 'plusalt' ? '16px' : 0,
				borderBottom: variant === 'chevron' ? '1px solid #AEC1D1' : undefined,
				borderTop: variant === 'chevron' ? '1px solid #AEC1D1' : undefined,
				'& + &': {
					borderTop: 'none',
				},
			}}
		>
			{deepLinkAble && anchorToPanel ? (
				<a
					id={hrefID}
					sx={{
						display: 'block',
						position: 'relative',
						top: '-40px',
						visibility: 'hidden',
					}}
				/>
			) : null}
			<Disclosure onChange={handleChange} open={open}>
				<dl
					sx={{
						display: 'flex',
						flexDirection: 'column',
						margin: 0,
					}}
				>
					{variant !== 'plusinline' ? (
						<dt>
							<ExpansionPanelButton
								variant={variant}
								title={title}
								titleSuffix={titleSuffix}
							/>
						</dt>
					) : null}
					<dd sx={{ padding: 0, margin: 0 }}>
						<DisclosurePanel>
							<div
								sx={{
									padding:
										variant === 'plusinline'
											? '0 0 1rem 0'
											: variant === 'plus' || variant === 'plusalt'
											? '0 48px 15px 15px'
											: '0 48px 15px 0',
									fontSize: ['bodyMobile', 'body'],
									lineHeight: ['bodyMobile', 'body'],
								}}
								ref={contentRef}
							>
								{children}
							</div>
						</DisclosurePanel>
					</dd>
					{variant === 'plusinline' ? (
						<dt>
							<ExpansionPanelButton
								variant={variant}
								title={title}
								titleSuffix={titleSuffix}
							/>
						</dt>
					) : null}
				</dl>
			</Disclosure>
		</Container>
	);
};

ExpansionPanel.defaultProps = {
	variant: 'chevron',
};

interface ExpansionPanelButtonProps {
	variant: ExpansionPanelVariant;
	title: string;
	titleSuffix?: string;
}

export const ExpansionPanelButton: React.FC<ExpansionPanelButtonProps> = ({
	variant,
	title,
	titleSuffix,
}) => (
	<DisclosureButton
		sx={{
			position: 'relative',
			textAlign: 'left',
			padding:
				variant === 'plus' || variant === 'plusalt'
					? '15px'
					: variant === 'plusinline'
					? '0'
					: '8px 15px 8px 0',
			background: 'none',
			border: 'none',
			fontFamily: 'body',
			fontSize: ['bodyMobile', 'body'],
			lineHeight: ['bodyMobile', 'body'],
			width: '100%',
			color:
				variant === 'plus' || variant === 'plusalt'
					? 'link'
					: variant === 'plusinline'
					? 'secondary'
					: 'text',
			fontWeight:
				variant === 'plus' || variant === 'plusalt' ? 'bold' : 'normal',
			...(variant === 'plusinline'
				? {
						paddingInlineStart: '32px',
				  }
				: {
						paddingInlineEnd: '48px',
				  }),

			...(variant === 'plus' ||
			variant === 'plusalt' ||
			variant === 'plusinline'
				? {
						'::before, ::after': {
							content: '""',
							position: 'absolute',
							...(variant === 'plusinline'
								? {
										left: 0,
								  }
								: { right: '15px' }),
							top:
								variant === 'plusinline' ? ['10px', '12px'] : ['26px', '28px'],
							height: '2px',
							width: '18px',
							display: 'block',
							backgroundColor: variant === 'plus' ? 'link' : 'secondary',
							transition: 'transform .2s ease-in-out',
						},
				  }
				: {}),

			...(variant === 'chevron'
				? {
						'::after': {
							content: '""',
							position: 'absolute',
							right: '15px',
							top: '20px',
							height: '8px',
							width: '13px',
							display: 'block',
							backgroundImage: 'url("/icons/FAQ Arrow.svg")',
							transition: 'transform .2s ease-in-out',
						},
				  }
				: {}),

			...(variant === 'plus' ||
			variant === 'plusalt' ||
			variant === 'plusinline'
				? {
						'::after': { transform: 'rotate(90deg)' },
				  }
				: {}),

			'&[aria-expanded="true"]': {
				'::after': {
					transform: 'rotate(180deg)',
				},
			},
		}}
	>
		{title}
		{titleSuffix && <span sx={{ fontWeight: 'normal' }}> {titleSuffix}</span>}
	</DisclosureButton>
);
