/** @jsx jsx */
import { useEffect, useRef, useState } from 'react';
import { Container, jsx } from 'theme-ui';
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
} from '@reach/disclosure';

type ExpansionPanelProps = {
	text: string;
	children: React.ReactNode;
};

const ExpansionPanel = (props: ExpansionPanelProps) => {
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
		<Container>
			<Disclosure onChange={handleChange}>
				<DisclosureButton
					sx={{
						position: 'relative',
						textAlign: 'left',
						paddingLeft: 0,
						paddingBottom: '15px',
						paddingTop: '15px',
						paddingRight: '30px',
						background: 'none',
						border: 'none',
						fontFamily: 'body',
						fontSize: ['bodyMobile', 'body'],
						lineHeight: ['bodyMobile', 'body'],
						width: '100%',
						backgroundRepeat: 'no-repeat',
						backgroundPosition: 'right 15px center',
						borderBottom: '1px solid #AEC1D1',

						'::after': {
							content: '""',
							position: 'absolute',
							right: '15px',
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

							'+ div': {
								borderBottom: '1px solid #AEC1D1',

								'p:first-child': {
									marginTop: 0,
								},
							},
						},
					}}
				>
					{props.text}
				</DisclosureButton>
				<DisclosurePanel>
					<div
						sx={{
							fontSize: ['bodyMobile', 'body'],
							lineHeight: ['bodyMobile', 'body'],
						}}
						ref={contentRef}
					>
						{props.children}
					</div>
				</DisclosurePanel>
			</Disclosure>
		</Container>
	);
};

export default ExpansionPanel;
