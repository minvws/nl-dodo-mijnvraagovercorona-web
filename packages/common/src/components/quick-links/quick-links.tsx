/** @jsx jsx */
import { Container, jsx } from 'theme-ui';

export const QuickLinks: React.FC = ({ children, ...props }) => (
	<Container as="nav" {...props}>
		<div
			sx={{
				display: 'flex',
				flexDirection: 'column',
				padding: ['0 0 18px 0', '18px 18px 18px 0'],
				margin: '0 auto',
				borderBottom: ['none', '1px solid #AEC1D1'],
				justifyContent: 'space-between',
				a: {
					flexBasis: '100%',
					pr: [0, '24px'],
					pb: '12px',
					textDecoration: 'underline',
					fontWeight: 'bold',
					alignItems: 'flex-start',
					':hover .chevron, :focus .chevron': {
						transform: 'rotate(90deg) translate3d(3px, 0, 0)',
					},
					'.chevron': {
						marginTop: 4,
						transform: 'rotate(90deg)',
						path: { stroke: 'smallText', fill: 'smallText' },
					},
					'&:last-of-type': {
						pr: 0,
						pb: 0,
					},
				},
			}}
		>
			{children}
		</div>
	</Container>
);
