/** @jsx jsx */
import { useEffect, useRef, useState } from 'react';
import { Container, jsx } from 'theme-ui';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@reach/disclosure';
import {
	useExpansionPanelGroup,
	useExpansionPanelId,
} from './expansion-panel-group';

type ExpansionPanelProps = {
	title: string;
	/**
	 * Title suffix is an optional suffix to the title, used a short additional description.
	 * The main difference is that this text won't render in bold.
	 */
	titleSuffix?: string;
	variant?: 'chevron' | 'plus';
	children: React.ReactNode;
};

export const ExpansionPanel = ({
	title,
	children,
	titleSuffix,
	variant,
}: ExpansionPanelProps) => {
	const [open, setOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const id = useExpansionPanelId();
	// Panel group will only be set and used if it is indeed wrapped inside a group
	// Otherwise this won't have any effect.
	const { expandedPanel, setExpandedPanel } = useExpansionPanelGroup();
	const handleChange = () => {
		setOpen((open) => !open);
	};

	useEffect(() => {
		if (expandedPanel && expandedPanel !== id) {
			setOpen(false);
		}
	}, [expandedPanel]);

	useEffect(() => {
		if (open && contentRef?.current) {
			/* If the element is fully within the visible area of the viewport, it does nothing.
			 * Otherwise, the element is scrolled into view.
			 * A proprietary variant of the standard Element.scrollIntoView() method.
			 * This is needed for mobile devices and both Android Chrome and iOs support it */
			/* @ts-ignore */
			contentRef.current.scrollIntoViewIfNeeded?.();
		}
		if (open && typeof setExpandedPanel === 'function' && id) {
			setExpandedPanel(id);
		}
	}, [open]);

	return (
		<Container
			sx={{
				backgroundColor: variant === 'plus' ? 'expansionPanel' : 'white',
				marginBottom: variant === 'plus' ? '16px' : 0,
				borderBottom: variant === 'chevron' ? '1px solid #AEC1D1' : undefined,
				borderTop: variant === 'chevron' ? '1px solid #AEC1D1' : undefined,
				'& + &': {
					borderTop: 'none',
				},
			}}
		>
			<Disclosure onChange={handleChange} open={open}>
				<dt>
					<DisclosureButton
						sx={{
							position: 'relative',
							textAlign: 'left',
							padding: variant === 'plus' ? '15px' : '8px 15px 8px 0',
							background: 'none',
							border: 'none',
							fontFamily: 'body',
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
							width: '100%',
							color: variant === 'plus' ? 'link' : 'text',
							fontWeight: variant === 'plus' ? 'bold' : 'normal',
							paddingRight: '48px',

							...(variant === 'plus'
								? {
										'::before, ::after': {
											content: '""',
											position: 'absolute',
											right: '15px',
											top: '28px',
											height: '2px',
											width: '18px',
											display: 'block',
											backgroundColor: 'link',
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

							...(variant === 'plus'
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
						{titleSuffix && (
							<span sx={{ fontWeight: 'normal' }}> {titleSuffix}</span>
						)}
					</DisclosureButton>
				</dt>
				<dd sx={{ padding: 0, margin: 0 }}>
					<DisclosurePanel
						sx={{
							div: {
								'p:first-of-type': {
									marginTop: 0,
								},
								'> :last-child': {
									marginBottom: 0,
								},
							},
							ul: {
								paddingLeft: '20px',
							},
							p: {
								marginBottom: '8px',
							},
						}}
					>
						<div
							sx={{
								padding:
									variant === 'plus' ? '0 48px 15px 15px' : '0 48px 15px 0',
								fontSize: ['bodyMobile', 'body'],
								lineHeight: ['bodyMobile', 'body'],
							}}
							ref={contentRef}
						>
							{children}
						</div>
					</DisclosurePanel>
				</dd>
			</Disclosure>
		</Container>
	);
};

ExpansionPanel.defaultProps = {
	variant: 'chevron',
};
