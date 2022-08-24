/** @jsx jsx */
import { jsx, Container } from 'theme-ui';

export const FooterColumn: React.FC<{ title: string }> = ({
	title,
	children,
	...props
}) => (
	<div
		{...props}
		sx={{
			// bump specificity by one
			'a,a': {
				':hover, :focus': {
					textDecoration: 'underline',
					boxShadow: 'none',
				},
			},
		}}
	>
		<h3>{title}</h3>
		{children}
	</div>
);

export const Footer: React.FC = ({ children, ...props }) => {
	return (
		<footer
			role="contentinfo"
			{...props}
			sx={{
				backgroundColor: 'footerBackground',
				color: 'white',
				fontSize: 'footerText',
				h3: {
					marginBottom: '6px',
					marginTop: 0,
					fontSize: 'footerText',
				},
				a: {
					color: 'white',
					':hover, :focus': {
						color: 'white',
						outline: 'none',
						boxShadow: 'focusRing',
					},
				},
				ul: {
					listStyleType: 'none',
					paddingLeft: 0,
					marginBottom: 0,
					marginTop: 0,
				},
				li: {
					paddingTop: '16px',
				},
			}}
		>
			<Container
				sx={{
					paddingY: '68px',
					paddingX: ['mobilePadding', 'tabletPadding', 0],
					display: 'grid',
					gridTemplateColumns: ['1fr', '1.25fr 1fr 1fr'],
					'> div:not(:last-child)': {
						marginBottom: ['40px', 0],
					},
					'> div': {
						paddingRight: '80px',
					},
				}}
			>
				{children}
			</Container>
		</footer>
	);
};
