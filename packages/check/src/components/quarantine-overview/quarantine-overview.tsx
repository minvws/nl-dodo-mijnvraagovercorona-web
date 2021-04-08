/** @jsx jsx */
import { Box, Flex, jsx, Text } from 'theme-ui';

interface QuarantaineOverviewBlockProps {
	title: string;
	subtitle: string;
	day: string;
	dividers: number;
}

export const QuarantaineOverviewBlock: React.FC<QuarantaineOverviewBlockProps> = ({
	title,
	subtitle,
	day,
	children,
	dividers,
}) => (
	<Box
		sx={{
			backgroundColor: 'white',
			borderRadius: 'box',
			padding: 'box',
			position: 'relative',
			fontSize: ['bodyMobile', 'body'],
			marginTop: dividers ? `${dividers * 16 + 8}px` : '8px',
			// lines between blocks.
			'::before': dividers
				? {
						position: 'absolute',
						content: '""',
						display: 'block',
						width: '24px',
						height: `${dividers * 16 + 4}px`,
						left: '50%',
						top: `${dividers * -16 - 4}px`,
						transform: 'translateX(-50%)',
						backgroundImage: 'url(/icons/section-divider.svg)',
						backgroundRepeat: 'repeat-y',
						backgroundPosition: 'top center',
				  }
				: {},
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
				'& + div': { mt: '16px' },
				'@media print': {
					mt: '0 !important',
				},
			}}
		>
			<p sx={{ margin: 0, color: 'smallText', fontWeight: 'bold' }}>
				{title}{' '}
				<span sx={{ fontWeight: 'normal', textTransform: 'lowercase' }}>
					{subtitle}
				</span>
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

export const QuarantaineOverviewBullet: React.FC = ({ children }) => (
	<Box
		sx={{
			paddingLeft: '30px',
			backgroundImage: 'url(/icons/triangle.svg)',
			backgroundRepeat: 'no-repeat',
			backgroundPosition: '0 5px',
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
