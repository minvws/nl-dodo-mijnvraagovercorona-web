/** @jsxRuntime classic /
/** @jsx jsx */
import VisuallyHidden from '@reach/visually-hidden';
import { Stack } from '@quarantaine/common';
import { Box, jsx, Themed, Text } from 'theme-ui';

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
		<Stack spacing={['1rem']}>
			{title || day ? (
				<Themed.h3
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
						margin: 0,
						fontSize: ['h3'],
						lineHeight: ['h3'],
					}}
				>
					{title ? (
						<span sx={{ color: 'smallText' }}>
							{title}
							{subtitle && (
								<>
									{' '}
									<span sx={{ fontWeight: 'normal' }}>{subtitle}</span>
								</>
							)}
						</span>
					) : null}
					{day && (
						<Text
							variant="chapeau"
							as="span"
							sx={{
								margin: 0,
								color: 'link',
							}}
						>
							<VisuallyHidden>(</VisuallyHidden>
							{day}
							<VisuallyHidden>)</VisuallyHidden>
						</Text>
					)}
				</Themed.h3>
			) : null}

			{children && (
				<Box
					sx={{
						'a, button': {
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
						'*:last-child': {
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
		</Stack>
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
