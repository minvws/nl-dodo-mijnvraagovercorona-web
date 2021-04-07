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
	/**
	 * Title suffix is an optional suffix to the title, used a short additional description.
	 * The main difference is that this text won't render in bold.
	 */
	titleSuffix?: string;
	children: React.ReactNode;
};

export const ExpansionPanel = ({
	title,
	children,
	titleSuffix,
}: ExpansionPanelProps) => {
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
							paddingRight: '48px',
							background: 'none',
							border: 'none',
							fontFamily: 'body',
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
							width: '100%',
							color: 'link',
							fontWeight: 'bold',
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

							'::after': {
								transform: 'rotate(90deg)',
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
								padding: '0 48px 15px 15px',
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
