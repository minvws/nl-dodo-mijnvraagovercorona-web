/** @jsx jsx */
import { useEffect, useRef, useState } from 'react';
import { Container, jsx } from 'theme-ui';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@reach/disclosure';

type ExpansionPanelProps = {
	title: string;
	children: React.ReactNode;
};

export const ExpansionPanel = ({ title, children }: ExpansionPanelProps) => {
	const [open, setOpen] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const handleChange = () => {
		setOpen((open) => !open);
	};

	useEffect(() => {
		if (open && contentRef?.current) {
			/* If the element is fully within the visible area of the viewport, it does nothing.
			 * Otherwise, the element is scrolled into view.
			 * A proprietary variant of the standard Element.scrollIntoView() method.
			 * This is needed for mobile devices and both Android Chrome and iOs support it */
			/* @ts-ignore */
			contentRef.current.scrollIntoViewIfNeeded?.();
		}
	}, [open]);

	return (
		<Container sx={{ backgroundColor: 'expansionPanel', marginBottom: '16px' }}>
			<Disclosure onChange={handleChange}>
				<dt>
					<DisclosureButton
						sx={{
							position: 'relative',
							textAlign: 'left',
							padding: '15px',
							paddingLeft: '48px',
							background: 'none',
							border: 'none',
							fontFamily: 'body',
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
							width: '100%',
							color: 'link',
							fontWeight: 'bold',

							'::after': {
								content: '""',
								position: 'absolute',
								left: '15px',
								top: '24px',
								height: '8px',
								width: '13px',
								display: 'block',
								backgroundImage: 'url("/icons/FAQ Arrow.svg")',
								transition: 'transform .2s ease-in-out',
							},

							'&[aria-expanded="true"]': {
								borderBottom: 'none',

								'::after': {
									transform: 'rotate(180deg)',
								},
							},
						}}
					>
						{title}
					</DisclosureButton>
				</dt>
				<dd sx={{ padding: 0, margin: 0 }}>
					<DisclosurePanel
						sx={{
							div: {
								'p:first-child': {
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
								padding: '0 15px 15px 48px',
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
