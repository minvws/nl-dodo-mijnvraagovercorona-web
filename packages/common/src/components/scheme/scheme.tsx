/** @jsx jsx */
import { Box, Flex, jsx, Text } from 'theme-ui';

export interface SchemeBlockProps {
	title?: string;
	subtitle?: string;
	day?: string;
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
		{(title || day) && (
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
				{title && (
					<p sx={{ margin: 0, color: 'smallText', fontWeight: 'bold' }}>
						{title}
						{subtitle && (
							<>
								{' '}
								<span sx={{ fontWeight: 'normal' }}>{subtitle}</span>
							</>
						)}
					</p>
				)}
				{day && (
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
				)}
			</Flex>
		)}
		{children && (
			<Box
				sx={{
					'a, button': {
						color: 'text',
						textDecoration: 'underline',
						fontSize: 'inherit',
						fontWeight: 'inherit',
						'.chevron': {
							display: 'none',
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
		)}
	</Box>
);

interface SchemeBulletProps {
	icon?: string;
}

export const SchemeBullet: React.FC<SchemeBulletProps> = ({
	children,
	icon,
}) => (
	<Box
		sx={{
			paddingLeft: '30px',
			backgroundImage: `url(${
				icon ? `/icons/${icon}.svg` : '/icons/triangle.svg'
			})`,
			backgroundRepeat: 'no-repeat',
			backgroundPosition: '0 5px',
			'&:not(:last-child)': {
				marginBottom: '32px',
			},
		}}
	>
		{children}
	</Box>
);
