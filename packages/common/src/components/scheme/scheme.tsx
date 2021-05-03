/** @jsx jsx */
import { Box, Flex, jsx, Text } from 'theme-ui';

export interface SchemeBlockProps {
	title: string;
	subtitle?: string;
	day: string;
}

export const SchemeBlock: React.FC<SchemeBlockProps> = ({
	title,
	subtitle,
	day,
	children,
}) => (
	<Box
		sx={{
			backgroundColor: 'white',
			border: '1px solid #CDD7E0',
			borderRadius: 'box',
			padding: 'box',
			position: 'relative',
			fontSize: ['bodyMobile', 'body'],
			marginBottom: '12px',
			'& + &': {
				marginTop: '32px',
				'::before': {
					content: '""',
					display: 'block',
					color: 'green',
					width: '22px',
					height: '13px',
					position: 'absolute',
					left: '50%',
					transform: 'translateX(-50%)',
					top: '-24px',
					backgroundImage: 'url(/icons/chevron.svg)',
					backgroundRepeat: 'no-repeat',
					backgroundPosition: 'center',
					backgroundSize: '22px 13px',
				},
			},
			'@media print': {
				fontSize: '13px',
				borderBottom: '1px solid #ccc',
				borderRadius: '0',
				p: { fontSize: '15px' },
				margin: 0,
				'::before': {
					display: 'none',
					marginTop: '0',
				},
			},
		}}
	>
		<Flex
			sx={{
				justifyContent: 'space-between',
				alignItems: 'center',
				'& + div': { mt: '16px' },
				'@media print': {
					mt: '0 !important',
				},
			}}
		>
			<p sx={{ margin: 0, color: 'smallText', fontWeight: 'bold' }}>
				{title}
				{subtitle && (
					<>
						{' '}
						<span sx={{ fontWeight: 'normal' }}>{subtitle}</span>
					</>
				)}
			</p>
			<Text
				variant="chapeau"
				as="span"
				sx={{
					margin: 0,
					color: 'copyHeading',
					fontWeight: 'normal',
				}}
			>
				{day}
			</Text>
		</Flex>
		{children && <Box>{children}</Box>}
	</Box>
);

export const SchemeBullet: React.FC = ({ children }) => (
	<Box
		sx={{
			paddingLeft: '30px',
			backgroundImage: 'url(/icons/triangle.svg)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: '0 5px',
			'&:not(:last-child)': {
				marginBottom: '32px',
			},
			'a, button': {
				color: 'text',
				textDecoration: 'underline',
				fontSize: 'inherit',
				'.chevron': {
					display: 'none',
				},
				// eg modal icon
				svg: {
					marginLeft: '6px',
					width: '20px',
					height: '20px',
				},
				'&[target="_blank"]::after': {
					display: 'inline-block',
					content: '""',
					backgroundImage: `url('/icons/outlink.svg')`,
					backgroundSize: '14px 14px',
					backgroundRepeat: 'no-repeat',
					height: '14px',
					width: '14px',
					marginLeft: '4px',
				},
				'&:hover, &:focus': {
					color: 'inherit',
				},
			},
			'p:last-child': {
				marginBottom: 0,
			},
			'@media print': {
				p: {
					marginBottom: '6px',
				},
			},
		}}
	>
		{children}
	</Box>
);
