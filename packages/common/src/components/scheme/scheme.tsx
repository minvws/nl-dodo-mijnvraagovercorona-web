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
			position: 'relative',
			padding: 'box',
			borderRadius: 'box',
			border: 'card',
			fontSize: ['bodyMobile', 'body'],
			backgroundColor: 'white',
			'& + &': {
				marginTop: '1.5rem',
				'::before': {
					position: 'absolute',
					insetBlockStart: 'calc(-1.5rem - 1px);',
					insetInlineStart: 'calc(50% - 1px)',
					zIndex: '-1',
					blockSize: '1.5rem',
					inlineSize: '2px',
					backgroundColor: 'cardBorder',
					content: '""',
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
					'& + div': { marginBlockStart: '1rem' },
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
							color: 'link',
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
						marginBlockEnd: 0,
					},
					'@media print': {
						p: {
							marginBlockEnd: '0.375rem',
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
