/** @jsx jsx */
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
	return (
		<Container>
			<Disclosure>
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
					>
						{props.children}
					</div>
				</DisclosurePanel>
			</Disclosure>
		</Container>
	);
};

export default ExpansionPanel;
