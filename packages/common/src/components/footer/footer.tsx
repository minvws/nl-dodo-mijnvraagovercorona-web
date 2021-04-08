/** @jsx jsx */
import { jsx, Container } from 'theme-ui';
import { BodyContainer } from '@quarantaine/common';

export const FooterColumn: React.FC<{ title: string }> = ({
	title,
	children,
}) => (
	<div>
		<h2>{title}</h2>
		{children}
	</div>
);

export const Footer: React.FC = ({ children, ...props }) => {
	return (
		<footer
			{...props}
			sx={{
				backgroundColor: 'footerBackground',
				color: 'white',
				fontSize: 'footerText',
				h2: {
					marginBottom: '6px',
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
			<BodyContainer>
				<Container
					sx={{
						paddingY: '68px',
						display: 'grid',
						gridTemplateColumns: ['1fr', '1fr 1fr'],
						'> div:not(:first-child)': {
							marginTop: ['40px', 0],
						},
					}}
				>
					{children}
				</Container>
			</BodyContainer>
		</footer>
	);
};
