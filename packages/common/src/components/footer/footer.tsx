/** @jsx jsx */
import { jsx, Container } from 'theme-ui';

export const FooterColumn: React.FC<{ title: string }> = ({
	title,
	children,
	...props
}) => (
	<div {...props}>
		<h2>{title}</h2>
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
				h2: {
					marginBottom: '6px',
					marginTop: 0,
					fontSize: 'footerText',
				},
				a: {
					color: 'white',
					':hover, :focus': {
						color: 'white',
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
